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

class App extends React.Component {
        
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Login />
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
