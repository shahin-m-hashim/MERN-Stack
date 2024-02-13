import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ReLoginPage() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setInterval(() => navigate(-1), 1000); // Redirects the user back to previous page
  // }, [navigate]);

  useEffect(() => {
    setInterval(() => navigate("/api/login"), 1500);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Your Session has expired.
          <br /> Please Login Again.
        </p>
        <div className="animate-bounce">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>

        <p> We are getting you back home.</p>
        {/* <Link to="/" className="block mt-3 text-xl text-blue-500 ">
          Oops, not enough patience, Click here.
        </Link> */}
      </div>
    </div>
  );
}
