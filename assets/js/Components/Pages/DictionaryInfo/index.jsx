import React from 'react';
import dictService from  "./../../../Services/dict";
import userService from "./../../../Services/user";
import AddNewDicrionary from "./Parts/AddNewTerm";
import TermList from "./Parts/TermList";

class DictionaryInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: userService.getCurrentUser(),
            isLoading: true,
            dictionary: null,
            editing: false,
            newName: null
        };

        this.update = this.update.bind(this);
        this.startEditName = this.startEditName.bind(this);
        this.saveName = this.saveName.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.cancelChangeName = this.cancelChangeName.bind(this);
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
                            dictionary: res,
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

    startEditName() {
        this.setState({
            editing: true,
            newName: this.state.dictionary.name
        });
    }

    saveName() {
        this.setState({
            newName: this.state.dictionary.name
        });
        let {id} = this.props.match.params;
        dictService.edit(this.state.newName, id).then((res) => {
            if(res.status === 200) {
                res.json().then((res) => {
                    this.setState({
                        editing: false
                    });
                    this.update();
                });
            }
        });
    }

    handleChangeName(event) {
        this.setState({newName: event.target.value});
    }

    cancelChangeName(event) {
        this.setState({
            editing: false
        });
    }

    render() {
        return (
            <div className="container-sm">
            { this.state.currentUser ? (
                    this.state.dictionary ? (
                        <div>
                            <div className="title-wrap">
                            { this.state.editing ? (
                                <div className="input-group">
                                    <input className="form-control" onChange={this.handleChangeName} value={this.state.newName}/>
                                    <div className="input-group-append">
                                        <button className="input-group-append" onClick={this.saveName} type="button" className="btn btn-primary btn-sm">Save</button>
                                        <button className="input-group-append" onClick={this.cancelChangeName} type="button" className="btn btn-light btn-sm">Cancel</button>
                                    </div>
                                </div>
                            ):(
                                <div>
                                    <h3 className="dict-name">{this.state.dictionary.name}</h3>
                                    <button onClick={this.startEditName} type="button" className="btn btn-dict-name btn-primary btn-sm">Edit</button>
                                </div>
                            )}
                            </div>
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
