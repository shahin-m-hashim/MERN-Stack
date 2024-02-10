import axios from "axios";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("IDLE");

  const fetchData = async () => {
    try {
      setStatus("LOADING");
      const { data } = await axios.get("https://randomuser.me/api?results=10");
      console.log(data);
      setData(data.results);
      setStatus("SUCCESS");
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setStatus("ERROR");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (status === "LOADING") {
    return <LoadingComponent />;
  } else if (status === "ERROR") {
    return <ErrorPage />;
  } else if (status === "SUCCESS") {
    return <h1>Welcome to Your Dashboard {data && data[0].name.first}</h1>;
  }
}
