import React from 'react';
import dictService from  "./../../../../Services/dict";


class TermCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            ...this.props.term
        }
        this.editTerm= this.editTerm.bind(this);
        this.originChange = this.originChange.bind(this);
        this.transcriptionChange = this.transcriptionChange.bind(this);
        this.translateChange = this.translateChange.bind(this);
        this.helperChange = this.helperChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.saveTerm = this.saveTerm.bind(this);
    }
    
    editTerm() {
        this.setState({
            editing: true
        });
    }

    originChange(event) {
        this.setState({origin: event.target.value});
    }

    transcriptionChange(event) {
        this.setState({transcription: event.target.value});
    }

    translateChange(event) {
        this.setState({translate: event.target.value});
    }

    helperChange(event) {
        this.setState({helper: event.target.value});
    }

    saveTerm() {
        dictService.editTerm(this.props.dictId, this.props.term.id, this.state.origin, this.state.transcription, this.state.translate)
            .then((res) => {
                res.json().then((res) => {
                    this.props.update();
                    this.setState({
                        editing: false
                    });
                });
            })
            .catch();
 
    }

    cancel() {
        this.setState({
            editing: false
        });
    }

    render() {
        let term = this.props.term;
        return (
            <div className={this.state.editing ? "card editing termcard" : "card termcard"} key={term.id}>
                <div className="card-body card-el card-term">
                    <div className="check-box-wrapper">
                        <input type="checkbox" checked={term.checked} onChange={this.props.handleCheckbox}/>
                    </div>
                    <div>
                        <h5 className="card-title">{term.origin}</h5>
                        <p><input className="edit-inp" value={this.state.origin || ""} placeholder="Origin" onChange={this.originChange} /></p>
                        <h5 className="card-title">{term.transcription}</h5>
                        <p><input className="edit-inp" value={this.state.transcription || ""} placeholder="Transcription" onChange={this.transcriptionChange} /></p>
                        <h5 className="card-title">{term.translate}</h5>
                        <p><input className="edit-inp" value={this.state.translate || ""} placeholder="Translate" onChange={this.translateChange} /></p>
                        <h5 className="card-title">{term.helper}</h5>
                        <p><input className="edit-inp" value={this.state.helper || ""} placeholder="Helper" onChange={this.helperChange} /></p>
                        <p>
                            <button onClick={this.saveTerm} type="button" className="btn save btn btn-secondary btn-sm">Save</button>
                            <button onClick={this.editTerm} type="button" className="btn edit btn btn-secondary btn-sm">Edit</button>
                            <button onClick={this.props.deleteTermModal.bind(this, term.id)} type="button" className="delete btn btn btn-danger btn-sm">Delete</button>
                            <button onClick={this.cancel} type="button" className="btn cancel btn btn-light btn-sm">Cancel</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TermCard;
