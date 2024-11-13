import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageUploader from "../components/ImagePreview";

async function fetchImage(image) {
    const response = await fetch(`/api/upscale`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: image.split(",")[1] }),
    });
    return await response.json();
}

function Upscale() {
    const [image, setImage] = useState(null);

    const [queryEnabled, setQueryEnabled] = useState(false);

    useEffect(() => {
        if (image) {
            setQueryEnabled(true);
        }
    }, [image]);

    const { data, isFetching } = useQuery({
        queryKey: ["fetchImage", image],
        queryFn: () => fetchImage(image),
        enabled: queryEnabled,
    });

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
        </div>
    );
}

export default Upscale;
