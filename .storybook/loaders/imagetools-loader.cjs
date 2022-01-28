const {
  parseURL,
  resolveConfigs,
  extractEntries,
  loadImage,
  generateTransforms,
  applyTransforms,
  builtinOutputFormats,
  builtins,
} = require('imagetools-core');

module.exports = async function (content) {
  const srcURL = parseURL(this.resource);
  const parameters = extractEntries(srcURL.searchParams);
  const imageConfigs = resolveConfigs(parameters, builtinOutputFormats);
  const img = loadImage(decodeURIComponent(srcURL.pathname));
  const outputMetadatas = [];
  const outputPath = content.match(/"([^"]+)"/)[1];

  if (parameters.length === 0) {
    return content;
  }

  for (const config of imageConfigs) {
    const { transforms } = generateTransforms(config, builtins);
    const {
      metadata: { format, width, height },
    } = await applyTransforms(transforms, img);
    outputMetadatas.push({ format, width, height, src: outputPath });
  }

  return `module.exports = ${JSON.stringify(outputMetadatas)}`;
};
