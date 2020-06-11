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
import Login from './Components/Pages/Login.jsx';
import userService from  "./Services/user";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        };
        this.handleToUpdate  = this.handleSetUser.bind(this);
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

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            {!this.state.currentUser && (<Login handleSetUser={this.handleSetUser.bind(this)}/>)}
                            {this.state.currentUser && (<Home />)}
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
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
