// src/pages/Home.js
import React from "react";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to our website!</p>
    </div>
  );
};

export default Home;
// src/pages/Services.js
import React from "react";

const Services = () => {
  return (
    <div>
      <h1>Our Services</h1>
      <p>Discover our amazing services!</p>
    </div>
  );
};

export default Services;
// src/pages/Contact.js
import React from "react";

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Feel free to get in touch with us!</p>
    </div>
  );
};

export default Contact;
// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Our Services</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
// src/App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

const App = () => {
  const currentTime = new Date();
  const dayOfWeek = currentTime.getDay();
  const currentHour = currentTime.getHours();

  const isWorkingHours = dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17;

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" component={isWorkingHours ? Services : () => <div>Services are only available during working hours.</div>} />
          <Route path="/contact" component={isWorkingHours ? Contact : () => <div>Contact is only available during working hours.</div>} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
