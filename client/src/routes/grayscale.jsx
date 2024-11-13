import { useState, useEffect } from "react";
import ImageUploader from "../components/ImagePreview";

function Grayscale() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!image) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }

            ctx.putImageData(imageData, 0, 0);
            setGrayscaleImage(canvas.toDataURL());
        };

        img.src = image;
    }, [image]);

    const [grayscaleImage, setGrayscaleImage] = useState(null);

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
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "80vw" }}>
                <ImageUploader image={image} setImage={setImage} />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "512px",
                        width: "50px",
                    }}
                >
                    <span style={{ color: "white", fontSize: "120px" }}>→</span>
                </div>
                <div
                    style={{
                        border: "10px solid #ccc",
                        borderRadius: "4px",
                        marginBottom: "20px",
                        height: "512px",
                        width: "512px",
                        background: "white",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={grayscaleImage}
                        style={{ maxWidth: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Grayscale;
