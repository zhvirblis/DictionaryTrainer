import React from 'react';
import dictService from  "./../../../../Services/dict";
import userService from "./../../../../Services/user.js";
import Question from "./Question";
import Answer from "./Answer";

class PracticeProcess extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentTermCard: null,
            answerOrigin: "",
            answerTranscription: "",
            answerTranslate: "",
            errorMessage: "",
            successMessage: ""
        }

        this.termsCopy = props.dictionary.terms.filter((term) => {
            return ((props.questionOrigin && term.origin || props.questionTranslate && term.translate || props.questionTranscription && term.transcription)
                || (props.answerOrigin && term.origin || props.answerTranslate && term.translate || props.answerTranscription && term.transcription))
                && (!props.dictionary.terms.some(el => el.checked) || term.checked)
                
        });
        this.handleInputChange = this.handleInputChange.bind(this);
        this.checkAnswerHandler = this.checkAnswerHandler.bind(this);
        this.skipAnswer = this.skipAnswer.bind(this);
        this.nextQuesstion = this.nextQuesstion.bind(this);
    }

    
    componentDidMount() {
        this.setNewCard();
    }

    setNewCard() {
        if(this.termsCopy && this.termsCopy.length) {
            let idOfCurrentTermCard = this.getRandomInt(this.termsCopy.length);
            let currentTermCard = this.termsCopy[idOfCurrentTermCard];
            currentTermCard.arrId = idOfCurrentTermCard;

            this.setState({
                currentTermCard
            });
        } else {
            this.setState({
                currentTermCard: null
            });
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    checkAnswerHandler(event) {
        event.preventDefault();
        if(this.checkAnswer()) {
            this.setState({
                successMessage: "Right!",

            });
        } else {
            this.setState({
                errorMessage: `Wrong! Right answer is ${this.getRightAnswer()}` 
            });
        }
    }

    checkAnswer() {
        return (!this.props.answerOrigin || this.state.currentTermCard.origin == this.state.answerOrigin)
            && (!this.props.answerTranscription || this.state.currentTermCard.transcription == this.state.answerTranscription)
            && (!this.props.answerTranslate || this.state.currentTermCard.translate == this.state.answerTranslate);
    }

    getRightAnswer() {
        if(this.props.answerOrigin && !this.props.answerTranscription && !this.props.answerTranslate) {
            return this.state.currentTermCard.origin;
        }
        if(!this.props.answerOrigin && this.props.answerTranscription && !this.props.answerTranslate) {
            return this.state.currentTermCard.transcription;
        }
        if(!this.props.answerOrigin && !this.props.answerTranscription && this.props.answerTranslate) {
            return this.state.currentTermCard.translate;
        }
        if(this.props.answerOrigin && this.props.answerTranscription && !this.props.answerTranslate) {
            return 'Origin: ' + this.state.currentTermCard.origin + ', Transcripion: ' + this.state.currentTermCard.transcription;
        }
        if(this.props.answerOrigin && !this.props.answerTranscription && this.props.answerTranslate) {
            return 'Origin: ' + this.state.currentTermCard.origin + ', Translate: ' + this.state.currentTermCard.translate;
        }
        if(!this.props.answerOrigin && this.props.answerTranscription && this.props.answerTranslate) {
            return 'Transcription: ' + this.state.currentTermCard.transcription + ', Translate: ' + this.state.currentTermCard.translate;
        }
    }

    skipAnswer() {
        this.setState({
            errorMessage: `Right answer is ${this.getRightAnswer()}`
        });
    }

    nextQuesstion() {
        if(this.state.errorMessage) {
            this.setState({
                errorMessage: "",
                answerOrigin: "",
                answerTranslate: "",
                answerTranscription: ""
            });
            this.setNewCard();
        }
        if(this.state.successMessage) {
            this.termsCopy.splice(this.state.currentTermCard.arrId, 1);
            this.setState({
                successMessage: "",
                answerOrigin: "",
                answerTranslate: "",
                answerTranscription: ""
            });
            this.setNewCard();
        }
    }

    render() {
        return (
            <div>
                <div className="card">
                        { this.state.currentTermCard ? (
                            <div className="card-body">
                                <form onSubmit={this.checkAnswerHandler}>
                                {this.state.currentTermCard.origin && this.props.questionOrigin && (
                                    <Question name="Origin" value={this.state.currentTermCard.origin}/>
                                )}
                                {this.state.currentTermCard.transcription && this.props.questionTranscription && (
                                    <Question name="Transcription" value={this.state.currentTermCard.transcription}/>
                                )}
                                {this.state.currentTermCard.translate && this.props.questionTranslate && (
                                    <Question name="Translate" value={this.state.currentTermCard.translate}/>
                                )}
                                {this.state.currentTermCard.origin && this.props.answerOrigin && (
                                    <Answer placeholder="Origin" handleInputChange={this.handleInputChange} name="answerOrigin" value={this.state.answerOrigin}/>
                                )}
                                {this.state.currentTermCard.transcription && this.props.answerTranscription && (
                                    <Answer placeholder="Transcription" handleInputChange={this.handleInputChange} name="answerTranscription" value={this.state.answerTranscription}/>
                                )}
                                {this.state.currentTermCard.translate && this.props.answerTranslate && (
                                    <Answer placeholder="Translate" handleInputChange={this.handleInputChange} name="answerTranslate" value={this.state.answerTranslate}/>
                                )}
                                { this.state.successMessage || this.state.errorMessage ? (
                                    <div className="btn-wrapper">
                                        { this.state.successMessage && (
                                        <div className="alert alert-success" role="alert">
                                            {this.state.successMessage}
                                        </div>
                                        )}
                                        { this.state.errorMessage && (
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.errorMessage}
                                        </div>
                                        )}
                                        <button className="btn btn-outline-primary" type="button" onClick={this.nextQuesstion}>Next</button>
                                    </div>
                                ) : (
                                    <div className="btn-wrapper">
                                        <button className="btn btn-primary" type="submit">Answer</button>
                                        <button className="btn btn-outline-danger" type="button" onClick={this.skipAnswer}>Skip</button>
                                    </div>
                                )}
                                </form>
                            </div>
                        ):(
                            <div>No Cards</div>
                        ) }
                </div>
            </div>
        );
    }
}

export default PracticeProcess;
