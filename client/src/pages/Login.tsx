import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ILogin } from "../interface/interface";
import { useRegisterMutation } from "../redux/services/authApi";
import FormInput from "../components/FormFields/FormInput";

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: ILogin & { name: string }) => {
    try {
      await registerUser(values).unwrap();
      alert("Registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-200 hidden md:flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-600">Welcome!</h2>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80 md:w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ name: "", email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values }) => (
              <Form>
                <FormInput
                  name="name"
                  labelName="Name"
                  placeHolder="Enter your name"
                  data-testid="nameInput"
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                />
                <FormInput
                  name="email"
                  labelName="Email"
                  placeHolder="Enter your email"
                  data-testid="emailInput"
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                />
                <FormInput
                  name="password"
                  labelName="Password"
                  placeHolder="Enter your password"
                  data-testid="passwordInput"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  data-testid="registerBtn"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
