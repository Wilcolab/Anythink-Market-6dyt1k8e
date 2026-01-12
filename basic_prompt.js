/**
 * Converts a string to camelCase.
 * Handles spaces, punctuation, underscores, hyphens, and mixed case.
 * Returns an empty string for empty input.
 */
function toCamelCase(str) {
  if (!str) return '';

  return str
    .trim()
    .split(/[^A-Za-z0-9]+/) // split on spaces, punctuation, underscores, hyphens, etc.
    .filter(Boolean)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

// Examples
console.log(toCamelCase("first name"));      // "firstName"
console.log(toCamelCase(" Hello_world "));   // "helloWorld"
console.log(toCamelCase("user-ID number"));  // "userIdNumber"
console.log(toCamelCase(""));                // ""
