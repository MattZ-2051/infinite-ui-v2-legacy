export function timeRemainingFormat(delta: number): { days: number; hours: number; minutes: number; seconds: number } {
  // calculate (and subtract) whole days
  const days = Math.floor(delta / 86_400);
  delta -= days * 86_400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  const seconds = Math.floor(delta % 60);

  return { days, hours, minutes, seconds };
}
