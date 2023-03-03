import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/formControl/TextInput";
import SelectInput from "../components/formControl/SelectInput";
import TextAreaInput from "../components/formControl/TextAreaInput";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/Tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl font-bold mt-12">Create New Ticket</h1>
        <p className="font-bold pt-4 text-2xl text-[#6A6F72]">
          Please fill out the form below
        </p>
      </section>
      <Formik
        initialValues={{
          name: user.name,
          email: user.email,
          product: "Iphone",
          description: "",
        }}
        validationSchema={Yup.object({
          description: Yup.string()
            .min(20, "Please enter at least 20 characters !!!")
            .max(100, "You can only enter at most 100 characters !!!")
            .required("Required !!!"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const { name, email, product, description } = values;
          console.log(values);
          dispatch(createTicket({ product, description }));
          setSubmitting(false);
        }}
      >
        <Form className="form-control">
          <TextInput label="Customer's name" isDisabled={true} name="name" />
          <TextInput label="Customer's email" isDisabled={true} name="email" />
          <SelectInput label="Product" name="product">
            <option value="Iphone">Iphone</option>
            <option value="Macbook Pro">Macbook Pro</option>
            <option value="Imac">Imac</option>
            <option value="Ipad">Ipad</option>
          </SelectInput>
          <TextAreaInput
            label="Description of your issues"
            name="description"
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default NewTicket;
