import React from 'react';


class PracticeSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="practice-page">
                <div className="row">
                    <div className="col-sm">
                        <div className="card">
                            <div className="card-body">            
                                <h3>Question</h3>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input
                                            name="questionOrigin"
                                            checked={this.props.questionOrigin}
                                            className="form-check-input"
                                            type="checkbox"
                                            id="question_origin"
                                            onChange={this.props.handleCheckbox}
                                            disabled={this.props.answerOrigin || this.props.questionTranslate && this.props.questionTranscription}
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
                                            checked={this.props.questionTranscription}
                                            className="form-check-input"
                                            type="checkbox"
                                            id="question_transcription"
                                            onChange={this.props.handleCheckbox}
                                            disabled={this.props.answerTranscription || this.props.questionOrigin && this.props.questionTranslate}
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
                                            checked={this.props.questionTranslate}
                                            className="form-check-input"
                                            type="checkbox"
                                            id="question_translate"
                                            onChange={this.props.handleCheckbox}
                                            disabled={this.props.answerTranslate || this.props.questionOrigin && this.props.questionTranscription}
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
                                                checked={this.props.answerOrigin}
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="answer_origin"
                                                disabled={this.props.questionOrigin || this.props.answerTranslate && this.props.answerTranscription}
                                                onChange={this.props.handleCheckbox}
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
                                                checked={this.props.answerTranscription}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="answer_transcription"
                                                disabled={this.props.questionTranscription || this.props.answerOrigin && this.props.answerTranslate}
                                                onChange={this.props.handleCheckbox}
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
                                                checked={this.props.answerTranslate}
                                                className="form-check-input"
                                                type="checkbox"
                                                id="answer_translate"
                                                disabled={this.props.questionTranslate || this.props.answerOrigin && this.props.answerTranscription}
                                                onChange={this.props.handleCheckbox}
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
                {this.props.errorMessage && (<div className="alert alert-danger" role="alert">
                    {this.props.errorMessage}
                </div>)}
                <div className="btn-practice-wrapper">
                    <button type="button" className="btn-practice btn btn-success btn-lg" onClick={this.props.startTest}>Start Practice</button>
                </div>
            </div>
        )
    }
}

export default PracticeSettings;
