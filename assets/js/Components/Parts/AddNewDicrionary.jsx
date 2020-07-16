import React from 'react';

import dictService from  "./../../Services/dict";

class AddNewDicrionary extends React.Component {
    constructor() {
        super();

        this.state = {
            newDictionaryName: "",
            errorMessage: ''
        };

        this.handleAddDictionary = this.handleAddDictionary.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleAddDictionary() {
        dictService.add(this.state.newDictionaryName)
            .then((res) => {
                res.json().then((res) => {
                    this.props.update()
                });
            })
            .catch();
    }

    handleInputChange() {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            errorMessage: ''
        });
    }

    render() {
        return (
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    name="newDictionaryName"
                    value={this.state.newDictionaryName}
                    onChange={this.handleInputChange}
                    placeholder="Name"
                ></input>
                <div className="input-group-append">
                    <button className="btn btn-primary btn" onClick={this.handleAddDictionary}>Add New</button>
                </div>
            </div>
        );
    }
}

export default AddNewDicrionary;