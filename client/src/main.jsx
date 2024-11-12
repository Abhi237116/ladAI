import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import App from "./routes/root.jsx";
import ContactUs from "./routes/contact.jsx";
import Home from "./routes/home.jsx";
import Txt2img from "./routes/txt2img.jsx";
import Img2img from "./routes/img2img.jsx";
import HelpPage from "./routes/help.jsx";
import "./index.css";
import "./styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Upscale from "./routes/upscaler.jsx";
import Grayscale from "./routes/grayscale.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      { path: "txt2img", element: <Txt2img /> },
      { path: "img2img", element: <Img2img /> },
      { path: "upscale", element: <Upscale /> },
      { path: "grayscale", element: <Grayscale /> },
      { path: "help", element: <HelpPage /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
