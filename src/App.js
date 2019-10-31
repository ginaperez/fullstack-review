import React from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';
import logo from './logo.png'
import './App.css';
import AuthComponent from './components/AuthComponent';

class App extends React.Component {
  render() {
  return <div className="App">
          <header>
            {/* inner double container */}
            <div className='logo'>
              {/* logo container */}
              <img src={logo} />
            </div>
            {/* nav container */}
            <nav>
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/store">Store</NavLink>
            <NavLink activeClassName="active" to="/profile">Profile</NavLink>
            </nav>
          </header>
          <Switch>
            <Route exact path="/" component={AuthComponent} />
            <Route exact path="/store" render={() => {
              return <div>Store</div> 
            }}/>
            <Route exact path="/profile" render={() => {
              return <div>Profile</div> 
            }}/>
            <Route exact path="*" render={() => {
              return <div>????</div> 
            }}/>
          </Switch>
         </div>
  }
}

export default App;
