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
                console.log(res);
                res.json().then((res) => {
                    console.log(res);
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
            <div>
                <input
                    type="text"
                    name="newDictionaryName"
                    value={this.state.newDictionaryName}
                    onChange={this.handleInputChange}
                    placeholder="Name"
                ></input>
                <button className="btn btn-primary" onClick={this.handleAddDictionary}>Add New</button>
            </div>
        );
    }
}

export default AddNewDicrionary;