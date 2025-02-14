import { config } from "@configs/eslint/react";
import pluginLingui from "eslint-plugin-lingui";

/** @type {import("eslint").Linter.Config} */
export default [...config, pluginLingui.configs["flat/recommended"]];
