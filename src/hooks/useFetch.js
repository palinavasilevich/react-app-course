import { useState } from "react";
import { delayFn } from "../helpers/delayFn";

export const useFetch = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (arg) => {
    try {
      setIsLoading(true);
      setError("");

      // Simulate server request delay
      await delayFn();

      const response = await callback(arg);
      return response;
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, error];
};
