// eslint-disable-next-line unicorn/prefer-node-protocol
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

const domain = import.meta.env.VITE_AWS_COGNITO_LOGIN_DOMAIN;
const clientId = import.meta.env.VITE_AWS_COGNITO_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AWS_COGNITO_CLIENT_SECRET;
const stateCipherKey = import.meta.env.VITE_AWS_COGNITO_STATE_CIPHER_KEY;

const basicAuthorizationHeaderValue = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
const accessTokenCookieName = 'auth.access_token';
const refreshTokenCookieName = 'auth.refresh_token';
const jwtKeysCache = {};

export function getAuthorizationURL(request) {
  return getAuthorizationCodeURL('/oauth2/authorize', request);
}

export function getSignupURL(request) {
  return getAuthorizationCodeURL('/signup', request);
}

export async function handleAuthorizationCode(request) {
  const { query } = request;
  const originHost = getOriginHostURL(request);
  const code = query.get('code');
  const state = query.get('state');

  if (code === null || state === null) {
    return;
  }

  let decryptedState;

  try {
    decryptedState = JSON.parse(decrypt(state, stateCipherKey));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }

  const { codeVerifier, returnUrl } = decryptedState;

  if (!codeVerifier) {
    return;
  }

  const { url, options } = getTokensExchangeFetchParameters(code, codeVerifier, originHost);

  const response = await fetch(url, options);

  if (response.status === 200) {
    const { access_token, refresh_token } = await response.json();
    const cookieDomain = getCookieDomain(request);

    return {
      status: 302,
      headers: {
        'set-cookie': [
          `${accessTokenCookieName}=${access_token}; Domain=${cookieDomain}; Path=/; HttpOnly`,
          `${refreshTokenCookieName}=${refresh_token}; Domain=${cookieDomain}; Path=/; HttpOnly`,
        ],
        location: returnUrl || originHost,
      },
    };
  }
}

export async function handleTokenRevocation(request) {
  const { headers } = request;
  const cookies = parseCookies(headers['cookie']);
  const refreshToken = cookies[refreshTokenCookieName];
  const signoutURL = getSignoutURL(request);

  if (refreshToken) {
    const { url, options } = getTokensRevocationFetchParameters(refreshToken);
    const cookieDomain = getCookieDomain(request);
    const { status } = await fetch(url, options);

    if (status === 200) {
      return {
        status: 302,
        headers: {
          'set-cookie': [
            `${accessTokenCookieName}=; Domain=${cookieDomain}; Path=/; HttpOnly; Max-Age=0`,
            `${refreshTokenCookieName}=; Domain=${cookieDomain}; Path=/; HttpOnly; Max-Age=0`,
          ],
          location: signoutURL,
        },
      };
    }

    return { status };
  }

  return {
    status: 302,
    headers: {
      location: signoutURL,
    },
  };
}

