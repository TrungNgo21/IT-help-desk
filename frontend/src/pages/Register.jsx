import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { Formik, Form } from "formik";
import PasswordInput from "../components/formControl/PasswordInput";
import TextInput from "../components/formControl/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Registered successfully !!!");
      navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="text-center">
        <h1 className="text-3xl font-bold mt-12">
          <FaUser className="inline" /> Register
        </h1>
        <p className="font-semibold pt-4 text-2xl text-[#6A6F72]">
          Please create an account
        </p>
      </section>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(8, "Minimum 8 characters")
            .max(20, "Max 20 characters")
            .required("Required!!!"),
          email: Yup.string()
            .email("Invalid email format")
            .required("Required!!!"),
          password: Yup.string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              "Your password is not right format"
            )
            .min(8, "Minimum 8 characters")
            .required("Required!!!"),
          password2: Yup.string()
            .oneOf([Yup.ref("password")], "Password's not match")
            .required("Required!!!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const { name, email, password } = values;
          const userData = {
            name,
            email,
            password,
          };
          dispatch(register(userData));
          setSubmitting(false);
        }}
      >
        <Form className="form-control">
          <TextInput
            name="name"
            type="text"
            placeholder="Enter your full name"
          />
          <TextInput name="email" type="text" placeholder="Enter your email" />
          <PasswordInput name="password" placeholder="Enter your password" />
          <PasswordInput
            name="password2"
            placeholder="Confirm your password ?"
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Register;
