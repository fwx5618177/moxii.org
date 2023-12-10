import { TocProgressProps } from "Components";
import { FC } from "react";
import numeral from "numeral";

const TocProgress: FC<TocProgressProps> = ({ active, total }) => {
  const activeIndex = total.findIndex((title) => title.key === active) + 1;
  const progress = numeral(activeIndex / total.length).format("0%");

  return <span>{progress}</span>;
};

export default TocProgress;
