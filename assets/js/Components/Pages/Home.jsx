import React from 'react';
import dictService from  "./../../Services/dict";
import userService from "./../../Services/user";
import AddNewDicrionary from "./../Parts/AddNewDicrionary"

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };

        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck() {
        dictService.get().then((res) => {
            console.log(res);
            //if(res.status === 200) {
                res.json().then((res) => {
                    console.log(res);
                });
                if(res.status !== 200) {
                    userService.logout();
                }
            //}
        });
    }

    render() {
        return (
            <div className="container-sm">
                Home
                <button onClick={this.handleCheck}>Check</button>
                <AddNewDicrionary />
            </div>
        );
    }

}

export default Home;
