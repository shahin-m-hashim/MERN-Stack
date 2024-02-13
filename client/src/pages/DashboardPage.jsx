import axios from "axios";
import { useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import ServerErrorPage from "./ServerErrorPage";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function DashboardPage() {
  const [status, setStatus] = useState("LOADING");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const reAuthorize = async () => {
    console.log("Re authorizing user");
    try {
      const { data } = await axios.get(base_url + "refresh/user", {
        withCredentials: true,
      });
      console.log("Data:", data);
      setUser(data.data);
      setStatus("SUCCESS");
    } catch (error) {
      console.log("Re authorizing failed");
      console.error(error.message);
      error.response.status === 401 ? navigate("/reLogin") : setStatus("ERROR");
    }
  };

  const authorize = async () => {
    console.log("Authorizing and Fetching User Data");

    try {
      const { data } = await axios.get(base_url + "authenticate/user", {
        withCredentials: true,
      });
      console.log("Data:", data);
      setUser(data.data);
      setStatus("SUCCESS");
    } catch (error) {
      console.log("Authorization failed");
      console.error(error.message);
      error.response.status === 401
        ? navigate("/api/login")
        : setStatus("ERROR");
    }
  };

  useEffect(() => {
    // console.log("Inside Effect");

    authorize();

    let interval = setInterval(
      () => reAuthorize(),
      1 * 24 * 60 * 1000 // Refresh every 1 day
    );
    return () => clearInterval(interval);
  }, []);

  if (status === "SUCCESS") {
    return <h1>Welcome to Your Dashboard {user.username}</h1>;
  } else if (status === "ERROR") {
    return <ServerErrorPage />;
  } else {
    return <LoadingComponent />;
  }
}
