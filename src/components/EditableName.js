import React from 'react';

class EditableName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.todoListsItem.name,
            nameVisible: 'd-inline',
            editVisible: 'd-none'
        };
        this.onChangeName = this.onChangeName.bind(this);
    }
    
    onShowNameEdit() {
        this.setState({
            nameVisible: "d-none",
            editVisible: "d-block"
        });
        
    }

    onHideNameEdit() {
        this.setState({
            nameVisible: "d-inline",
            editVisible: "d-none"
        });
    }


    onChangeName(event) {
        this.setState({value: event.target.value});
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.onChangeName(this.props.todoListsItem.id, this.state.value);
            this.onHideNameEdit();
        }
    }

    render() {
        return(
            <div>
              <span onDoubleClick={this.onShowNameEdit.bind(this)} className={this.state.nameVisible}>{this.props.todoListsItem.name}</span>
              <input 
                name="name" 
                type="text" 
                className={`form-control ${this.state.editVisible}`} 
                value={this.state.value} 
                onChange={this.onChangeName} 
                onKeyPress={this.handleKeyPress.bind(this)} 
                ref={input => input && input.focus()}
              />
            </div>
        )
    }
}



export default EditableName