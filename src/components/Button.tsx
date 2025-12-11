
interface Props{
    children: React.ReactNode;
    color?:"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    onClick: () => void;
    className?: string;
}
const Button = ({children, color="primary", onClick, className=""}: Props) => {
  return (
    <button className={`btn btn-${color} ${className}`} onClick={onClick}>{children}</button>
  )
}

export default Button