import React from 'react'
import ReactDOM from 'react-dom'
import history from '../history'


// The first onClick method is used to make the Modal disappear if the user
// clicks outside of the modal itself (in the gray area).
// The seconf onClick methos is to prevent that to happen if an area WITHIN
// the boundary of the Modal is clicked.
const Modal = props => {
    return ReactDOM.createPortal(
        <div 
            onClick={props.onDismiss} 
            className="ui dimmer modals visible active">
            <div
                onClick={(event) => { event.stopPropagation() }} 
                className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">
                    <p>{props.content}</p>
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector("#modal")
    )
}

export default Modal