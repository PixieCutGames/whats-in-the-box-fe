import { useEffect, useState } from "react";
import { calculateDays } from "../../lib/calculateDays";

type DaysAgoProps = {
  date: Date;
};
function DaysAgo({ date }: DaysAgoProps) {
  const [calcDays, setCalcDays] = useState<number>();
  useEffect(() => {
    const days = calculateDays(date, new Date());
    setCalcDays(Math.floor(days));
  }, [date]);

  if (calcDays === 0) return "Today";
  if (calcDays === 1) return "Yesterday";
  if (calcDays) return `${calcDays} days ago`;
  return null;
}

export default DaysAgo;
