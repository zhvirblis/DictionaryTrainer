import React from 'react';

function DictionaryList(props) {
    const dictionaries = props.dictionaries;
    const listItems = dictionaries.map((dictionary) =>
        <div className="card" key={dictionary.id}>
            <div className="card-body">
                <h5 className="card-title">{dictionary.name}</h5>
            </div>
        </div>
    );
    return (
        <div>
            {listItems}
        </div>
    );
}

export default DictionaryList;