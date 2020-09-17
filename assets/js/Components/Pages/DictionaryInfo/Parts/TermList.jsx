import React from 'react';
import dictService from  "./../../../../Services/dict";
import YesNoModal from "../../../Parts/YesNoModal";
import TermCard from "./TermCard";

class TermList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            <TermCard handleCheckbox={this.props.handleCheckbox.bind(this, term.id)} term={term} dictId={this.props.dictId} update={this.props.update} deleteTermModal={this.deleteTermModal} key={term.id}/>
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
