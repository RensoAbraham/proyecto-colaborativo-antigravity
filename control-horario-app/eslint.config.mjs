import { nextCoreWebVitalsRestricted } from "eslint-config-next/core-web-vitals.js";
import nextConfig from "eslint-config-next/index.js";

export default [
    ...nextConfig,
    ...nextCoreWebVitalsRestricted,
    {
        ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"]
    }
];
