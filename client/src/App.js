import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './pages/home.js';
import Login from './pages/login.js';
import Logout from './pages/logout.js';
import Register from './pages/register.js';
import Content from './pages/content.js';
import BlogDetails from './pages/blogDetails';
import { UserContext } from './helpers/userContext';
import { createBrowserHistory } from 'history';
import './assets/scss/base.scss';

export const customHistory = createBrowserHistory();

function App() {

  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  /* 404 page display */
  const PageNotFound = () => {
    return (
      <div style={{ fontSize: "30px", margin: "2rem" }}>404! Page Not Found</div>
    )
  }

  /* customHistory manages the page navigation as par the browser 
     Preference. It ensures the virtual DOM is not rendered again and
     again if user uses the browser buttons.
     UserContext.Provider ensures that the value we pass can be consumed 
     within any of App’s descendant child components i.e. global variable 

     customHistory & UserContext.Provider wraps around different routes */
  return (
    <>
      <Router history={customHistory}>
        <div className="App">
          <UserContext.Provider value={{ username, setUsername, loggedIn, setLoggedIn }}>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/blog/:id" component={BlogDetails} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/content" component={Content} />
              <Route path="/logout" component={Logout} />
              <Route component={PageNotFound} />
            </Switch>
          </UserContext.Provider>
        </div>
      </Router>
    </>
  )
}

export default App;