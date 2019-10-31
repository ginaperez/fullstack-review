import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../ducks/reducer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class AuthComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            register: true
        };
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    async register() {
        const { email, password, username } = this.state;
        const registeredUser = await axios.post('/auth/register', {
            email, 
            username, 
            password
        });
        this.props.setUser(registeredUser.data);
    }

    async login() {
        const { email, password } = this.state;
        const loggedInUser = await axios.post('/auth/login', {
            email,  
            password
        });
        this.props.setUser(loggedInUser.data);
    }

    render() {
        const { email, username, password, register } = this.state;
        return (
            <div className="auth-container">
                <form onSubmit={(e) => {
                    // prevent default to stop form from refreshing
                    e.preventDefault()
                }}>
                    {/* username input */}
                    {register && (
                    <div className='input-container'>
                        <label>username</label>
                        <input value={username} onChange={(e) => this.setState({
                            username: e.target.value 
                        }) 
                    }
                    />
                    </div>
                    )}
                    {/* email input */}
                    <div className='input-container'>
                        <label>email</label>
                        <input 
                        type="email"
                        value={email} 
                        onChange={(e) => this.setState({
                            email: e.target.value 
                        }) 
                    }
                    />
                    </div>
                    {/* password */}
                    <div className='input-container'>
                        <label>password</label>
                        <input 
                        type="password"
                        value={password} 
                        onChange={(e) => this.setState({
                            password: e.target.value 
                        }) 
                    }
                    />
                    </div>
                    <button>Register</button>
                </form>
                <button onClick={() => this.setState({
                    register: true
                })}>
                    Register
                </button>
                <button onClick={() => this.setState({
                    register: false
                })}>
                    Login
                </button>
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

const enhancedComponent = connect(mapReduxStateToProps, mapDispatchToProps)

export default enhancedComponent(AuthComponent);