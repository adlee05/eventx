function combineDateTime(date: Date, time: string) {
  if (!date || !time) return null;

  const finalDate = new Date(date);
  const [hours, minutes, seconds = "0"] = time.split(':');

  finalDate.setHours(Number(hours), Number(minutes), Number(seconds));

  return finalDate;
}

export { combineDateTime };
