export const Input = ({
  title,
  type = "text",
  placeholder = "",
  className = "",
  value,
  onSubmit,
  onChange,
  name,
}) => {
  return (
    <div className="form-control w-full my-3">
      {title && (
        <label className="label">
          <span className="label-text text-base font-semibold text-primary">
            {title}
          </span>
        </label>
      )}
      <input
        name={name}
        value={value}
        onSubmit={onSubmit}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className={`input input-bordered input-primary w-full rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-base ${className}`}
        required
      />
    </div>
  );
};


export const PasswordInput = ({
  title,
  placeholder = "",
  className = "",
  value,
  onSubmit,
  onChange,
  name,
}) => {
  return (
    <div className="form-control w-full my-3">
      {title && (
        <label className="label">
          <span className="label-text text-base font-semibold text-primary">
            {title}
          </span>
        </label>
      )}
      <input
        name={name}
        type="password"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onSubmit={onSubmit}
        className={`input input-bordered input-primary w-full rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-base ${className}`}
        required
      />
    </div>
  );
};
