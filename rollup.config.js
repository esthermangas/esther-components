import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import bundleSize from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        resolve({ browser: true }),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        commonjs(),
        postcss({
            modules: true,
        }),
        terser(),
        bundleSize(),
    ],
};