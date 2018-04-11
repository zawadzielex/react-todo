import React from 'react';
import PropTypes from 'prop-types';


class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
   

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({value: ""});
    }

    render() {
        return( 
            <div className="col-lg-5 col-8">
                <form onSubmit={this.onSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} placeholder={this.props.placeholder}/>
                    <div className="input-group-append">
                        <input className="btn btn-light" type="submit" value="Add" />
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

Add.propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func
}

export default Add;
