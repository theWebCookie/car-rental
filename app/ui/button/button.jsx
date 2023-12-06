import './button.css';

export default function Button({ text, className = '', ...props }) {
  return (
    <button className={`ui-btn ${className}`} {...props}>
      {text}
    </button>
  );
}
