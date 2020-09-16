import React from 'react';


class Question extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <div>
                <b>{this.props.name}</b>:{this.props.value}
            </div>
        )
    }
}

export default Question;
