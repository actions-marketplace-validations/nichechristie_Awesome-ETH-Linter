"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages?: string; autoDisplay?: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

export default function TranslateBar() {
  useEffect(() => {
    // Only load once
    if (document.getElementById("google-translate-script")) return;

    // Define the init function
    window.googleTranslateElementInit = () => {
      new window.google!.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load the Google Translate script
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="notranslate flex items-center justify-center gap-3 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-sm" translate="no">
      <label className="text-slate-400">
        🌐 Translate / Traducir / 翻译 / Übersetzen:
      </label>
      <div id="google_translate_element" className="translate-widget"></div>
    </div>
  );
}
