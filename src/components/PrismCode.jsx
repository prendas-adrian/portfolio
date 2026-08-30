import { useMemo, useState } from "react";
import Prism from "../lib/prism";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function PrismCode({ language, children }) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");
  const html = useMemo(() => {
    const lang = (language || "").toLowerCase();
    if (lang && Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return escapeHtml(code);
  }, [code, language]);

  const className = `language-${(language || "").toLowerCase() || "text"}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block">
      <button
        type="button"
        className="copy-btn"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className={className}>
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  );
}

export default PrismCode;
