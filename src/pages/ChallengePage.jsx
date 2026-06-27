import { React } from 'react';
import { useParams } from 'react-router-dom';
import { CodeCard } from '../components/CodeCard';
import { ChevronLeft } from 'lucide-react';

export const ChallengePage = () => {
  const { date } = useParams();
  
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
          <h1>Challenge Title</h1>
          <p className="page-subtitle">Code for the challenge on {longDate}</p>
        </div>
      </div>

      <div className="challenge-content">
        <div className="challenge-question">
          <h2>Challenge Question</h2>
          <p>Here is the challenge question for the selected date.</p>
        </div>
        
        <div className="challenge-code">
          <CodeCard language={"Javascript"} code={"// Your JavaScript code here"}/>
          <CodeCard language={"Python"} code={"# Your Python code here"}/>
        </div>
      </div>
    </div>
  );
};