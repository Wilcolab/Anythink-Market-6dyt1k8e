/**
 * Converts a string to camelCase.
 * Handles spaces, underscores, hyphens, and uppercase letters.
 * Example inputs and outputs are included to guide Copilot.
 */
function toCamelCase(str) {
  if (!str) return '';

  return str
    .trim()
    .split(/[^A-Za-z0-9]+/) // split on spaces, underscores, hyphens, etc.
    .filter(Boolean)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
}

// Examples
console.log(toCamelCase("first name"));     // "firstName"
console.log(toCamelCase("user_id"));        // "userId"
console.log(toCamelCase("SCREEN_NAME"));    // "screenName"
console.log(toCamelCase("mobile-number"));  // "mobileNumber"
