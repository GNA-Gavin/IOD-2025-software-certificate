function Operator({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", margin: "8px", width: "100%" }}
    >
      <option value="+">Addition (+)</option>
      <option value="-">Subtraction (-)</option>
      <option value="*">Multiplication (×)</option>
      <option value="/">Division (÷)</option>
    </select>
  );
}

export default Operator;
