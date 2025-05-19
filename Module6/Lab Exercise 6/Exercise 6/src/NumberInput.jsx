function NumberInput({ label, value, onChange, placeholder }) {
  return (
    <div 
    style={{ margin: "10px" }}
    >
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "8px" }}
      />
    </div>
  );
}

export default NumberInput;
