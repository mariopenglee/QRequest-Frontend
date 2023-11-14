import { Component } from 'react';
import './Landing.css';
import testicon from './assets/react.svg'
import Section from './Section.jsx'
import CartItem from './assets/Components/CartItem.jsx'



export class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSection : 1,
      restaurantName : "Test Name",
      restaurantImage : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
      restaurantSlogan : "slogan",
      // restaurantRating : 1,
      restaurantFeatured: {},
      restaurantTags: {},
      restaurantTagsString: "",
      sectionsData: [],
      restaurantProductsByTag: {},
      cartItems: [],
      isCartOpen: false,
      isDragging: false,
      startY: 0,
      currentY: 0,
      
    };
    this.handleScroll = this.handleScroll.bind(this);
  }


  componentDidMount() {
    const scrollContainer = document.querySelector('.scroll-container');
    scrollContainer.addEventListener('scroll', this.handleScroll);
    this.load();

    const appHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()

    document.addEventListener('click', this.handleDocumentClick);

  }
  

  load() {
    const baseRequestURL = 'https://api.pocketmenu.app'
    const params = new URLSearchParams(window.location.search);
    const restaurantUUID = params.get('restaurant');
    /*const sectionsBase = [
      { id: 1, title: 'Starters', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]},
      { id: 2, title: 'Main Courses', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]},
      { id: 3, title: 'Desserts', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]},
      { id: 4, title: 'Drinks', content: '', items: [{name: "item1", description: "item1's description", price:"1", discount: false, discounted_price: 2, likes: 10, max_amount: -1, image: "image_url"}]}
    ]*/
    const sectionsBase = [
      { id: 1, title: 'Home', content: 'Welcome to our restaurant!', items: [{name: "the grand testing burgir of the gods", description: "the best burgir in the world please buy at least 3. Lore ipsum XDDDD please buy burgirs i need one more line of text to test the alignment of divs cfdddd", quantity: 0, price: 30.9, id: 101}, {name: "item2", description: "item2's description", quantity: 0, price: 12.10, id: 1}, {name: "item3", description: "item3's description", quantity: 0, id: 2, price: 1.99}]},
      { id: 2, title: 'Starters', content: 'Check out our delicious starters.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
      { id: 3, title: 'Main Courses', content: 'Check out our delicious main courses.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
      { id: 4, title: 'Desserts', content: 'Check out our delicious desserts.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
      { id: 5, title: 'Drinks', content: 'Check out our delicious drinks.', items: [{name: "item1", description: "item1's description"}, {name: "item2", description: "item2's description"}, {name: "item3", description: "item3's description"}]},
    ]
    
    this.setState({sectionsData: sectionsBase})
    fetch(baseRequestURL + '/api/restaurants/' + restaurantUUID + '/' )
    .then(response => response.json())
    .then(responseData => {
        this.setState({ 
            restaurantName: responseData.name, 
            restaurantSlogan: responseData.slogan,
            // restaurantRating: responseData.rating,
            restaurantImage: responseData.image
        }, () => {});
    });

    fetch(baseRequestURL + '/api/featured-products/' + restaurantUUID + '/' )
    .then(response => response.json())
    .then(responseData => {
        let restaurantFeatured = responseData.map(function(item) {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                discount: item.discount,
                discounted_price: item.discounted_price,
                likes: item.likes,
                max_amount: item.max_amount,
                quantity: 0
            };
        });
        this.setState({ restaurantFeatured: restaurantFeatured }, () => {});
    });

    fetch(baseRequestURL + '/api/restaurant-tags/' + restaurantUUID + '/' )
    .then(response => response.json())
    .then(responseData => {
        let restaurantTags = responseData.map(function(item) {
            return {
              id: item.id,
              name: item.name,
            }
        });
        let tag_id_array = []
        for (let i = 0; i < restaurantTags.length; i++) {
            tag_id_array.push(restaurantTags[i].id);
        }
        let restaurantTagsString = tag_id_array.join('-');
        this.setState({ restaurantTags: restaurantTags, restaurantTagsString: restaurantTagsString }, () => {
            fetch(baseRequestURL + '/api/products/' + restaurantUUID + '/' + this.state.restaurantTagsString + '/' )
                .then(response => response.json())
                .then(responseProducts => {
                    this.setState({ restaurantProductsByTag: responseProducts }, () => {
                      let sections = []

                      for (const key in this.state.restaurantProductsByTag) {
                          let section = {}
                          section.id = key
                          section.title = key
                          section.content = ""
                          section.items = this.state.restaurantProductsByTag[key].map(function(item) {
                              return {
                                  name: item.name,
                                  description: item.description,
                                  price: item.price,
                                  discount: item.discount,
                                  discounted_price: item.discounted_price,
                                  likes: item.likes,
                                  max_amount: item.max_amount,
                                  quantity: 0,
                                  id: item.id

                              };
                          });
                          sections.push(section);
                      }
                      
                      this.setState({ sectionsData: sections }, () => {console.log(this.state.sectionsData)}); 
                    });
                });
        });
    });

  }

  componentWillUnmount() {
    const scrollContainer = document.querySelector('.scroll-container');
    scrollContainer.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleDocumentClick);

  }

  scrollToSection(sectionId) {
    const sectionElement = document.querySelector(`#section-${sectionId}`);
    const scrollContainer = document.querySelector('.scroll-container');
    const navbar = document.querySelector('.navbar');
    const navbarheight = navbar.offsetHeight;
    const restoInfo = document.querySelector('.restaurant-info');
    const restoInfoHeight = restoInfo.offsetHeight;
    const fullOffset = navbarheight + restoInfoHeight;
    scrollContainer.scrollTo({
      top: sectionElement.offsetTop - fullOffset, 
      behavior: 'smooth',
    });
  }

  handleScroll() {
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollPosition = scrollContainer.scrollTop;
    const navbar = document.querySelector('.navbar');
    const navbarheight = navbar.offsetHeight;
    const restoInfo = document.querySelector('.restaurant-info');
    const restoInfoHeight = restoInfo.offsetHeight;
    const fullOffset = navbarheight + restoInfoHeight;
  
    let activeSection = 1;
    this.state.sectionsData.forEach(section => {
      const sectionElement = document.querySelector(`#section-${section.id}`);
      if (sectionElement.offsetTop <= scrollPosition + fullOffset) {
        activeSection = section.id;
      }
    });
    this.setState({ activeSection: activeSection });
  }
  

  // handle cart related functions
  handleAddToCart = (item, quantity) => {
    console.log(item.name, item.price, quantity);
    let cartItems = this.state.cartItems;
    let itemInCart = false;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === item.id) {
        cartItems[i].quantity += quantity;
        itemInCart = true;
        break;
      }
    }
    if (!itemInCart) {
      cartItems.push({id: item.id, name: item.name, price: item.price, quantity: quantity});
    }
    this.setState({cartItems: cartItems});

    console.log(this.state.cartItems);
  }
  
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  toggleCart = () => {
    this.setState((prevState) => ({ isCartOpen: !prevState.isCartOpen }));
  };
  handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      this.setState((prevState) => ({
        cartItems: prevState.cartItems.filter(item => item.id !== itemId),
      }));
      return;
    }
    const updatedItems = this.state.cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    this.setState({ cartItems: updatedItems });
  }


  handleTouchStart = (e) => {
    this.setState({
      isDragging: true,
      startY: e.touches[0].clientY,
      currentY: e.touches[0].clientY,
    });
    const scrollContainer = document.querySelector('.scroll-container');
    scrollContainer.classList.add('disable-scroll');

  };

  handleTouchMove = (e) => {

    if (!this.state.isDragging) return;

    const currentY = e.touches[0].clientY;
    this.setState({ currentY });

    // Calculate the distance moved
    const deltaY = currentY - this.state.startY;

    // Adjust the cart panel position
    const cart = document.querySelector('.cart');
    cart.style.transform = `translateY(${deltaY}px)`;
  };

  handleTouchEnd = () => {
    if (!this.state.isDragging) return;

    const deltaY = this.state.currentY - this.state.startY;

    // Define a threshold for opening/closing the cart
    const threshold = 50;

    if (deltaY < -threshold) {
      this.openCart();
    } else {
      this.closeCart();
    }

    // Reset the cart panel position
    const cart = document.querySelector('.cart');
    cart.style.transform = '';

    this.setState({
      isDragging: false,
      startY: 0,
      currentY: 0,
    });

    const scrollContainer = document.querySelector('.scroll-container');
    scrollContainer.classList.remove('disable-scroll');

  };

  handleDocumentClick = (e) => {
    const cart = document.querySelector('.cart');
    if (cart && !cart.contains(e.target) && this.state.isCartOpen) {
      this.closeCart();
    }


    
    



    
  };

  
  

  render() {


    return (
      <div className="app">
        <div className= "top-sticky">
        <div className="restaurant-info">
            <div className='restaurant-image-container'>
              <img src={this.state.restaurantImage} alt="testicon" className='restaurant-image' />
            </div>
            <div className="restaurant-title">
              <p className="restaurant-name">{this.state.restaurantName}</p>
              <p className="restaurant-slogan">{this.state.restaurantSlogan}</p>
            </div>
            {/*
            <div className="restaurant-rating">
              {filledStarArray}
              {emptyStarArray}
            </div>
            */}
            
            
        </div>
        <nav className="navbar">
        {this.state.sectionsData.map(section => (
          <a
            key={section.id}
            onClick={() => this.scrollToSection(section.id)}
            className={`nav-link ${this.state.activeSection === section.id ? 'active' : ''}`}
          >
            <div className="nav-section-wrapper">
            {section.icon ? <img src={section.icon} alt="testicon" /> : <div className='navbar-icon'> <img src={testicon} alt="defaulticon" className='img'/> </div>}
            {section.title}
            </div>
          </a>
        ))}
      </nav>
        </div>
        <div className='scroll-container'>
          {this.state.sectionsData.map(section => (
            <Section key={section.id} section={section} activeSection={this.state.activeSection} onAddToCart={this.handleAddToCart} />
          ))}
        </div>
        <div className="bottom-sticky">
          
          <div className={`cart ${this.state.isCartOpen ? 'open' : ''}`}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
          >
            <button className='cart-button' onClick={this.toggleCart}>
              <span>🥡</span>
            </button>
            <div className="cart-items">
              {this.state.cartItems.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} quantity={cartItem.quantity} onQuantityChange={this.handleQuantityChange} />
              ))}
            </div>
            <div className="cart-total">
              <p className="cart-total-text">Total</p>
              <p className="cart-total-price">$ {this.state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
            </div>
            <button className="cart-checkout-button" onClick={() => {console.log(this.state.cartItems)}}
            >Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;