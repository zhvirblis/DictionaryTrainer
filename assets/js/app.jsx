import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from './Components/Pages/About';
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';
import Login from './Components/Pages/Login';
import DictionaryInfo from './Components/Pages/DictionaryInfo';

import userService from  "./Services/user";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        };
        this.handleToUpdate  = this.handleSetUser.bind(this);
        this.handleLogout  = this.handleLogout.bind(this);
    }

    handleSetUser(user){
        this.setState({currentUser:user});
    }

    componentDidMount() {
        const user = userService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            })
        };
    }

    handleLogout() {
        userService.logout();
        this.setState({
            currentUser: undefined
        })
    }

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/">Dictionary Trainer</Link>
                    <div className="collapse navbar-collapse">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/about">About</Link>
                            {this.state.currentUser && (<a className="nav-item nav-link" onClick={this.handleLogout} href="#">Logout</a>)}
                        </div>
                    </div>
                </nav>
                <div className="page">
                    <Switch>
                        <Route exact path="/">
                            {!this.state.currentUser && (<Login handleSetUser={this.handleSetUser.bind(this)}/>)}
                            {this.state.currentUser && (<Home />)}
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/dictionary/:id" component={DictionaryInfo} />
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    };
}

ReactDOM.render(<App />, document.getElementById('root'));
