function dateAndTime(dateArg: Date | string) {
  const date = new Date(dateArg);

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    date,
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
  };
}

export { dateAndTime };
