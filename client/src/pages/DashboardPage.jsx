import axios from "axios";
import { useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_APP_BASE_URL;

export default function DashboardPage() {
  const [status, setStatus] = useState("IDLE");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setStatus("LOADING");
      const { data } = await axios.post(
        base_url + "authenticateUser",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setStatus("SUCCESS");
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setStatus("ERROR");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "ERROR") {
      navigate("/login");
    }
  }, [status, navigate]);

  if (status === "LOADING") {
    return <LoadingComponent />;
  } else if (status === "SUCCESS") {
    return <h1>Welcome to Your Dashboard</h1>;
  }
}
