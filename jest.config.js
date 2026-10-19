import { createDefaultEsmPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultEsmPreset();

/** @type {import("jest").Config} **/
export default {
  ...tsJestTransformCfg,
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/tests/env.ts"],
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
};