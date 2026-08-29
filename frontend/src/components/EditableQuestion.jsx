import { useState, useEffect, useRef } from 'react';
import { challengeApi } from '../api/challenge';

export const EditableQuestion = ({ initialQuestion, date, onQuestionUpdate, isEditing, setIsEditing }) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [tempQuestion, setTempQuestion] = useState(initialQuestion);
  const textareaRef = useRef(null);

  useEffect(() => {
    setQuestion(initialQuestion);
    setTempQuestion(initialQuestion);
  }, [initialQuestion]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const val = textareaRef.current.value;
      textareaRef.current.setSelectionRange(val.length, val.length);
      autoResize();
    }
  }, [isEditing]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const handleSave = async () => {
    const trimmedQuestion = tempQuestion.replace(/^\s+|\s+$/g, '');
    if (!trimmedQuestion) {
      setTempQuestion(question);
      setIsEditing(false);
      return;
    }

    try {
      const response = await challengeApi.updateChallenge(date, {
        key: 'Question',
        value: trimmedQuestion
      });

      if (response.data.success) {
        setQuestion(trimmedQuestion);
        onQuestionUpdate(trimmedQuestion);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating challenge question:", error);
      setTempQuestion(question);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setTempQuestion(e.target.value);
    autoResize();
  };

  const handleKeyDown = (e) => {
    // Save with Ctrl+Enter / Cmd+Enter.
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setTempQuestion(question);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={tempQuestion}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="question-input-editable"
        placeholder="Enter challenge question..."
        rows={1}
      />
    );
  }

  return (
    <p className="question-display" style={{ whiteSpace: 'pre-wrap' }}>
      {question || 'Enter the challenge question for the selected date.'}
    </p>
  );
};