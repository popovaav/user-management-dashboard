interface PaginationButton {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const PaginationButton = ({
  onClick,
  disabled,
  children,
}: PaginationButton) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-disabled={disabled}
    className="aria-disabled:text-slate-400 aria-disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

export default PaginationButton;
