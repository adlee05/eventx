export default function getTime(date: Date | string) {
  const d = new Date(date);

  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