export async function handleTokenRefresh(request) {
  const { headers } = request;
  const cookies = parseCookies(headers['cookie']);
  const refreshToken = cookies[refreshTokenCookieName];
  const cookieDomain = getCookieDomain(request);

  if (refreshToken) {
    const { url, options } = getTokenRefreshFetchParameters(refreshToken);

    const response = await fetch(url, options);

    if (response.status === 200) {
      const { access_token } = await response.json();

      return {
        status: 200,
        headers: {
          'set-cookie': `${accessTokenCookieName}=${access_token}; Domain=${cookieDomain}; Path=/; HttpOnly`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(await getSessionFromAccessToken(access_token)),
      };
    }
  }

  return {
    status: 200,
    headers: {
      'set-cookie': [
        `${accessTokenCookieName}=; Domain=${cookieDomain}; Path=/; HttpOnly; Max-Age=0`,
        `${refreshTokenCookieName}=; Domain=${cookieDomain}; Path=/; HttpOnly; Max-Age=0`,
      ],
      'content-type': 'application/json',
    },
    body: JSON.stringify({ invalid: true }),
  };
}

export async function getSessionFromCookie({ headers }) {
  const cookies = parseCookies(headers['cookie']);

  return await getSessionFromAccessToken(cookies[accessTokenCookieName]);
}

export function getOriginHostURL({ host }) {
  return host.includes('localhost') ? `http://${host}` : `https://${host}`;
}

function getAuthorizationCodeURL(path, request) {
  const originHost = getOriginHostURL(request);
  const url = `https://${domain}${path}`;
  const codeVerifier = generatePKCECodeVerifier();
  const codeChallenge = bufferToBase64URL(crypto.createHash('sha256').update(codeVerifier).digest());
  const state = encrypt(JSON.stringify({ codeVerifier, returnUrl: request.query.get('returnUrl') }), stateCipherKey);

  const urlSearchParameters = new URLSearchParams({
    state,
    response_type: 'code',
    client_id: clientId,
    scope: 'openid email profile',
    redirect_uri: `${originHost}/auth/code`,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  return `${url}?${urlSearchParameters}`;
}

function getCookieDomain({ host }) {
  if (host.includes('localhost')) {
    return 'localhost';
  }

  return host.replace(/\/+$/, '').replace(/^.+?((?:\.[^.]+){2})$/, '$1');
}

function getSignoutURL(request) {
  const originHost = getOriginHostURL(request);
  const url = `https://${domain}/logout`;

  const urlSearchParameters = new URLSearchParams({
    client_id: clientId,
    logout_uri: `${originHost}/auth/signedout`,
  });

  return `${url}?${urlSearchParameters}`;
}

async function getSessionFromAccessToken(accessToken: string) {
  if (!accessToken) {
    return {};
  }

  const {
    header: { kid },
    payload: { iss },
  } = jwt.decode(accessToken, { complete: true });
  let jwk = jwtKeysCache[iss]?.keys.find((k) => k.kid === kid);

  if (!jwk) {
    const signingKeys = await fetch(`${iss}/.well-known/jwks.json`).then((response) => response.json());

    jwtKeysCache[iss] = signingKeys;
    jwk = jwtKeysCache[iss]?.keys.find((k) => k.kid === kid);

    if (!jwk) {
      return {};
    }
  }

  const pem = jwkToPem(jwk);

  try {
    const { exp, sub, username } = jwt.verify(accessToken, pem, { algorithms: [jwk.alg] });

    return { user: { username, externalId: sub }, expiration: exp };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { expired: true };
    }
  }

  return {};
}

function getTokensExchangeFetchParameters(authorizationCode: string, codeVerifier: string, originHost: string) {
  return {
    url: `https://${domain}/oauth2/token`,
    options: {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: basicAuthorizationHeaderValue,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: authorizationCode,
        client_id: clientId,
        redirect_uri: `${originHost}/auth/code`,
        code_verifier: codeVerifier,
      }).toString(),
    },
  };
}

function getTokenRefreshFetchParameters(refreshToken: string) {
  return {
    url: `https://${domain}/oauth2/token`,
    options: {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: basicAuthorizationHeaderValue,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
      }).toString(),
    },
  };
}

function getTokensRevocationFetchParameters(accessToken: string) {
  return {
    url: `https://${domain}/oauth2/revoke`,
    options: {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: basicAuthorizationHeaderValue,
      },
      body: new URLSearchParams({
        token: accessToken,
      }).toString(),
    },
  };
}

function parseCookies(cookie: string) {
  return Object.fromEntries((cookie || '').split(/\s*;\s*/g).map((c) => c.trim().split(/=/, 2)));
}

function encrypt(plaintext: string, key: string) {
  const hashedKey = crypto.createHash('sha256').update(key).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', hashedKey, iv);

  let encrypted = cipher.update(plaintext);
  encrypted = Buffer.concat([encrypted, cipher.final(), iv]);

  return encrypted.toString('hex');
}

function decrypt(ciphertextWithIV: string, key: string) {
  const hashedKey = crypto.createHash('sha256').update(key).digest();
  const encryptedWithIV = Buffer.from(ciphertextWithIV, 'hex');

  const encrypted = Buffer.alloc(encryptedWithIV.length - 16);
  encryptedWithIV.copy(encrypted, 0, 0, encryptedWithIV.length - 16);

  const iv = Buffer.alloc(16);
  encryptedWithIV.copy(iv, 0, encryptedWithIV.length - 16);

  const decipher = crypto.createDecipheriv('aes-256-cbc', hashedKey, iv);

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

function bufferToBase64URL(buffer: Buffer) {
  return buffer.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function generatePKCECodeVerifier() {
  const size = 128;
  const RANDOM_STRING_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const buffer = new Uint8Array(size);

  for (let index = 0; index < size; index += 1) {
    buffer[index] = Math.trunc(Math.random() * RANDOM_STRING_CHARSET.length);
  }

  const BUFFER_TO_STRING_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const state = [];

  for (let index = 0; index < buffer.byteLength; index += 1) {
    const _index = buffer[index] % BUFFER_TO_STRING_CHARSET.length;
    state.push(BUFFER_TO_STRING_CHARSET[_index]);
  }

  return state.join('');
}
