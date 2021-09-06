function Checkbox(props) {
  const {
    label = "",
    className = "",
    onChange,
    checked,
    defaultChecked,
    ...rest
  } = props;

  return (
    <label className={`Checkbox ${className}`} {...rest}>
      <input
        className="form-check-input me-2"
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
      />
      <span>{label}</span>
    </label>
  );
}

export { Checkbox };
