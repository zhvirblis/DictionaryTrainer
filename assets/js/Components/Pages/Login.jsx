import React from 'react';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }

    render() {
        return (
            <div class="login-form">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </div>
        );
    }

}

export default Login;
