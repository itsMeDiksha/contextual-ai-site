// next.config.js
const isGH = process.env.NEXT_PUBLIC_BASE_PATH;
module.exports = {
  output: "export",
  basePath: isGH ? process.env.NEXT_PUBLIC_BASE_PATH : undefined, // e.g. "/contextual-ai-site"
  assetPrefix: isGH ? process.env.NEXT_PUBLIC_BASE_PATH + "/" : undefined,
};
