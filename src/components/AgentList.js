import React, { useState, useEffect, useRef } from 'react';
import AgentCard from './AgentCard';
import '../App.css'; // Certifique-se de que o CSS está sendo importado corretamente

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        setAgents(data.data); // Ajuste conforme a estrutura da resposta
      } catch (error) {
        setError('Falha ao carregar agentes');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleCardHover = (agent) => {
    setSelectedAgent(agent);
  };

  const handleCardLeave = () => {
    setSelectedAgent(null);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="agents-container">
      <div className="title">Valorant Agents</div>
      <div className="agents-carousel" ref={carouselRef}>
        {agents.map((agent) => (
          <AgentCard 
            key={agent.uuid} 
            agent={agent} 
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          />
        ))}
      </div>
      <button className="carousel-arrow left" onClick={() => scrollCarousel('left')}>&lt;</button>
      <button className="carousel-arrow right" onClick={() => scrollCarousel('right')}>&gt;</button>
      {selectedAgent && (
        <div className="agent-panel">
          <h2>{selectedAgent.displayName}</h2>
          <p>{selectedAgent.description}</p>
          <img src={selectedAgent.fullPortrait} alt={selectedAgent.displayName} />
        </div>
      )}
    </div>
  );
};

export default AgentList;
