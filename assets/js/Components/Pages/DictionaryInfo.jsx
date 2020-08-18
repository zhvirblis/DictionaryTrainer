import React from 'react';
import dictService from  "./../../Services/dict";
import userService from "./../../Services/user";
import AddNewDicrionary from "./../Parts/AddNewTerm";
import TermList from "./../Parts/TermList";

class DictionaryInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: userService.getCurrentUser(),
            isLoading: true,
            dictionary: null
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
                this.setState({
                    isLoading: false
                });
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
                            <AddNewDicrionary id={this.props.match.params.id} update={this.update}/>
                            <TermList dictId={this.props.match.params.id} terms={this.state.dictionary.terms} update={this.update}/>
                        </div>
                    )
                    : (
                        <div>{ this.state.isLoading ? (<div>Loading...</div>) : (<div>Some error</div>) }</div>
                    )
                ):(<div>403 Access denied</div>)
            }
            </div>
            
        )
    }
}

export default DictionaryInfo;
