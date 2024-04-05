export interface Props {
  children: React.ReactNode;
  off?: boolean;
  enabledColor: string;
  disabledColor: string;
  onClick: () => void;
}

export const ActionButton = ({
  children,
  off = false,
  enabledColor,
  disabledColor,
  onClick,
}: Props) => {
  const bgColor = off ? disabledColor : enabledColor;

  return (
    <button
      type='button'
      className={`relative p-3 rounded-full ${bgColor}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
