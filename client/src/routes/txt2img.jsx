import { useState, useEffect } from "react";
// import { surpriseMePrompts } from "../constants/index.js";
import { useQuery } from "@tanstack/react-query";

async function fetchImage(prompt) {
  const response = await fetch(`/generate-image?prompt=${encodeURIComponent(prompt)}`);
  return await response.json();
}

function Txt2img() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");

  const { data, isSuccess } = useQuery({
    queryKey: ["image", prompt],
    queryFn: () => fetchImage(prompt),
    enabled: !!prompt,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setImage(data.imageUrl);
    }
  }, [isSuccess, data]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (prompt !== event.target.value) {
        setPrompt(event.target.value);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          border: "10px solid #ccc",
          borderRadius: "4px",
          marginBottom: "20px",
          height: "512px",
          width: "512px",
          background: "white",
        }}
      >
        {image && (
          <img
            src={image}
            alt="Generated image preview"
            style={{ maxWidth: "100%" }}
          />
        )}
      </div>
      <input
        style={{
          width: "50%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
        type="text"
        id="text"
        placeholder="Enter your prompt"
        onKeyDown={handleKeyPress}
      />

    </div>
  );
}

export default Txt2img;
