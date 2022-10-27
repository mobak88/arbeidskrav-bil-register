import { useEffect, useState } from "react";
import axios from "axios";

const useAxiosFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(url, {
          signal: abortController.signal,
        });
        const json = await res.json();

        setData(json);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setLoading(false);
          setError(error);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { loading, error, data };
};

export default useAxiosFetch;
