import { myLibrary } from "./my-package-name";

export { Options } from "./settings";
export { myLibrary };

// Export `myLibrary` as the default export
// tslint:disable: no-default-export
export default myLibrary;

// CommonJS default export hack
if (typeof module === "object" && typeof module.exports === "object") {
  module.exports = Object.assign(module.exports.default, module.exports);  // tslint:disable-line: no-unsafe-any
}
