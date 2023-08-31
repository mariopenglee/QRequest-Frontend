import React, { Component } from 'react';
import './Landing.css';
import testicon from './assets/react.svg'
import Section from './Section.jsx'




export class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection : 1,
      restaurantName : "",
      restaurantImage : "",
      restaurantSlogan : "",
      restaurantRating : 1,
      restaurantFeatured: {},
      sectionsData : [],
      
    };
    this.handleScroll = this.handleScroll.bind(this);
  }


  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.load()
  }

  load() {
    const params = new URLSearchParams(window.location.search);
    const restaurantUUID = params.get('restaurant');
    const restaurant_base = { title: 'Name', content: 'Welcome to our restaurant!', image: 'image_url', rating: 2, items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1}]}
    /*const sectionsBase = [
      { id: 1, title: 'Starters', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]},
      { id: 2, title: 'Main Courses', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]},
      { id: 3, title: 'Desserts', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]},
      { id: 4, title: 'Drinks', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]}
    ]*/
    const sectionsBase = [
      { id: 1, title: 'Home', content: 'Welcome to our restaurant!', items: [{name: "burgir", description: "the best burgir in the world please buy at least 3", quantity: 0, price: 30.9, id: 101}, {name: "item2", description: "item2's description", quantity: 0, price: 12.10, id: 1}, {name: "item3", description: "item3's description", quantity: 0, id: 2, price: 1.99}]},
      { id: 2, title: 'Starters', content: 'Check out our delicious starters.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
      { id: 3, title: 'Main Courses', content: 'Check out our delicious main courses.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
      { id: 4, title: 'Desserts', content: 'Check out our delicious desserts.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
      { id: 5, title: 'Drinks', content: 'Check out our delicious drinks.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
    ]
    this.setState({sectionsData: sectionsBase})
    fetch('http://127.0.0.1:8000/api/restaurants/' + restaurantUUID + '/' )
    .then(response => response.json())
    .then(responseData => {
      this.setState({ restaurantName: responseData.name, 
                      restaurantSlogan: responseData.slogan,
                      restaurantRating: responseData.rating.toString(),
                      restaurantImage: responseData.image
                    });
    });

    
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollPosition = window.scrollY;

    this.state.sectionsData.forEach((section, index) => {
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

  // handle cart related functions
  handleAddToCart = (itemId, quantity) => {
    console.log(`Add ${quantity} of item ${itemId} to cart`);
  }


  

  render() {
    return (
      <div className="app">
        <nav className="navbar">
          {this.state.sectionsData.map(section => (
            <a
              key={section.id}
              href={`#section-${section.id}`}
              className={`nav-link ${this.state.activeSection === section.id ? 'active' : ''}`}
            >
              {section.title}
            </a>
          ))}
        </nav>
        <div className='scroll-container'>
          <div className="restaurant-info">
            <div className="restaurant-image">
              <img src={this.state.restaurantImage} alt="testicon" />
            </div>
            <div className="restaurant-text">
              <h1>{this.state.restaurantName}</h1>
              <p>{this.state.restaurantRating}</p>
              <p>{this.state.restaurantSlogan}</p>
              
            </div>
          </div>
          {this.state.sectionsData.map(section => (
            <Section key={section.id} section={section} activeSection={this.state.activeSection} onAddToCart={this.handleAddToCart} />
          ))}
        </div>
      </div>
    );
  }
}

export default Landing;