import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const useAxiosFetch = (url, method = "GET", body = null, headers = {}) => {
  const [resData, setResData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const memoizedHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      ...headers,
    }),
    [headers]
  );

  const memoizedBody = useMemo(() => body, [body]);

  // Función para ejecutar una solicitud HTTP
  const execute = useCallback(
    async (customUrl = url, customMethod = method, customBody = body) => {
      const controller = new AbortController();
      const signal = controller.signal;

      setLoading(true);
      setError(null); // Limpiar errores previos

      try {
        const response = await axios({
          url: customUrl,
          method: customMethod,
          headers: memoizedHeaders,
          data: customBody,
          signal,
        });

        setResData(response.data); // Guardar datos exitosos
        return response.data; // Devolver datos al ejecutarse
      } catch (err) {
        if (!signal.aborted) {
          setError({
            message: err.message,
            code: err.response?.status || "NETWORK_ERROR",
            details: err.response?.data || null,
          });
          throw err; // Propagar el error si es necesario
        }
      } finally {
        setLoading(false);
      }
    },
    [url, method, memoizedHeaders, memoizedBody]
  );

  // Fetch inicial cuando cambia la URL o dependencias
  useEffect(() => {
    if (!url) return;
    execute(); // Llamada inicial al fetch
  }, [url]);

  return { resData, error, loading, refetch: execute, execute };
};

export default useAxiosFetch;
