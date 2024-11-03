import { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "2px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        width: "300px",
        height: "300px",
        margin: "20px auto",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload"
      />
      {!image ? (
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <strong>Click to upload</strong> or drag and drop an image
        </label>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <img
            src={image}
            alt="Uploaded preview"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
