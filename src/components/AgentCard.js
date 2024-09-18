import React from 'react';
import '../App.css';

const AgentCard = ({ agent, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className="agent-card"
      onMouseEnter={() => onMouseEnter(agent)}
      onMouseLeave={onMouseLeave}
    >
      <div className="agent-card-inner">
        <div className="agent-card-front">
          <img src={agent.displayIcon} alt={agent.displayName} />
          <h3>{agent.displayName}</h3>
        </div>
        <div className="agent-card-back">
          <h2>{agent.displayName}</h2>
          <p>{agent.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
