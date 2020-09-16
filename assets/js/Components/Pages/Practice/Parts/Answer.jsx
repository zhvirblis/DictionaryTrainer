import React from 'react';

class Answer extends React.Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                <input name={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.handleInputChange}/>
            </div>
        )
    }
}

export default Answer;
