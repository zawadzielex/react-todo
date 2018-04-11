import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';    
import Search from './Search';
import Filter from './Filter';
import Add from './Add';
import * as actions from '../actions/todos'; 
import EditableName from '../components/EditableName';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: "",
            nameClass: "d-inline",
            nameEditClass: "d-none",
            all: true,
            complete: false,
            incomplete: false
        }
    }

    componentWillMount() {
        this.props.getTodos(this.props.match.params.id);
    }

    onAddTodo(name) {
        this.props.addTodo({
            name,
            is_complete: false,
            todo_list: this.props.match.params.id
        });
    }

    onChangeSearch(filter) {
        this.setState({filter});
    }

    onChangeFilter(filter) {
        this.setState(filter);
    }

    renderTodo(todos) {
        todos = todos.filter((item) => {
            const regex = new RegExp(this.state.filter, 'g');
            if(this.state.all) {
                return item.name.match(regex);
            }
            if(this.state.complete === true) {
                return item.is_complete === true && item.name.match(regex);
            }
            if(this.state.incomplete === true) {
                return item.is_complete === false && item.name.match(regex);
            }
            return true;
            
        });
    
        return (
            <div>
                {todos.map(this.renderTodoListsItem.bind(this))}
            </div>
        )
    }

    onChangeName(todoId, name) {
        this.props.editTodo(todoId, { name, todo_list: this.props.match.params.id })
    }

    onChangeCoplete(todoListsItem, event) {
        this.props.editTodo(todoListsItem.id, { name: todoListsItem.name, is_complete: event.target.checked, todo_list: this.props.match.params.id })
    }

    onRemoveTodo(todoId) {
        this.props.removeTodo(todoId);
    }

    renderTodoListsItem(todoListsItem) {
        return (
            <div key={todoListsItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <input className="todo__checkbox" type="checkbox" value="" checked={todoListsItem.is_complete} onChange={this.onChangeCoplete.bind(this, todoListsItem)} />
                    <EditableName 
                        onChangeName={this.onChangeName.bind(this)}
                        todoListsItem={todoListsItem}
                    />
                </div>
                <div>
                <button className="btn btn-sm btn-danger" onClick={()=>this.onRemoveTodo(todoListsItem.id)}>
                    <span className="oi" data-glyph="circle-x" title="Remove" aria-hidden="true"></span>
                </button>
                </div> 
            </div>
        );
    }

    percentComplete() {
        let percentCompleteValue = 0;
        percentCompleteValue = (this.props.todos.data.length > 0) ?
            Math.round(
                    this.props.todos.data.filter(item => item.is_complete === true).length / 
                    this.props.todos.data.length * 100
            ) : 0;

        return percentCompleteValue;
    }

    componentWillUnmount() {
        this.props.clearTodos();
    }

    render() {
        
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <h3>List of todos</h3>
                        <Link to="/" className="btn btn-sm btn-light todo__back" >
                            <span className="oi" data-glyph="chevron-left" title="Remove" aria-hidden="true"></span>
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Add
                        onSubmit={this.onAddTodo.bind(this)}
                        placeholder="Todo name"
                    />
                    <Search 
                        onChangeFilter={this.onChangeSearch.bind(this)}
                    />
                </div>
                <Filter 
                    onChangeFilter={this.onChangeFilter.bind(this)}
                    percentComplete={this.percentComplete.bind(this)}
                />
                <div className="todo-lists row justify-content-center">
                    <div className="col-6">
                        {this.props.todos.isLoading && this.props.todos.data.length === 0 &&
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  style={{width: "100%"}}></div>
                            </div>
                        } 
                        {!this.props.todos.isLoading && this.props.todos.data.length === 0 &&
                            <div className="card">
                                <div className="card-body">
                                    There are no todos on this list.
                                </div>
                            </div>
                        } 
                        <div className="list-group" >
                            { this.renderTodo( this.props.todos.data ) }
                        </div>
                        {!this.props.todos.isLoading && this.props.todos.data.length > 0 &&
                            <div className="small">Hint: double-click a list items name to edit it.</div>
                        }
                    </div>
                </div>

            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        ...state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (list) => {
            dispatch(actions.add.addTodo(list))
        },
        getTodos: (list_id) => {
            dispatch(actions.get.getTodos(list_id))
        },
        clearTodos: () => {
            dispatch(actions.get.clearTodos())
        },
        removeTodo: (todoId) => {
            dispatch(actions.remove.removeTodo(todoId))
        },
        editTodo: (todoId, data) => {
            dispatch(actions.edit.editTodo(todoId, data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List)