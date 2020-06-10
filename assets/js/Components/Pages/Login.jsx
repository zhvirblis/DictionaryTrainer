import React from 'react';
import loginService from  "./../../Services/login";

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            loginUsername: '',
            loginPassword: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleLogin(event) {
        event.preventDefault();
        console.log('Work!');
        loginService(this.state.loginUsername, this.state.loginPassword)
            .then((res) => {
                if(res.status === 200) {
                    res.json().then((res) => {
                        console.log(res);
                    });
                }
                else {
                    console.log('Err', res);
                }
            })
            .catch((err) => {
                console.log(err);
            });	
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in ^^</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input
                    type="username"
                    id="inputEmail"
                    className="form-control"
                    name="loginUsername"
                    placeholder="Username"
                    value={this.state.loginUsername}
                    onChange={this.handleInputChange}
                    required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    name="loginPassword"
                    value={this.state.loginPassword}
                    placeholder="Password"
                    onChange={this.handleInputChange}
                    required />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
        );
    }

}

export default Login;
