import React, { Component } from 'react';
import './Landing.css';
import testicon from './assets/react.svg'
import Section from './Section.jsx'


const sectionsData = [
  { id: 1, title: 'Home', content: 'Welcome to our restaurant!', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
  { id: 2, title: 'Starters', content: 'Check out our delicious starters.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
  { id: 3, title: 'Main Courses', content: 'Check out our delicious main courses.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
  { id: 4, title: 'Desserts', content: 'Check out our delicious desserts.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
  { id: 5, title: 'Drinks', content: 'Check out our delicious drinks.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
]

export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection : 1,
      restaurantId : 0,
      restaurantName : "",
      restaurantImage : "",
      restaurantSlogan : "",
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollPosition = window.scrollY;

    sectionsData.forEach((section, index) => {
      const sectionElement = document.getElementById(`section-${section.id}`);
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop - 50; // Adjust for navbar height
        const sectionBottom = sectionTop + sectionElement.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          this.setState({ activeSection : section.id });
        }
      }
    });
  }

  render() {
    return (
      <div className="app">
        <nav className="navbar">
          {sectionsData.map(section => (
            <a
              key={section.id}
              href={`#section-${section.id}`}
              className={`nav-link ${this.state.activeSection === section.id ? 'active' : ''}`}
            >
              {section.title}
            </a>
          ))}
        </nav>
        <div className="scroll-container">
          {sectionsData.map(section => (
            <Section key={section.id} section={section} activeSection={this.state.activeSection} />
          ))}
        </div>
      </div>
    );
  }
}

export default Landing;