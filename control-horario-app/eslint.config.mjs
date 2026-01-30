import nextConfig from "eslint-config-next/index.js";
import nextCoreWebVitalsRestricted from "eslint-config-next/core-web-vitals.js";

export default [
    ...nextConfig,
    ...(Array.isArray(nextCoreWebVitalsRestricted) ? nextCoreWebVitalsRestricted : []),
    {
        ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"]
    }
];
