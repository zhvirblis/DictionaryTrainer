import React from 'react';

function YesNoModal(props) {
    const message = props.message ;
    const okAction = props.okAction;
    const closeAction = props.closeAction;

    return (
        <div className="modal-react-bootstrap">
            <div className="modal-dialog">
                <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" onClick={closeAction} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {message}
                    </div>
                     <div className="modal-footer">
                        <button type="button" onClick={closeAction} className="btn btn-secondary" data-dismiss="modal">NO</button>
                        <button type="button" onClick={okAction} className="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
            <div className="fade-background">
            </div>
        </div>
    );
}

export default YesNoModal;
