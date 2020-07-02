import React from 'react';
import dictService from  "./../../Services/dict";
import userService from "./../../Services/user";
import AddNewDicrionary from "./../Parts/AddNewDicrionary";
import DictionaryList from "./../Parts/DictionaryList";

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            dictionaries: []
        };

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
    }

    update() {
        dictService.get().then((res) => {
            if(res.status === 200) {
                res.json().then((res) => {
                    this.setState({
                        dictionaries: res
                    });
                });
            }
            if(res.status === 401) {
                userService.logout();
            }
        });
    }

    render() {
        return (
            <div className="container-sm">
                <AddNewDicrionary update={this.update}/>
                <DictionaryList dictionaries={this.state.dictionaries}/>
            </div>
        );
    }

}

export default Home;
