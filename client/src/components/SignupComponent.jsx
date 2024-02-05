export default function SignupComponent() {
  return (
    <>
      <div className="h-screen lg:grid lg:grid-cols-2">
        <div className="flex flex-col justify-center flex-1 min-h-full py-12 px-7 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-center">
            Registration Form
          </h1>
          <form className="w-full max-w-sm p-8 mx-auto bg-white rounded-md shadow-md">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
              />
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
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
              />
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
                placeholder="********"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="********"
              />
            </div>
            <button
              className="w-full px-4 py-2 text-sm font-bold text-white transition duration-300 bg-indigo-500 rounded-md hover:bg-indigo-600"
              type="submit"
            >
              Register
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
