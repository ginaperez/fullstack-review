import React from 'react';
import { Switch, NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from './ducks/reducer';
import logo from './logo.png'
import './App.css';
import AuthComponent from './components/AuthComponent';
import Axios from 'axios';

class App extends React.Component {
  render() {
    console.log(this.props)
  return ( <div className="App">
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
            {this.props.user && <button onClick={() => {
              Axios.delete('/auth/logout').then(() => {
                this.props.setUser(null);
              })
            }}>
              Logout</button>}
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
    )
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState
}

const mapDispatchToProps = {
  setUser
}
const invokedConnect = connect(mapReduxStateToProps, mapDispatchToProps)

export default withRouter(App);
