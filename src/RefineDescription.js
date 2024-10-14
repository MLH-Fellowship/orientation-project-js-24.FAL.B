import React, { useState } from "react";
import axios from "axios";

const RefineDescription = ({ description, setDescription }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRefinedDescription = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: description }],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Ensure response contains choices and a message
      if (response.data.choices && response.data.choices.length > 0) {
        setDescription(response.data.choices[0].message.content);
      } else {
        throw new Error("No choices received from the API.");
      }
    } catch (err) {
      setError("Failed to fetch refined description. Please try again.");
      console.error("Error fetching refined description:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={fetchRefinedDescription} disabled={loading}>
        Refine Description
      </button>
    </div>
  );
};

export default RefineDescription;
