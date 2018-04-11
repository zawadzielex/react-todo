import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            all: true,
            incomplete: false,
            complete: false
        };
        this.onChangeFilter = this.onChangeFilter.bind(this);
    }
    

    onChangeFilter(event) {
        const filter = {all :false, incomplete: false, complete: false, [event.target.name]: true};
        this.setState(filter);
        this.props.onChangeFilter(filter);
    }

    render() {
        return(
            <div className="row justify-content-center todo__filter">
                <div className="col-lg-4 col-sm-6  col-xs-12">
                    <div className="btn-group btn-group-sm todo__filter__buttons btn-group-toggle" data-toggle="buttons">
                        <label className={`btn btn-light ${this.state.all ? "active": ""}`}>
                            <input 
                                type="radio" 
                                name="all" 
                                id="all" 
                                autoComplete="off" 
                                checked={this.state.all}
                                onChange={this.onChangeFilter}
                            /> 
                            <span className="oi" data-glyph="list" title="List" aria-hidden="true"></span> All
                        </label>
                        <label className={`btn btn-light ${this.state.incomplete ? "active": ""}`}>
                            <input 
                                type="radio" 
                                name="incomplete" 
                                id="incomplete" 
                                autoComplete="off" 
                                checked={this.state.incomplete} 
                                onChange={this.onChangeFilter}
                            /> 
                            <span className="oi" data-glyph="target" title="Incomplete" aria-hidden="true"></span> Incomplete
                        </label>
                        <label className={`btn btn-light ${this.state.complete ? "active": ""}`}>
                            <input 
                                type="radio" 
                                name="complete" 
                                id="complete" 
                                autoComplete="off" 
                                checked={this.state.complete} 
                                onChange={this.onChangeFilter}
                            />
                            <span className="oi" data-glyph="task" title="Complete" aria-hidden="true"></span> Complete
                        </label>
                    </div>
                </div>
                <div className="col-lg-4 col-xs-12 col-sm-6 d-flex align-items-center">
                        <div className="progress progress--todo" style={{width: "100%"}}>
                            <div className="progress-bar" role="progressbar" style={{width: `${this.props.percentComplete()}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.props.percentComplete()}%</div>
                        </div>
                </div>
             
               
            </div>
        )
    }
}



export default Filter;