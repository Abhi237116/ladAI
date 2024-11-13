import PropTypes from 'prop-types';

function ImageUploader({ image, setImage }) {
  const setFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "10px solid #ccc",
        borderRadius: "4px",
        height: "512px",
        width: "512px",
        background: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload" />
      {!image ? (
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          <strong>Click to upload</strong> or drag and drop an image
        </label>
      ) : (
        <div style={{ position: "relative" }}>
          <img
            src={image}
            alt="Uploaded preview" />
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
            onClick={() => setImage(null)}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

ImageUploader.propTypes = {
  image: PropTypes.string,
  setImage: PropTypes.func.isRequired,
};

export default ImageUploader;