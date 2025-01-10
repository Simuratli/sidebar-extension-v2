export function extractNameAndSurname(input: string) {
  // Step 1: Clean the input by removing unwanted characters
  const cleaned = input.replace(/[^\p{L}\s]/gu, "").trim();

  // Step 2: Split into parts by spaces
  const parts = cleaned.split(/\s+/); // Split by spaces

  // Step 3: Handle different cases
  if (parts.length === 0) {
    return "No Name"; // No valid names
  } else if (parts.length === 1) {
    return `${parts[0]} ${parts[0]}`; // Only one name
  } else if (parts.length === 2) {
    return `${parts[0]} ${parts[1]}`; // First and last name
  } else {
    // More than two names, assume the first is name and last is surname
    const name = parts[0];
    const surname = parts.slice(1).join(" "); // Combine the rest
    return `${name} ${surname}`;
  }
}
