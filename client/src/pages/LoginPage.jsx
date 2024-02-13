import axios from "axios";
import { useId } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../validations/loginValidation";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function LoginPage() {
  const emailId = useId();
  const passwordId = useId();

  const navigate = useNavigate();

  const initialValues = {
    email: "johnie@yahoo.com",
    password: "John@123",
  };

  const onSubmit = (values) => {
    axios
      .post(base_url + "api/login", values, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard", { replace: true });
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.error);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <div className="h-screen lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-center flex-1 min-h-full py-12 px-7 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="w-auto h-10 mx-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
              Log in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="w-full max-w-sm p-8 mx-auto space-y-6 bg-white rounded-md shadow-md"
              onSubmit={formik.handleSubmit}
              method="post"
              action="/api/login"
            >
              <div>
                <label
                  htmlFor={emailId}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={passwordId}
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id={passwordId}
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-sm text-center text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign Up Right Now
              </a>
            </p>
          </div>
        </div>
        <img
          className="hidden object-cover object-center h-screen lg:block"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ></img>
      </div>
    </>
  );
}
