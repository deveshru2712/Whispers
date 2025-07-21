import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const formateTime = (time: Date) => {
  dayjs.extend(relativeTime);

  const date = dayjs(time);

  const now = dayjs();

  const monthsDiff = now.diff(date, "month");
  const daysDiff = now.diff(date, "day");

  let timeAgo;
  if (Math.abs(monthsDiff) >= 1) {
    timeAgo = `${Math.abs(monthsDiff)}mo ago`;
  } else {
    timeAgo = `${Math.abs(daysDiff)} days ago`;
  }

  const formattedDate = date.format("MMMM D, YYYY") + ` (${timeAgo})`;

  return formattedDate;
};

export default formateTime;
