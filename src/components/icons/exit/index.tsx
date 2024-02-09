import Icon from "@ant-design/icons";
import ExitSvg from "./exit-svg";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ExitIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ExitSvg} {...props} />
);

export default ExitIcon;