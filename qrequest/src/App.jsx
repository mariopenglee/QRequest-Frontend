import React, { useState, useEffect } from 'react';
import './App.css';

const sectionsData = [
  { id: 1, title: 'Home', content: 'Welcome to our restaurant!' },
  { id: 2, title: 'Starters', content: 'Check out our delicious starters.' },
  { id: 3, title: 'Main Courses', content: 'Check out our delicious main courses.' },
  { id: 4, title: 'Desserts', content: 'Check out our delicious desserts.' },
  { id: 5, title: 'Drinks', content: 'Check out our delicious drinks.' },
  // ... Add more sections as needed
];

function App() {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      sectionsData.forEach((section, index) => {
        const sectionElement = document.getElementById(`section-${section.id}`);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop - 50; // Adjust for navbar height
          const sectionBottom = sectionTop + sectionElement.clientHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        {sectionsData.map(section => (
          <a
            key={section.id}
            href={`#section-${section.id}`}
            className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
          >
            {section.title}
          </a>
        ))}
      </nav>
      <div className="scroll-container">
        {sectionsData.map(section => (
          <div
            key={section.id}
            id={`section-${section.id}`}
            className={`section ${activeSection === section.id ? 'selected' : ''}`}
          >
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
