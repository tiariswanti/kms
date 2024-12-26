/** @type {import('next').NextConfig} */
const nextConfig = {
  cssModules: true,
  images: {
    domains: [
      //dihapus nanti
      "images.macrumors.com",
      "cdn.mos.cms.futurecdn.net",
      "cdn.vox-cdn.com",
      "techcrunch.com",
      "another-allowed-domain.com",
    ],
  },
};

export default nextConfig;
