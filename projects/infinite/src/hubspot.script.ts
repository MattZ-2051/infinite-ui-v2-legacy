const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID;

export const hubspot = HUBSPOT_PORTAL_ID
  ? `<script type="text/javascript" async defer src="//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js"></script>`
  : '';
