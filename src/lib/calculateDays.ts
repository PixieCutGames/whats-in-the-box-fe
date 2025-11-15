export function calculateDays(startDate: Date, endDate: Date) {
  let start = new Date(startDate).getDate();
  let end = new Date(endDate).getDate();
  let timeDifference = end - start;
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
}
