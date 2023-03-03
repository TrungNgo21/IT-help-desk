import { useField } from "formik";

const TextInput = ({ label, isDisabled, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className=" self-start font-medium mt-2"
      >
        {label}
      </label>
      <input
        type="text"
        className={meta.touched && meta.error ? `input-error` : "input-control"}
        disabled = {isDisabled ? true : false }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="font-semibold self-start text-red-500 ">
          {meta.error}
        </div>
      ) : null}
    </>
  );
};

export default TextInput;
