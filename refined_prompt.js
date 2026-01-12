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
@@ -60,6 +83,30 @@ console.log(toCamelCase(" Hello_world "));               // "helloWorld"
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
