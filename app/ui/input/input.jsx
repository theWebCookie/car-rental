import './input.css';

export default function Input({ type, className = '', ...props }) {
  return <input type={type} {...props} className={`ui-input ${className}`} />;
}
