/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export",
  basePath: isProd ? "/contextual-ai-site" : "",
  assetPrefix: isProd ? "/contextual-ai-site/" : "",
  images: { unoptimized: true },
};
