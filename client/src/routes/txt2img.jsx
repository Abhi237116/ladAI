import { useState, useEffect } from "react";
import { surpriseMePrompts } from "./constants/index";

function Txt2img() {
  const [image, setImage] = useState(null);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    let ignore = false;
    setImage(null);
    const prompt = "puppies in the cloud";
    fetch(`/generate-image?prompt=${encodeURIComponent(prompt)}`)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setImage(data.imageUrl);
          setCreated(false);
        }
      })
      .catch((error) => console.error("Error fetching image:", error));
    return () => {
      ignore = true;
      setCreated(false);
    };
  }, [created]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setCreated(true);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];
    fetch(`/generate-image?prompt=${encodeURIComponent(randomPrompt)}`)
      .then((response) => response.json())
      .then((data) => {
        setImage(data.imageUrl);
      })
      .catch((error) => console.error("Error fetching image:", error));
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
        image && (
        <img
          src={image}
          alt="Generated image preview"
          style={{ maxWidth: "100%" }}
        />
        )
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

      <button
        onClick={handleSurpriseMe}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Surprise Me!!
      </button>
    </div>
  );
}

export default Txt2img;
