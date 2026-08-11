import React, { useState, useEffect, useRef } from 'react';
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
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const trimmedQuestion = tempQuestion.trim();
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents adding a new line
      handleSave();
    } else if (e.key === 'Escape') {
      setTempQuestion(question);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  }

  if (isEditing) {
    return (
      <input
        ref={textareaRef}
        type="text"
        value={tempQuestion}
        onChange={(e) => setTempQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="question-input-editable"
        placeholder="Enter challenge question..."
      />
    );
  }

  return <p className="question-display">{question || 'Enter the challenge question for the selected date.'}</p>
}