import React from 'react'
import { Field, reduxForm } from 'redux-form'



class StreamForm extends React.Component {
   
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
        return(
            
            <div className={classNameErrorWorkaround}>
                <label>{label}</label>
                <input { ...input } autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }
    
    onSubmit = formValues => {
        this.props.onSubmit(formValues)
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


export default reduxForm({
    form: 'StreamForm',
    validate: validate
})(StreamForm)
