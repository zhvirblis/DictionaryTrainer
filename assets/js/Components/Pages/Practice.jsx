import React from 'react';
import dictService from  "./../../Services/dict";
import userService from "./../../Services/user.js";
import PracticeProcess from "./../Parts/PracticeProcess";

class Practice extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            currentUser: userService.getCurrentUser(),
            isLoading: true,
            dictionary: null,
            questionOrigin: false,
            questionTranscription: false,
            questionTranslate: false,
            answerOrigin: false,
            answerTranscription: false,
            answerTranslate: false,
            started: false,
            errorMessage: ""
        };
        this.update = this.update.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.startTest = this.startTest.bind(this);
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

    handleCheckbox(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        this.setState({
            [name]: value,
            errorMessage: ""
        });
    }

    startTest() {
        if((this.state.answerOrigin || this.state.answerTranslate || this.state.answerTranscription) 
            && (this.state.questionOrigin || this.state.questionTranslate || this.state.questionTranscription)) {
            this.setState({
                started: true
            });
        } else {
            this.setState({
                errorMessage: "Check items"
            });
        }
    }

    render() {
        return (
            <div className="container-sm">
            { this.state.currentUser ? (
                this.state.dictionary ? (
                    this.state.started ? (<PracticeProcess/>) : (
                    <div className="practice-page">
                    <h1>{this.state.dictionary.name}</h1>
                    <div className="row">
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-body">            
                                    <h3>Question</h3>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                name="questionOrigin"
                                                checked={this.state.questionOrigin}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="question_origin"
                                                onChange={this.handleCheckbox}
                                                disabled={this.state.answerOrigin || this.state.questionTranslate && this.state.questionTranscription}
                                            />
                                            <label className="form-check-label" htmlFor="question_origin">
                                                Origin
                                            </label>
                                        </div>   
                                    </div> 
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input 
                                                name="questionTranscription"
                                                checked={this.state.questionTranscription}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="question_transcription"
                                                onChange={this.handleCheckbox}
                                                disabled={this.state.answerTranscription || this.state.questionOrigin && this.state.questionTranslate}
                                            />
                                            <label className="form-check-label" htmlFor="question_transcription">
                                                Transcription
                                            </label>
                                        </div>   
                                    </div> 
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input 
                                                name="questionTranslate"
                                                checked={this.state.questionTranslate}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="question_translate"
                                                onChange={this.handleCheckbox}
                                                disabled={this.state.answerTranslate || this.state.questionOrigin && this.state.questionTranscription}
                                            />
                                            <label className="form-check-label" htmlFor="question_translate">
                                                Translate
                                            </label>
                                        </div>   
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-body">            
                                    <h3>Answer</h3>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                name="answerOrigin"
                                                checked={this.state.answerOrigin}
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="answer_origin"
                                                disabled={this.state.questionOrigin || this.state.answerTranslate && this.state.answerTranscription}
                                                onChange={this.handleCheckbox}
                                            />
                                            <label className="form-check-label" htmlFor="answer_origin">
                                                Origin
                                            </label>
                                        </div>   
                                    </div> 
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input 
                                                name="answerTranscription"
                                                checked={this.state.answerTranscription}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="answer_transcription"
                                                disabled={this.state.questionTranscription || this.state.answerOrigin && this.state.answerTranslate}
                                                onChange={this.handleCheckbox}
                                            />
                                            <label className="form-check-label" htmlFor="answer_transcription">
                                                Transcription
                                            </label>
                                        </div>   
                                    </div> 
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                name="answerTranslate"
                                                checked={this.state.answerTranslate}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="answer_translate"
                                                disabled={this.state.questionTranslate || this.state.answerOrigin && this.state.answerTranscription}
                                                onChange={this.handleCheckbox}
                                            />
                                            <label className="form-check-label" htmlFor="answer_translate">
                                                Translate
                                            </label>
                                        </div>   
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.errorMessage && (<div className="alert alert-danger" role="alert">
                        {{errorMessage}}
                    </div>)}
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.startTest}>Start</button>
                    </div>)
                ) : (
                    <div>{ this.state.isLoading ? (<div>Loading...</div>) : (<div>Some error</div>) }</div>
                )
            ) : (<div>403 Access denied</div>) }
            </div>
        )
    }
}

export default Practice;
