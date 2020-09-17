import React from 'react';
import dictService from  "./../../../Services/dict";
import userService from "./../../../Services/user";
import AddNewDicrionary from "./Parts/AddNewTerm";
import TermList from "./Parts/TermList";
import PracticeSettings from "./../Practice/Parts/PracticeSettings";
import PracticeProcess from "./../Practice/Parts/PracticeProcess";

class DictionaryInfo extends React.Component {
    constructor() {
        super();

        this.state = {
            currentUser: userService.getCurrentUser(),
            isLoading: true,
            dictionary: null,
            editing: false,
            newName: null,
            questionOrigin: false,
            questionTranscription: false,
            questionTranslate: false,
            answerOrigin: false,
            answerTranscription: false,
            answerTranslate: false,
            errorMessage: "",
            testStarted: false
        };

        this.update = this.update.bind(this);
        this.startEditName = this.startEditName.bind(this);
        this.saveName = this.saveName.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.cancelChangeName = this.cancelChangeName.bind(this);
        this.handleSettingsCheckbox = this.handleSettingsCheckbox.bind(this);
        this.startTest = this.startTest.bind(this);
        this.handleTermCheckbox = this.handleTermCheckbox.bind(this);
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
                        res.terms = res.terms.map((e)=>{
                            e.checked = false;
                            return e;
                        });
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

    handleSettingsCheckbox(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        this.setState({
            [name]: value,
            errorMessage: ""
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

    startTest() {
        if((this.state.answerOrigin || this.state.answerTranslate || this.state.answerTranscription) 
            && (this.state.questionOrigin || this.state.questionTranslate || this.state.questionTranscription)) {
            this.setState({
                testStarted: true
            });
        } else {
            this.setState({
                errorMessage: "Check items"
            });
        }
    }

    handleTermCheckbox(id) {
        console.log("ded", id);
        this.setState(state => {
            let dictCopy = Object.assign({},state.dictionary);
            dictCopy.terms = dictCopy.terms.map(el => {
                if(el.id === id) {
                    el.checked = !el.checked; 
                }
                return el;
            });
            return dictCopy;
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
                            { this.state.testStarted ?
                            (
                                <PracticeProcess
                                    dictionary={this.state.dictionary}       
                                    questionOrigin={this.state.questionOrigin}
                                    questionTranslate={this.state.questionTranslate}
                                    questionTranscription={this.state.questionTranscription}
                                    answerOrigin={this.state.answerOrigin}
                                    answerTranslate={this.state.answerTranslate}
                                    answerTranscription={this.state.answerTranscription}
                                />
                            ):(
                                <div>
                                <AddNewDicrionary id={this.props.match.params.id} update={this.update}/>
                                <PracticeSettings
                                    questionOrigin={this.state.questionOrigin}
                                    questionTranslate={this.state.questionTranslate}
                                    questionTranscription={this.state.questionTranscription}
                                    answerOrigin={this.state.answerOrigin}
                                    answerTranslate={this.state.answerTranslate}
                                    answerTranscription={this.state.answerTranscription}
                                    handleCheckbox={this.handleSettingsCheckbox}
                                    errorMessage={this.state.errorMessage}
                                    startTest={this.startTest}
                                />
                                <TermList handleCheckbox={this.handleTermCheckbox} dictId={this.props.match.params.id} terms={this.state.dictionary.terms} update={this.update}/>
                                </div>
                            )}
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
