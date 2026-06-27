import { React, useState } from 'react';
import { ClipboardCopy, ClipboardCheck } from 'lucide-react';

export const CodeCard = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-card">
      <div className="code-card-header">
        <h3>{language}</h3>
        <button onClick={handleCopy} className="copy-btn">
          {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
        </button>
      </div>
      
      <div className="code-card-body">
        <p>{code}</p>
      </div>
    </div>
  );
};