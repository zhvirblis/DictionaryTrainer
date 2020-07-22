import React from 'react';

function TermList(props) {
    const terms = props.terms;
    const listItems = terms.map((term) =>
        <div className="card" key={term.id}>
            <div className="card-body card-el">
                <h5 className="card-title">{term.origin}</h5>
                <h5 className="card-title">{term.transcription}</h5>
                <h5 className="card-title">{term.translate}</h5>
                <h5 className="card-title">{term.helper}</h5>
                <button type="button" className="delete btn btn btn-danger btn-sm">Delete</button>
            </div>
        </div>
    );
    return (
        <div>
            {listItems}
        </div>
    );
}

export default TermList;