import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export enum ButtonType {
  TOGGLE = "toggle",
  DELETE = "delete",
  REFRESH = "refresh",
  REVEAL = "reveal",
}

type ToggleButtonProps = ButtonProps & { isExpanded: boolean };

export const ButtonFactory = (
  type: ButtonType,
  props: ButtonProps | ToggleButtonProps
): JSX.Element => {
  const cardButtonStyles =
    "hover:text-gray-700 transition-colors flex items-center justify-center";
  const actionButtonStyles =
    "text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1";

  switch (type) {
    case ButtonType.TOGGLE: {
      const { isExpanded, ...rest } = props as ToggleButtonProps;
      return (
        <button aria-label={isExpanded ? "Collapse" : "Expand"} className={cardButtonStyles} {...rest}>
          <span className="sr-only">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      );
    }

    case ButtonType.DELETE:
      return (
        <button aria-label="Delete card" className={cardButtonStyles} {...props}>
          <span className="sr-only">Delete</span>
          <XMarkIcon />
        </button>
      );

      // here will be "revert" button if needed. I used facory pattern to create buttons so we can add f.e. revert button easily

    case ButtonType.REFRESH:
      return (
        <button aria-label="Refresh the page" className={actionButtonStyles} {...props}>
          Refresh
        </button>
      );

    case ButtonType.REVEAL:
      return (
        <button aria-label="Reveal deleted cards" className={actionButtonStyles} {...props}>
          Reveal
        </button>
      );

    default:
      throw new Error(`Unsupported button type: ${type}`);
  }
};
