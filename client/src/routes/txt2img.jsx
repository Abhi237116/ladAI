import { useState } from "react";
// import { surpriseMePrompts } from "../constants/index.js";
import { useQuery } from "@tanstack/react-query";

async function fetchImage(prompt) {
  const response = await fetch(`/api/generate-image?prompt=${encodeURIComponent(prompt)}`);
  return await response.json();
}

function Txt2img() {
  const [prompt, setPrompt] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ["image", prompt],
    queryFn: function () { setShouldFetch(false); return fetchImage(prompt); },
    enabled: shouldFetch,
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShouldFetch(true);
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
        {isFetching && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div className="loader"></div>
          </div>
        )}
        {!isFetching && data && data.imageUrl && (
          <img
            src={data.imageUrl}
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
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyPress}
      />

    </div>
  );
}

export default Txt2img;
