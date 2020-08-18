import React from 'react';
import { Link } from "react-router-dom";
import dictService from  "./../../Services/dict";
import YesNoModal from "../Parts/YesNoModal";

class DictionaryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            dictionaries: props.dictionaries,
            selectId: null
        }
        this.deleteDictionary = this.deleteDictionary.bind(this);
        this.closeAction = this.closeAction.bind(this);
    }

    deleteDictionaryModal(id) {
        this.setState({
            modalOn: true,
            selectId: id
        });
    }

    deleteDictionary(id) {
        this.setState({
            modalOn: false
        });
        dictService.deleteDict(id)
            .then((res) => {
                res.json().then((res) => {
                    this.props.update()
                })
            })
            .catch();
    }

    closeAction() {
        this.setState({
            modalOn: false
        });
    }
    render() {
        const listItems = this.props.dictionaries.map((dictionary) =>
            <div className="card card-el" key={dictionary.id}>
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/dictionary/${dictionary.id}`}>{dictionary.name}</Link></h5>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <button type="button" className="practice btn btn-outline-success btn-sm">Practice</button>
                        <button onClick={this.deleteDictionaryModal.bind(this, dictionary.id)} type="button" className="delete btn btn-outline-danger btn-sm">Delete</button>
                    </div>
                </div>
            </div>

        );
        return (
            <div>
                {listItems}
                {this.state.modalOn && <YesNoModal message="Are you sure?" okAction={this.deleteDictionary.bind(this, this.state.selectId)} closeAction={this.closeAction}/>}
            </div>
        );
    }
}

export default DictionaryList;
