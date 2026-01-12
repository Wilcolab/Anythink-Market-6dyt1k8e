/**
 * Convert an input string into kebab-case.
 *
 * Rules and behavior:
 * - Validates that the input is a string; throws TypeError otherwise.
 * - Trims leading and trailing whitespace.
 * - Preserves camelCase boundaries by inserting hyphens before uppercase letters.
 * - Converts the entire string to lowercase.
 * - Replaces spaces and underscores with a single hyphen.
 * - Removes duplicate hyphens and trims leading/trailing hyphens.
 *
 * @param {string} input - The string to convert.
 * @returns {string} The kebab-case representation of the input.
 * @throws {TypeError} If the provided input is not a string.
 *
 * @example
 * toKebabCase("First Name");       // "first-name"
 * toKebabCase("user_id");          // "user-id"
 * toKebabCase("screenName");       // "screen-name"
 * toKebabCase("  mobile--number  "); // "mobile-number"
 */
function toKebabCase(input) {
  if (input === null || input === undefined || typeof input !== 'string') {
    throw new TypeError(
      `toKebabCase: expected a string but received ${
        input === null ? 'null' : input === undefined ? 'undefined' : typeof input
      }`
    );
  }

  // 1. Trim extra whitespace
  let str = input.trim();

  // 2a. Preserve camelCase boundaries by inserting hyphens before uppercase letters
  // (do this before lowercasing to not lose boundaries)
  str = str.replace(/([a-z0-9])([A-Z])/g, '$1-$2');

  // 2b. Convert to lowercase (normalization)
  str = str.toLowerCase();

  // 3. Replace spaces and underscores with a single hyphen
  str = str.replace(/[\s_]+/g, '-');

  // 4. Remove duplicate hyphens and trim leading/trailing hyphens
  str = str.replace(/-+/g, '-').replace(/^-+|-+$/g, '');

  return str;
}

// Examples
console.log(toKebabCase("First Name"));        // "first-name"
console.log(toKebabCase("user_id"));           // "user-id"
console.log(toKebabCase("screenName"));        // "screen-name"
console.log(toKebabCase("  mobile--number  "));// "mobile-number"
