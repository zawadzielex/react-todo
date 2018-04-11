import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }
    

    onChangeFilter(event) {
        this.props.onChangeFilter(event.target.value);
        this.setState({value: event.target.value});
    }

    render() {
        console.log(this.props);
        return(
            <div className="col-2">
               <input name="search"   type="text" className="form-control" value={this.state.value} onChange={this.onChangeFilter} placeholder="Search"/>
            
            </div>
        )
    }
}



export default Search;