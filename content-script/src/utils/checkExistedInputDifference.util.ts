export const checkDifference = (
  scrapedValue?: string | number | null,
  backendValue?: string | number | null,
) => {
  // If both values are null, or both are empty strings, consider them the same
  if (
    (scrapedValue === null || scrapedValue === "") &&
    (backendValue === null || backendValue === "")
  ) {
    return "sameValues";
  }

  // Otherwise, if the values are different, return "differentValues"
  if (scrapedValue !== backendValue) {
    return "differentValues";
  } else {
    return "sameValues";
  }
};

export const checkDifferenceTrueFalse = (
  scrapedValue?: string | number | null,
  backendValue?: string | number | null,
) => {
  // If both values are null, or both are empty strings, consider them the same
  if (
    (scrapedValue === null || scrapedValue === "") &&
    (backendValue === null || backendValue === "")
  ) {
    return false;
  }

  // Otherwise, if the values are different, return "differentValues"
  return scrapedValue !== backendValue;
};
