import React, { useState, useEffect, useRef } from 'react';
import { challengeApi } from '../api/challenge';

export const EditableTitle = ({ initialTitle, date, onTitleUpdate, isEditing, setIsEditing }) => {
  const [title, setTitle] = useState(initialTitle);
  const [tempTitle, setTempTitle] = useState(initialTitle);
  const inputRef = useRef(null);

  useEffect (() => {
    setTitle(initialTitle);
    setTempTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const trimmedTitle = tempTitle.trim();
    if (!trimmedTitle) {
      setTempTitle(title);
      setIsEditing(false);
      return;
    }

    if (trimmedTitle === title) {
      setIsEditing(false);
      return;
    }

    try {
      const response = await challengeApi.updateChallenge(date, {
          key: 'Title',
          value: trimmedTitle
      });

      if (response.data.success) {
        setTitle(trimmedTitle);
        onTitleUpdate(trimmedTitle);
        setIsEditing(false);
      }

    } catch (error) {
      console.error("Error updating challenge title:", error);
      setTempTitle(title);
      setIsEditing(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(title);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={tempTitle}
        onChange={(e) => setTempTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="title-input-editable"
        placeholder="Enter challenge title..."
        maxLength={100}
      />
    );
  }

  return <h1 className="title-display">{title || 'Untitled Challenge'}</h1>;
};
