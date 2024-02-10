import { useFormik } from "formik";
import { validationSchema } from "../validations/signupValidation";
import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function SignupPage() {
  const initialValues = {
    username: "johnie",
    email: "johnie@yahoo.com",
    password: "John@123",
    cPassword: "John@123",
  };

  const postData = async (data) => {
    try {
      const response = await axios.post(base_url + "api/signup", data);
      console.log(response);
    } catch (e) {
      console.log(e.response);
    } finally {
      console.log("Done Posting");
    }
  };

  const onSubmit = (values) => {
    const { username, email, password } = values;
    postData({ username, email, password });
  };

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    getFieldProps,
    isValid,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="h-screen lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-center flex-1 min-h-full py-12 px-7 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-center">
            Registration Form
          </h1>
          <form
            onSubmit={handleSubmit}
            method="post"
            action="/api/signup"
            className="w-full max-w-sm p-8 mx-auto bg-white rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="username"
                name="username"
                placeholder="john123"
                {...getFieldProps("username")}
                // this reduces boiler plate for the below 3 repeating lines of code in formik input
                // onBlur={formik.handleBlur}
                // value={formik.values.email}
                // onChange={formik.handleChange}
              />
              {errors.username && touched.username ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.username}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="john@example.com"
                {...getFieldProps("email")}
              />
              {errors.email && touched.email ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="password"
                name="password"
                placeholder="Enter a secure password"
                {...getFieldProps("password")}
              />
              {errors.password && touched.password ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="cPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="cPassword"
                name="cPassword"
                placeholder="Confirm Your Password"
                value={values.cPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.cPassword && touched.cPassword ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.cPassword}
                </p>
              ) : null}
            </div>
            <button
              className="w-full px-4 py-2 text-sm font-bold text-white transition duration-300 bg-indigo-500 rounded-md hover:bg-indigo-600"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Register
            </button>
            <button
              className="w-full px-4 py-2 mt-3 text-sm font-bold text-white transition duration-300 bg-red-500 rounded-md hover:bg-red-600"
              type="reset"
              onClick={resetForm}
            >
              Reset Form
            </button>
          </form>
        </div>
        <img
          className="hidden object-cover object-center h-screen lg:block"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ></img>
      </div>
    </>
  );
}
