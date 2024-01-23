interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  buttonType:'secondary' | 'primary';
}

export default function Button({ onClick, className, children, buttonType }: ButtonProps) {
  const baseStyle = "py-2 px-4 rounded font-bold";
  const primaryStyle = "bg-blue-500 hover:bg-blue-700 text-white";
  const secondaryStyle = "bg-gray-300 hover:bg-gray-400 text-black";

  const baseClassName = `${baseStyle} ${buttonType === "primary" ? primaryStyle : secondaryStyle}`;

  return (
    <button onClick={onClick} className={`${baseClassName} ${className}`}>
    {children}
  </button>
  );
}
