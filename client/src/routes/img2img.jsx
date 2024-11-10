import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageUploader from "../components/ImagePreview";

async function fetchImage(prompt, image) {
    const response = await fetch(`/api/img2img`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, image: image.split(",")[1] }),
    });
    return await response.json();
}

function Img2img() {
    const [image, setImage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [shouldFetch, setShouldFetch] = useState(false);

    const { data, isFetching } = useQuery({
        queryKey: ["fetchImage", prompt, image],
        queryFn: function () { setShouldFetch(false); return fetchImage(prompt, image); },
        enabled: shouldFetch,
    });

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            setShouldFetch(!!image && !!prompt);
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

export default Img2img;
