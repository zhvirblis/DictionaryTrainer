import React from 'react';
import dictService from  "./../../../Services/dict";
import userService from "./../../../Services/user.js";
import PracticeProcess from "./Parts/PracticeProcess";
import PracticeSettings from "./Parts/PracticeSettings";

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
                    this.state.started ? (
                        <PracticeProcess
                            dictionary={this.state.dictionary}
                            questionOrigin={this.state.questionOrigin}
                            questionTranslate={this.state.questionTranslate}
                            questionTranscription={this.state.questionTranscription}
                            answerOrigin={this.state.answerOrigin}
                            answerTranslate={this.state.answerTranslate}
                            answerTranscription={this.state.answerTranscription}
                        />
                    ) : (
                        <PracticeSettings
                            name={this.state.dictionary.name}
                            questionOrigin={this.state.questionOrigin}
                            questionTranslate={this.state.questionTranslate}
                            questionTranscription={this.state.questionTranscription}
                            answerOrigin={this.state.answerOrigin}
                            answerTranslate={this.state.answerTranslate}
                            answerTranscription={this.state.answerTranscription}
                            handleCheckbox={this.handleCheckbox}
                            errorMessage={this.state.errorMessage}
                            startTest={this.startTest}
                        />
                    )
                ) : (
                    <div>{ this.state.isLoading ? (<div>Loading...</div>) : (<div>Some error</div>) }</div>
                )
            ) : (<div>403 Access denied</div>) }
            </div>
        )
    }
}

export default Practice;
