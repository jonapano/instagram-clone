import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

export function shortTimeAgo(date: Date) {
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;

  return "just now";
}
