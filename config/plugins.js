module.exports = ({ env }) => ({
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 10, // Default is 5
    },
  },
  seo: {
    enable: true,
  },
  documentation: {
    enabled: true,
    config: {
      "x-strapi-config": {
        plugins: [],
      },
    },
  },
});