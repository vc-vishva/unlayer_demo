import React, { useEffect, useRef } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const fontsConfig = {
  showDefaultFonts: true,
  customFonts: [
    {
      label: "Lobster",
      value: "'Lobster', cursive",
      url: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
      weights: [{ label: "Regular", value: 400 }],
    },
    {
      label: "Roboto",
      value: "'Roboto', sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
      weights: [
        { label: "Regular", value: 400 },
        { label: "Bold", value: 700 },
      ],
    },
    {
      label: "Montserrat",
      value: "'Montserrat', sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
      weights: [
        { label: "Regular", value: 400 },
        { label: "Bold", value: 700 },
      ],
    },
    {
      label: "Pacifico",
      value: "'Pacifico', cursive",
      url: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
      weights: [{ label: "Regular", value: 400 }],
    },
    {
      label: "Open Sans",
      value: "'Open Sans', sans-serif",
      url: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap",
      weights: [
        { label: "Regular", value: 400 },
        { label: "Bold", value: 700 },
      ],
    },
  ],
};

export default function EmailEditorWrapper() {
  const editorRef = useRef<any>(null);

  // Preload font CSS links
  useEffect(() => {
    const fontUrls = fontsConfig.customFonts.map((f: any) => f.url).filter(Boolean) as string[];
    fontUrls.forEach((url) => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
      }
    });
  }, []);

  // Save design JSON to backend
  const handleSaveTemplate = () => {
    if (!editorRef.current) return;

    editorRef.current.editor.exportHtml(
      async (data: { design: any; html: string }) => {
        const payload = {
          name: "Template " + new Date().toISOString(),
          design: data.design,
          html: data.html,
        };

        try {
          const res = await axios.post(`${API_BASE}/api/templates`, payload);
          alert("Template saved successfully! ID: " + res.data._id);
        } catch (err) {
          console.error(err);
          alert("Save failed - see console");
        }
      },
      { minify: true }
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button
          onClick={handleSaveTemplate}
          style={{
            padding: "8px 16px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save Template
        </button>
      </div>

      <div style={{ height: 700 }}>
        <EmailEditor
          ref={editorRef}
          onLoad={() => {
            console.log("Unlayer loaded with custom fonts, uploads, and merge tags");
          }}
          options={{
            fonts: fontsConfig,
            appearance: {
              theme: "light",
              panels: {
                tools: {
                  dock: "left", 
                },
              },
            },
            features: {
              undoRedo: true, 
              imageEditor: {
                enabled: false, 
              },
              stockImages: true,
            },
            tools: {
              menu: {
                enabled: false, 
              },
            },
            mergeTags: [
              {
                name: "First Name",
                value: "{{firstname}}",
              },
              {
                name: "Last Name",
                value: "{{lastname}}",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}