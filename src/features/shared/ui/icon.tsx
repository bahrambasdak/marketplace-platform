import { ChevronLeft } from "lucide-react";

const icons = {
  back: ChevronLeft,
};
type IconName = keyof typeof icons;
export function Icon({
  name,
  ...props
}: { name: IconName } & React.ComponentProps<"svg">) {
  const Component = icons[name];

  return <Component {...props} />;
}
