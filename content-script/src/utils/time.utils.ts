export const dateToNormalDateString = (dateString?: string) => {
  if (!dateString) {
    return null;
  }

  // Split the input string into month and day parts
  const parts = dateString.split("/");
  const monthName = parseInt(parts[1]);
  const day = parseInt(parts[0]);

  // Map month names to month numbers
  const monthMap: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Get the month number from the map
  const month = monthName;

  // Create a new Date object for the specified month and day of the current year
  const date = new Date(currentYear, month, day);

  // Get the day, month, and year
  const formattedDay = date.getDate();
  const formattedMonth = date.getMonth() + 1; // Adding 1 to represent January as 1 instead of 0
  const formattedYear = date.getFullYear();

  // Return the date in the format "DD.MM.YYYY"
  return (
    (formattedMonth < 10 ? "0" + formattedMonth : formattedMonth) +
    "." +
    (formattedDay < 10 ? "0" + formattedDay : formattedDay) +
    "." +
    formattedYear
  );
};

export function formatDateForBackend(date: string) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
