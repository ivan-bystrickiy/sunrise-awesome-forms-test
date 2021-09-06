function Input(props) {
  const { className = "", multiline = false, ...rest } = props;

  if (multiline) {
    return <textarea className={`form-control ${className}`} {...rest} />;
  }

  return <input className={`form-control ${className}`} {...rest} />;
}

export { Input };
