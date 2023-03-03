import { useField } from "formik";

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        htmlFor={props.id || props.name}
        className=" self-start font-medium mt-2"
      >
        {label}
      </label>
      <select {...field} {...props} className="input-control" />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export default SelectInput;
