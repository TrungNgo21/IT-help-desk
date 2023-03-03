import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useField } from "formik";

const PasswordInput = ({ label, ...props }) => {
    const [isShow, setIsShow] = useState(false);
    const [field, meta] = useField(props);
    return (
      <>
        <div className="w-full relative">
          <input
            type={isShow ? "text" : "password"}
            className={
              meta.touched && meta.error ? `input-error` : "input-control"
            }
            {...field}
            {...props}
          />
          {isShow ? (
            <AiFillEye
              onClick={() => setIsShow((prev) => !prev)}
              className="absolute top-1/2 -translate-y-1/2 right-0 mr-2 text-xl cursor-pointer"
            />
          ) : (
            <AiFillEyeInvisible
              onClick={() => setIsShow((prev) => !prev)}
              className="absolute top-1/2 -translate-y-1/2 right-0 mr-2 text-xl cursor-pointer"
            />
          )}
        </div>
        {meta.touched && meta.error ? (
          <div className="font-semibold self-start text-red-500 ">
            {meta.error}
          </div>
        ) : null}
      </>
    );
  }

  export default PasswordInput