import { useRef, useState } from "react";

const useReorder = (items, setItems, sectionType) => {
  const onCardRef = useRef(0);
  const overCardRef = useRef(0);
  const timeoutRef = useRef(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSwap = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const updatedItems = [...items];
    const temp = updatedItems[onCardRef.current];
    updatedItems[onCardRef.current] = updatedItems[overCardRef.current];
    updatedItems[overCardRef.current] = temp;

    setItems(updatedItems);

    timeoutRef.current = setTimeout(() => {
      handleRequest(sectionType);
    }, 3000);
  };

  const handleRequest = async (sectionType) => {
    // sectionType must be a valid resume section, e.g. education, experience, skills

    const baseURL = "http://localhost:5000/resume/";
    try {
      const response = await fetch(`${baseURL}${sectionType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: items }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setResponse(data);
      setError(null);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return {
    response,
    error,
    reorderObj: { handleSwap, onCardRef, overCardRef },
  };
};

export default useReorder;
