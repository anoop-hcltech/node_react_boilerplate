import { ILogin } from "../interface/interface";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../redux/services/authApi";
import FormInput from "../components/FormFields/FormInput";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid format"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: ILogin) => {
    try {
      const response = await loginUser(values).unwrap();

      localStorage.setItem("user", JSON.stringify(response));
      const location = response.role === "admin" ? "/dashboard" : "/";
      window.location.href = location;
      alert("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Gray Section */}
      <div className="w-1/2 bg-gray-200 hidden md:flex items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-600">Welcome Back!</h2>
      </div>

      {/* Right White Section with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-80 md:w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {({ handleChange, values }) => (
              <Form>
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
                  data-testid="loginBtn"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
