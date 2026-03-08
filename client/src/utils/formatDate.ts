export function formatDate(dateString: Date) {
  return new Date(dateString).toLocaleDateString("en-IN");
}
