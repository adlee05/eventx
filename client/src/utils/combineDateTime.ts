function combineDateTime(date?: Date, time?: string) {
  if (!date || !time) return null;

  const [hours, minutes, seconds = "0"] = time.split(':');
  const result = new Date(date);

  result.setHours(Number(hours), Number(minutes), Number(seconds), 0);
  return result;
}

export default combineDateTime;
