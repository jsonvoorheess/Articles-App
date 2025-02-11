import type { NextConfig } from "next";
import svgrPlugin from "@svgr/webpack"

const nextConfig: NextConfig = {
    webpack: (config, options) => {
        const fileLoaderRule = config.module.rules.find((rule:any) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ['@svgr/webpack'],
            },
        )
        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media2.dev.to",
                port: "",
            },
            {
                protocol: "https",
                hostname: "dev-to-uploads.s3.amazonaws.com",
                port: "",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
            }
            ]
    },
    output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
  },
};

export default nextConfig;


