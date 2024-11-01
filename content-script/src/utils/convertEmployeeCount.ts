export function convertLinkedInEmployeesCount(str: string | undefined) {
  if (!str) return null;

  const matches = str.match(/(\d{1,3}(,\d{3})*(\.\d+)?)([KkMmBb]{0,1})/);

  if (!matches) {
    // No valid number found
    return null;
  }

  const formattedNumber = matches[1].replace(/,/g, "");
  const number = parseFloat(formattedNumber);
  const suffix = matches[4].toLowerCase();

  if (suffix === "k") {
    return number * 1000;
  } else if (suffix === "m") {
    return number * 1000000;
  } else if (suffix === "b") {
    return number * 1000000000;
  } else {
    return number;
  }
}
