import React from 'react'
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'


class StreamCreate extends React.Component {
    
    onSubmit = formValues => {
        this.props.createStream(formValues)
    }

    render() {
        /* When using redux-form we replace the parameter passed to onSubmit()
         * within the form element: instead of onSubmit={this.onSubmit} we use:
         * onSubmit={this.props.handleSubmit(onSubmit)} where handelSubmit is 
         * one of the properties of the this.props object as modified by 
         * redux-form.
        */

        return (
           <div>
               <h3>Create a String</h3>
               <StreamForm onSubmit={this.onSubmit} />
           </div>
        )
    }
}

export default connect(null, { createStream })(StreamCreate)