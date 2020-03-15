import { Options, Settings } from "./settings";

/**
 * The description of my library
 *
 * @returns - Options
 */
export function myLibrary(options?: Options): string {
  let settings = new Settings(options);

  if (settings.greeting === "Goodbye") {
    // Simulate a runtime error
    throw new Error("Cannot say goodbye");
  }

  return `${settings.greeting}, ${settings.subject}.`;
}
