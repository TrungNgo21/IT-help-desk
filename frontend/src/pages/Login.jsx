import * as Yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/formControl/PasswordInput";
import TextInput from "../components/formControl/TextInput";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
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
      toast.success("Login successfully !!!");
      navigate("/");
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
          <FaSignInAlt className="inline" /> Login
        </h1>
        <p className="font-semibold pt-4 text-2xl text-[#6A6F72]">
          Please log in to get support
        </p>
      </section>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
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
        })}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password } = values;
          const userData = {
            email,
            password,
          };
          dispatch(login(userData));
          setSubmitting(false);
        }}
      >
        <Form className="form-control">
          <TextInput name="email" placeholder="Please enter your email" />
          <PasswordInput
            name="password"
            placeholder="Please enter your password"
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default Login;
