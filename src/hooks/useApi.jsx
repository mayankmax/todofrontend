import React, { useEffect, useState } from "react";
import axios from "axios";

const useApi = ({ method, url, body }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isApiCalled, setIsApiCalled] = useState(false);
  console.log(body);

  useEffect(() => {
    const makeApiCall = async () => {
      if (!isApiCalled) {
        setIsLoading(true);
        try {
          const response = await axios.post("http://localhost:8080/api/gettasks",{
            userEmail: body
          });
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
          setIsApiCalled(true);
        }
      }
    };

    makeApiCall();
  }, [isApiCalled, method, url, body]);

  return {
    isLoading,
    data,
    error
  };
};

export default useApi;