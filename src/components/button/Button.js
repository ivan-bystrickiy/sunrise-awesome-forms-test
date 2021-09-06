function Button(props) {
  const {
    label = props.children,
    color = "primary",
    className: _className = "",
    fullWidth,
    size,
    ...rest
  } = props;

  const className = `${_className} ${fullWidth ? "btn-block" : ""} ${
    size ? "btn-" + size : ""
  }`;

  return (
    <button className={`btn btn-${color} ${className}`} {...rest}>
      {label}
    </button>
  );
}

export { Button };
