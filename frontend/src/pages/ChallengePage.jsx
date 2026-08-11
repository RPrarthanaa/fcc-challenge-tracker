import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { CodeCard } from '../components/CodeCard';
import { ChevronLeft, Pencil } from 'lucide-react';
import { challengeApi } from '../api/challenge';
import { EditableTitle } from '../components/EditableTitle';
import { EditableQuestion } from '../components/EditableQuestion';

export const ChallengePage = () => {
  const { date } = useParams();
  const location = useLocation();
  const existingPage = location.state?.existingPage || false;

  const [ title, setTitle ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ status, setStatus ] = useState('In Progress');
  const [ isEditingTitle, setIsEditingTitle ] = useState(false);
  const [ isEditingQuestion, setIsEditingQuestion ] = useState(false);
  //const [ javaScript, setJavaScript ] = useState('');
  //const [ python, setPython ] = useState('');

  const fetchChallengeData = async () => {
    try {
      const response = await challengeApi.getByDate(date);
      if (response.data.success) {
        const challenge = response.data.challenges[0];
        setTitle(challenge.Title || '');
        setQuestion(challenge.Question || '');
        setStatus(challenge.Status);
        // setJavaScript(challenge.JavaScript || '');
        // setPython(challenge.Python || '');
      }
    } catch (error) {
      console.error("Error fetching challenge data:", error);
    }
  };

    useEffect(() => {
    fetchChallengeData();
  }, [date]);

  const handleTitleUpdate = (newTitle) => {
    setTitle(newTitle);
  };
  const handleQuestionUpdate = (newQuestion) => {
    setQuestion(newQuestion);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await challengeApi.updateChallenge(date, {
        key: "Status",
        value: newStatus
      });

      if (response.data.success) {
        console.log("Status updated successfully");
        setStatus(newStatus);
      }
    } catch (error) {
        console.log("Error: ", error);
    }
    
  };


  const longDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="challenge-page">
      <div className="page-header challenge-header">
        <div className="back-btn">
          <ChevronLeft size={30} onClick={() => window.history.back()}/>
        </div>
        <div className="header-text">
          <EditableTitle
            initialTitle={title}
            date={date}
            onTitleUpdate={handleTitleUpdate}
            isEditing={isEditingTitle}
            setIsEditing={setIsEditingTitle}
          />
          <p className="page-subtitle">Code for the challenge on {longDate}</p>
        </div>
        <div className="edit-btn">
          <Pencil 
            size={20} 
            onClick={() => setIsEditingTitle(true)}
            className={isEditingTitle ? 'edit-active' : ''}
          />
        </div>
      </div>

      <div className="challenge-content">
        <div className="challenge-header">
          <div className="challenge-question">
            <h2>Challenge Question</h2>
            <EditableQuestion
              initialQuestion={question}
              date={date}
              onQuestionUpdate={handleQuestionUpdate}
              isEditing={isEditingQuestion}
              setIsEditing={setIsEditingQuestion}
            />
          </div>
          <div className='edit-btn'>
            <Pencil
              size={16}
              onClick={() => setIsEditingQuestion(true)}
              className={isEditingQuestion ? 'edit-active' : ''}
            />
          </div>
        </div>
        
        <div className="challenge-code">
          <CodeCard language={"Javascript"} code={"// Your JavaScript code here"}/>
          <CodeCard language={"Python"} code={"# Your Python code here"}/>
        </div>
      </div>

      <div>
        <button 
          className={`status-btn ${status === "In Progress" ? 'complete' : 'in_progress'}`} 
          onClick={() => handleStatusUpdate(status === "In Progress" ? "Completed" : "In Progress" )}
        >
          Mark As {(status === "In Progress") ? "Complete" : "In Progress"}
        </button>
      </div>
    </div>
  );
};
