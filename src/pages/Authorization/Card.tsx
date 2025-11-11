import { PropsWithChildren } from "react";

type CardProps = {
  title: string;
  description: string;
};
const Card = ({
  title,
  description,
  children,
}: CardProps & PropsWithChildren) => (
  <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border">
    <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
      <h4 className="leading-none text-base font-medium">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
    {children}
  </div>
);

export default Card;
