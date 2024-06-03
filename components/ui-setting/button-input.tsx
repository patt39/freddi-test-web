import { Button, SizeButton, VariantButton } from "@/components/ui/button";

interface Props {
  asChild?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  size?: SizeButton;
  variant: VariantButton;
  loading?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  onMouseLeave?: () => void;
  ref?: (node?: Element | null) => void;
}

export const ButtonInput = ({
  asChild,
  type,
  size,
  icon,
  children,
  className,
  onClick,
  loading,
  variant,
  title,
  disabled,
  onMouseLeave,
  ref,
}: Props) => {
  return (
    <>
      <Button
        ref={ref}
        type={type}
        className={className}
        size={size}
        title={title}
        asChild={asChild}
        variant={variant}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        disabled={disabled ? disabled : loading}
      >
        {loading ? (
          <>Please wait...</>
        ) : (
          <>
            <span className="mr-2">{icon}</span> {children}
          </>
        )}
      </Button>
    </>
  );
};
