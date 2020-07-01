import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'


// React.Fragment is an element that doesn't get rendered. It is useful 
// when you have to return a div but that very div would create a disruption
// on your App because it wasn't expected. eg when using SemanticUI divs with
// classes that need to be nested in a very specific succession but you HAVE
// TO RETURN a div with some JSX in it (as you can't return multiple elements,
// you need to wrap everything inside a div like in this case: can't return
// two buttons, have to wrap them inside a div, but you don't want the div to
// mess around with your component once it gets rendered: 
// use a React.Fragment element!!)
// <React.Fragment> can be shortened to <> and </React.Fragment> to </>.
class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    
    renderActions() {
        const { id } = this.props.match.params
        return(
            <React.Fragment>
                <button
                    onClick={() => { this.props.deleteStream(id) }} 
                    className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete ${this.props.stream.title}?`
    }

    render() {
        return (    
            <Modal 
                title="Delete Stream" 
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={ () => history.push('/') }
            />
    
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)