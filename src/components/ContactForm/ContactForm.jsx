import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
export default function ContactForm() {
  const initialValues = {
    name: "",
    number: "",
  };

  const addContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too short!")
      .max(50, "Name is too long!")
      .required("Please enter the contact's name"),

    number: Yup.string()
      .min(3, "Number is too short")
      .max(50, "Number is too long")
      .matches(
        /^(?!-)(?!.*--)[0-9]+(-[0-9]+)*$/,
        "Only numbers divided by dashes are accepted here"
      )
      .required("Please enter the contact's phone"),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));

    actions.resetForm();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2500);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addContactSchema}
      validateOnChange={false}
      validateOnBlur={false}>
      <Form className={css.form}>
        <label htmlFor='name'>Name</label>
        <Field
          name='name'
          id='name'
          placeholder='Type contact name here'></Field>
        <div className={css.nameErrorWrapper}>
          <ErrorMessage
            className={css.nameError}
            name='name'
            component='span'
          />
        </div>
        <label htmlFor='number'>Number</label>
        <Field
          name='number'
          id='number'
          type='tel'
          placeholder='Type phone number here'></Field>
        <div className={css.numberErrorWrapper}>
          <ErrorMessage
            className={css.numberError}
            name='number'
            component='span'
          />
          {isSubmitted && (
            <span className={css.successMessage}>
              Contact successfully added
            </span>
          )}
        </div>
        <button type='submit'>Add contact</button>
      </Form>
    </Formik>
  );
}
