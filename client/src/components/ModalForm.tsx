import Modal from "./ModalComp";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "./FormFields/ButtonComp";
import FormInput from "./FormFields/FormInput";

interface MyFormValues {
  name: string;
  email: string;
}

const MyFormModal = ({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) => {
  const initialValues: MyFormValues = { name: "", email: "" };

  const handleSubmit = (values: MyFormValues) => {
    console.log("Form submitted", values);
    // onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} testId="my-form-modal">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="space-y-4">
            <FormInput
              name="name"
              labelName="Name"
              placeHolder="Enter your name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            <FormInput
              name="email"
              labelName="Email"
              placeHolder="Enter your email"
              type="email"
              onChange={handleChange}
              value={values.email}
            />

            <div className="flex justify-end space-x-4">
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button type="button" variant="danger" onClick={onClose}>
                Close
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default MyFormModal;
