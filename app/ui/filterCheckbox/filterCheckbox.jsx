import './filterCheckbox.css';

export default function FilterCheckbox({ name, value, label }) {
  return (
    <div className='checkbox-box'>
      <label>
        <input type='checkbox' name={name} value={value} />
        {label}
      </label>
    </div>
  );
}
