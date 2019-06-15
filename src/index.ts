import { projectExportName } from "./project-package-name";

// Export `projectExportName` as a named export and the default export
// tslint:disable: no-default-export
export default projectExportName;
export { projectExportName };

// Other exports
export { Options } from "./settings";

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
