import React from 'react';
import dictService from  "./../../Services/dict";
import userService from "./../../Services/user";
import AddNewDicrionary from "./../Parts/AddNewTerm";

class DictionaryInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: userService.getCurrentUser(),
            isLoading: true,
            dictionary: {}
        };

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update();
    }

    update() {
        let {id} = this.props.match.params;
        if(this.state.currentUser) {
            dictService.getInfo(id).then((res) => {
                if(res.status === 200) {
                    res.json().then((res) => {
                        this.setState({
                            dictionary: res
                        });
                    });
                }
                if(res.status === 401) {
                    userService.logout();
                }
            });
        }
    }

    render() {
        return (
            <div className="container-sm">
            { this.state.currentUser ? (
                    this.state.dictionary ? (
                        <div>
                            <h3>{this.state.dictionary.name}</h3>
                            <AddNewDicrionary id={this.props.match.params.id}/>
                        </div>
                    )
                    : (
                        <div>Some error</div>
                    )
                ):(<div>403 Access denied</div>)
            }
            </div>
            
        )
    }
}

export default DictionaryInfo;