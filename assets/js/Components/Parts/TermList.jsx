import React from 'react';
import dictService from  "./../../Services/dict";
import YesNoModal from "../Parts/YesNoModal";

class TermList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalOn: false,
            terms: props.terms,
            selectId: null
        }
        this.deleteTerm = this.deleteTerm.bind(this);
        this.closeAction = this.closeAction.bind(this);
        this.deleteTermModal = this.deleteTermModal.bind(this);
    }
    
    deleteTermModal(id) {
        this.setState({
            modalOn: true,
            selectId: id
        });
    }

    deleteTerm(termId) {
        this.setState({
            modalOn: false
        });
        dictService.deleteTerm(this.props.dictId, termId)
            .then(res => {
                this.props.update();
            })
            .catch(err => {
            
            });
    }

    closeAction() {
        this.setState({
            modalOn: false
        });
    }

    render() {
        const listItems = this.props.terms.map((term) =>
            <div className="card" key={term.id}>
                <div className="card-body card-el">
                    <h5 className="card-title">{term.origin}</h5>
                    <h5 className="card-title">{term.transcription}</h5>
                    <h5 className="card-title">{term.translate}</h5>
                    <h5 className="card-title">{term.helper}</h5>
                    <button onClick={this.deleteTermModal.bind(this, term.id)} type="button" className="delete btn btn btn-danger btn-sm">Delete</button>
                </div>
            </div>
        );
        return (
            <div>
                {listItems}
                {this.state.modalOn && <YesNoModal message="Are you sure?" okAction={this.deleteTerm.bind(this, this.state.selectId)} closeAction={this.closeAction}/>}
            </div>
        );
    }
}

export default TermList;
