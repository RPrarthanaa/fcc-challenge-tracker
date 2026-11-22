import { useEffect, useRef, useState } from 'react';
import { ClipboardCopy, ClipboardCheck, Pencil, Check, X } from 'lucide-react';
import { challengeApi } from '../api/challenge';

export const CodeCard = ({ initialCode, language, date }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCode, setTempCode] = useState(initialCode);
  const [code, setCode] = useState(initialCode);
  const textareaRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setTempCode(initialCode);
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleSave = async () => {
    const trimmedCode = tempCode.trim();
    if (!trimmedCode) {
      setTempCode(code);
      setIsEditing(false);
      return;
    }

    try {
      const response = await challengeApi.updateChallenge(date, {
          key:"Editor",
          value: {
            language: language,
            code: trimmedCode
          }
      });

      if (response.data.success) {
        setCode(trimmedCode);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating code for ", language);
      setIsEditing(false);
      setTempCode(code);
    }
  }

  const handleCancel = () => {
    setIsEditing(false);
    setTempCode(code);
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if  (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <div className="code-card">
      <div className="code-card-header">
        <div className='code-card-title'>
          <h3>{language}</h3>
          {isEditing ? (
            <div className='edit-actions'>
              <div className='edit-btn' onClick={handleSave} title='Save'>
                <Check size={18} />
              </div>
              <div className='edit-btn' onClick={handleCancel} title='Cancel'>
                <X size={18} />
              </div>
            </div>
          ) : (
            <div
              className='edit-btn'
              onClick={() => setIsEditing(true)}
              title='Edit'
            >
              <Pencil size={18} />
            </div>
          )}
        </div>
        <button onClick={handleCopy} className="copy-btn">
          {copied ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
        </button>
      </div>
      
      <div className="code-card-body">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className='code-card-textarea'
            value={tempCode}
            onChange={(e) => setTempCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
        ) : (
          <pre>
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};