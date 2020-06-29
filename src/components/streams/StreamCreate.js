import React from 'react'
import { Field, reduxForm, getFormMeta } from 'redux-form'
import { connect } from 'react-redux'
import { createStream } from '../../actions'


class StreamCreate extends React.Component {
    /* This method has been implemented in order to prevent the missing
     * input errors displaying as soon as the page loads up while we
     * haven't had the time to type anything up in the forms yet.
     * ({ error, touched }) is the destructured version of (meta).
     * Mind this method needs renderInput to be an Arrow Function to
     * to work, because of scope rules.
     * Also mind that SemanticUI hides the error messages by default
     * adding the display=none property to them. The workaround is 
     * showed in the renderInput method
     */       
    renderError({ error, touched }) { 
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                    { error }
                    </div>
                </div>
            )
        }
    }
    
    renderInput = ({ input, label, meta }) => {
        /* Workaround to allow errors to be displayed when using SemanticUI
        */
       const classNameErrorWorkaround=`field ${meta.error && meta.touched ? 'error' : ''  }`

        /* Instead of passing (formProps) and use {formProps.input} I'm
         * destructuring it to ({input}) and I can also add the label property
         * that get passed in the <Field /> component or any other properties.
         * Please note that the 'meta' argument is used for passing the errors
         * of the input fields.
        */
        return(
            
            <div className={classNameErrorWorkaround}>
                <label>{label}</label>
                <input { ...input } autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }
    
    onSubmit = formValues => {
        // No need to call event.precentDefault() when using redux-form
        // Also: when using redux-form we don't deal anymore with an event
        // object as an argument to onSubmit, eg onSumbit(event) {...}.
        // It is going to contain all our required values like the values
        // of the input fields, checkboxes etc. (passed through the
        // this.onSubmit paramenter inside the form element). You can checkout
        // the output of console.log(formValues) for clarifications. 
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
            <form   className="ui form error"
                    onSubmit={this.props.handleSubmit(this.onSubmit)} >
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

/* Validating the inputs.
 * We return an object containing key/value pairs like
 * title: 'Missing Title' and so on.
 * If there are no errors we return an empty object.
 * 
 * In order for it to work we need to passed it to the 
 * reduxForm helper down below.
*/
const validate = formValues => {
    const errors = {}

    if (!formValues.title) {
        errors.title = 'Missing Title.'
    }

    if (!formValues.description) {
        errors.description = 'Missing Description.'
    }

    return errors
}

// reduxForm is very similar to redux's connect but it
// only takes one single object as an argument.
const wrappedForm =  reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate)

export default connect(null, { createStream })(wrappedForm)