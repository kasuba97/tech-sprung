// next.config.js
const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    // Example: Add custom alias
    config.resolve.alias["@components"] = path.join(__dirname, "components");

    // Example: Add custom module rules
    config.module.rules.push({
      test: /\.custom$/,
      use: "raw-loader",
    });

    return config;
  },
};
