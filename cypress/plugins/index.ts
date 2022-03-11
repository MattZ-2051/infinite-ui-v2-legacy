// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

import deepmerge from 'deepmerge';
// eslint-disable-next-line unicorn/prefer-node-protocol
import path from 'path';

export default async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  const { default: configJson } = await import(config.configFile);

  if (configJson.extends) {
    const baseConfigFilename = path.join(config.projectRoot, configJson.extends);
    const { default: baseConfig } = await import(baseConfigFilename);

    return deepmerge(baseConfig, configJson);
  }

  return config;
};
