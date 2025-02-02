import fs from "node:fs";
import path from "node:path";

import type { BuildOptions } from "@opennextjs/aws/build/helper.js";

import { Config } from "../../../config.js";
import { getOutputWorkerPath } from "../../bundle-server.js";

/**
 * Copies the template files present in the cloudflare adapter package into the standalone node_modules folder
 */
export function copyPackageCliFiles(packageDistDir: string, config: Config, openNextOptions: BuildOptions) {
  console.log("# copyPackageTemplateFiles");
  const sourceDir = path.join(packageDistDir, "cli");
  const destinationDir = path.join(config.paths.internal.package, "cli");

  fs.cpSync(sourceDir, destinationDir, { recursive: true });

  fs.copyFileSync(
    path.join(packageDistDir, "cli", "templates", "worker.js"),
    getOutputWorkerPath(openNextOptions)
  );
}
