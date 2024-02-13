import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReLoginPage from "./pages/ReLoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "api",
    children: [
      {
        index: true, // render this component incase user goes to http://localhost:5173/api
        element: <ErrorPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
  },
  {
    path: "reLogin",
    element: <ReLoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
