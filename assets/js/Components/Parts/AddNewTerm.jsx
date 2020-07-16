import React from 'react';
import dictService from  "./../../Services/dict";

class AddNewDicrionary extends React.Component {
    constructor() {
        super();

        this.state = {
            origin: "",
            transcription: "",
            translate: "",
            errorMessage: ''
        };

        this.handleAddTerm = this.handleAddTerm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleAddTerm() {
        dictService.addTerm(this.props.id, this.state.origin, this.state.transcription, this.state.translate)
            .then((res) => {
                debugger
                res.json().then((res) => {
                    //this.props.update()
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
                    name="origin"
                    value={this.state.origin}
                    onChange={this.handleInputChange}
                    placeholder="Origin"
                ></input>
                <input
                    type="text"
                    className="form-control"
                    name="transcription"
                    value={this.state.transcription}
                    onChange={this.handleInputChange}
                    placeholder="Transcription"
                ></input>
                <input
                    type="text"
                    className="form-control"
                    name="translate"
                    value={this.state.translate}
                    onChange={this.handleInputChange}
                    placeholder="Translate"
                ></input>
                <div className="input-group-append">
                    <button className="btn btn-primary btn" onClick={this.handleAddTerm}>Add New</button>
                </div>
            </div>
        );
    }
}

export default AddNewDicrionary;