import React from 'react';
import userService from  "./../../Services/user";

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            loginUsername: '',
            loginPassword: '',
            errorMessage: '',
            isLoading: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            errorMessage: ''
        });
    }

    handleLogin(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        userService.login(this.state.loginUsername, this.state.loginPassword)
            .then((res) => {
                this.setState({isLoading: false});
                if(res.status === 200) {
                    res.json().then((res) => {
                        console.log(res);
                        if(res.access_token) {
                            let user = JSON.stringify(res);
                            localStorage.setItem("user", user);
                            this.props.handleSetUser(user);
                        }
                        
                    });
                }
                else {
                    if(res.status && res.status === 401) {
                        this.setState({
                            errorMessage: 'Username or password is incorect'
                        });
                    } else {
                        this.setState({
                            errorMessage: 'Error: ' + res.status + ' ' + res.statusText
                        });
                    }
                }
            })
            .catch((err) => {
                this.setState({
                    errorMessage: 'Network error',
                    isLoading: false
                });
            });	
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in ^^</h1>
                <label htmlFor="inputUsername" className="sr-only">Email address</label>
                <input
                    type="username"
                    id="inputUsername"
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
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={this.state.isLoading}>{this.state.isLoading ? 'Loading' : 'Sign in'}</button>
                { this.state.errorMessage && (<div className="alert alert-danger auth-error" role="alert">
                    {this.state.errorMessage}
                </div>)}
            </form>
        );
    }

}

export default Login;
