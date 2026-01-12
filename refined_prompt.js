/**
 * Convert an input string into camelCase.
 *
 * Rules and behavior:
 * - Validates that the input is a string; throws TypeError otherwise.
 * - Trims leading and trailing whitespace; returns an empty string if result is empty.
 * - Splits the trimmed string on spaces, underscores (_) or hyphens (-). Consecutive delimiters are collapsed.
 * - Fully-uppercase words are normalized to lowercase before casing (e.g. "SCREEN" -> "screen").
 * - The first word is returned with a lowercase first character and the rest of the word unchanged (after normalization).
 * - Each subsequent word has its first character capitalized and the rest of the word left unchanged.
 *
 * @param {string} input - The string to convert. May contain spaces, underscores, hyphens, mixed case, or all-caps words.
 * @returns {string} The camelCase representation of the input. Returns an empty string for an input that is empty or only whitespace.
 * @throws {TypeError} If the provided input is not a string.
 *
 * @example
 * toCamelCase('first name'); // => 'firstName'
 * toCamelCase('user_id'); // => 'userId'
 * toCamelCase('SCREEN_NAME'); // => 'screenName'
 * toCamelCase('mobile-number'); // => 'mobileNumber'
 * toCamelCase(' multiple - delimiters__HERE '); // => 'multipleDelimitersHere'
 */
/**
 * Convert an input string into camelCase.
 *
 * Rules and behavior:
 * - Validates that the input is a string; throws TypeError otherwise.
 * - Trims leading and trailing whitespace; returns an empty string if result is empty.
 * - Splits the trimmed string on spaces, underscores (_) or hyphens (-). Consecutive delimiters are collapsed.
 * - Fully-uppercase words are normalized to lowercase before casing (e.g. "SCREEN" -> "screen").
 * - The first word is returned with a lowercase first character and the rest of the word unchanged (after normalization).
 * - Each subsequent word has its first character capitalized and the rest of the word left unchanged.
 *
 * Examples:
 *   toCamelCase('first name')                       -> 'firstName'
 *   toCamelCase('user_id')                          -> 'userId'
 *   toCamelCase('SCREEN_NAME')                      -> 'screenName'
 *   toCamelCase('mobile-number')                    -> 'mobileNumber'
 *   toCamelCase(' multiple - delimiters__HERE ')    -> 'multipleDelimitersHere'
 *
 * @param {string} input - The string to convert. May contain spaces, underscores, hyphens, mixed case, or all-caps words.
 * @returns {string} The camelCase representation of the input. Returns an empty string for an input that is empty or only whitespace.
 * @throws {TypeError} If the provided input is not a string.
 */

function toCamelCase(input) {
  if (typeof input !== 'string') {
    throw new TypeError('toCamelCase: input must be a string');
  }

  const trimmed = input.trim();
  if (trimmed === '') return '';

  // Split on spaces, underscores, or hyphens (collapse consecutive delimiters)
  const parts = trimmed.split(/[\s_-]+/).filter(Boolean);

  // Convert to camelCase
  return parts
    .map((word, idx) => {
      // Treat fully-uppercase words as lowercase first (e.g., "SCREEN" -> "screen")
      const isAllUpper = word === word.toUpperCase();
      const normalized = isAllUpper ? word.toLowerCase() : word;

      if (idx === 0) {
        // First word: ensure first char is lowercase
        return normalized.charAt(0).toLowerCase() + normalized.slice(1);
      }
      // Subsequent words: capitalize first char, keep the rest as-is (or lowercased if it was all-uppercase)
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join('');
}

// Examples
console.log(toCamelCase("first name"));                  // "firstName"
console.log(toCamelCase(" Hello_world "));               // "helloWorld"
/**
 * Convert a string to dot.case
 * Examples:
 *   toDotCase('fooBar')         -> 'foo.bar'
 *   toDotCase('Foo Bar')        -> 'foo.bar'
 *   toDotCase('foo-bar_baz')    -> 'foo.bar.baz'
 *   toDotCase('XMLHttpRequest') -> 'xml.http.request'
 *   toDotCase('version1Number') -> 'version.1.number'
 */
/**
 * Convert a value to dot.case.
 *
 * Behavior and implementation notes:
 * - If input is null or undefined the function returns an empty string.
 * - Non-string inputs are coerced via String(input) then trimmed.
 * - If the trimmed string is empty the function returns an empty string.
 * - If available, Unicode NFKD normalization is applied and combining diacritical marks are removed
 *   (so accents like "é" become "e").
 * - Inserts spaces between camel/pascal boundaries and between letters and digits to separate tokens.
 * - Replaces any non-alphanumeric characters with spaces.
 * - Collapses multiple spaces, lowercases tokens, and joins them with '.'.
 *
 * Examples:
 *   toDotCase('fooBar')         -> 'foo.bar'
 *   toDotCase('Foo Bar')        -> 'foo.bar'
 *   toDotCase('foo-bar_baz')    -> 'foo.bar.baz'
 *   toDotCase('XMLHttpRequest') -> 'xml.http.request'
 *   toDotCase('version1Number') -> 'version.1.number'
 *
 * @param {*} input - The value to convert to dot.case.
 * @returns {string} The dot.case representation of the input.
 */

function toDotCase(input) {
  if (input == null) return '';
  const s = String(input).trim();

  if (s === '') return '';

  // Normalize accents (é -> e)
  const normalized = s.normalize ? s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '') : s;

  // 1) Add spaces between camel/pascal boundaries and number/letter boundaries:
  //    fooBar -> foo Bar
  //    XMLHTTPResponse -> XML HTTP Response (handle consecutive capitals)
  //    version1Number -> version 1 Number
  let split = normalized
    // split when lowerCaseOrDigit followed by UpperCase: "fooBar" -> "foo Bar"
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    // split when acronym followed by TitleCase: "XMLHttp" -> "XML Http"
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2')
    // split between letters and digits: "ver1sion" -> "ver 1 sion"
    .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
    .replace(/([0-9])([a-zA-Z])/g, '$1 $2');

  // 2) Replace all non-alphanumeric characters with space (treat as separators)
  split = split.replace(/[^A-Za-z0-9]+/g, ' ');

  // 3) Collapse multiple spaces, split into tokens, lowercase, and join with dots
  const tokens = split
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(t => t.toLowerCase());

  return tokens.join('.');
}

// Quick tests
console.log(toDotCase('fooBar')); // 'foo.bar'
console.log(toDotCase('Foo Bar')); // 'foo.bar'
console.log(toDotCase('foo-bar_baz')); // 'foo.bar.baz'
console.log(toDotCase('XMLHttpRequest')); // 'xml.http.request'
console.log(toDotCase('version1Number')); // 'version.1.number'
console.log(toDotCase('  --Hello__WORLD!!  ')); // 'hello.world'
console.log(toDotCase('École Française')); // 'ecole.francaise'

console.log(toCamelCase("user-ID number"));             // "userIdNumber"
console.log(toCamelCase(""));                            // ""
console.log(toCamelCase(" multiple - delimiters__HERE ")); // "multipleDelimitersHere"
