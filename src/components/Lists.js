import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from './Search';
import Add from './Add';
import EditableName from './EditableName';
import * as actions from '../actions/todoLists';

class Lists extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: "",
            nameClass: "d-inline",
            nameEditClass: "d-none"
        }
    }
    componentWillMount() {
        this.props.getTodoList();
    }

    
    renderTodoListsItem(todoListsItem) {
        return (
            <div key={todoListsItem.id} className="list-group-item d-flex justify-content-between align-items-center">
                
                    <EditableName 
                        onChangeName={this.onChangeName.bind(this)}
                        todoListsItem={todoListsItem}
                    />
                    
                
                <div>
                    <span className="badge badge-primary badge-pill"  >{todoListsItem.todos_count}</span>&nbsp;
                    <Link to={`/list/${todoListsItem.id}`} className="btn btn-sm btn-dark">
                        <span className="oi" data-glyph="eye" title="Show" aria-hidden="true"></span> Show
                    </Link>&nbsp;
                    <button className="btn btn-sm btn-danger" onClick={()=>this.onRemoveTodoList(todoListsItem.id)}>
                        <span className="oi" data-glyph="circle-x" title="Remove" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        );
    }

   
    onAddTodoList(name) {
        this.props.addTodoList({
            name,
            "todos_count": 0
        });
    }
    
    onRemoveTodoList(todoListsId) {
        this.props.removeTodoList(todoListsId);
    }

    onChangeFilter(filter) {
        this.setState({filter});
    }

    onChangeName(todoListId, name) {
        this.props.editTodoList(todoListId, { name })
    }



    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-12">
                        <h3>Todo lists</h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Add
                        onSubmit={this.onAddTodoList.bind(this)}
                        placeholder="List name"
                    />
                    <Search 
                        onChangeFilter={this.onChangeFilter.bind(this)}
                    />
                </div>

                <div className="todo-lists row justify-content-center">
                    <div className="col-lg-8 col-12">
                        {this.props.todoLists.isLoading && this.props.todoLists.data.length === 0 && 
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  style={{width: "100%"}}></div>
                            </div>
                        } 
                        {!this.props.todoLists.isLoading && this.props.todoLists.data.length === 0 &&
                            <div className="card">
                                <div className="card-body">
                                    There are no todos lists.
                                </div>
                            </div>
                        } 
                        <div className="list-group" >
                            {
                            this.props.todoLists.data.filter((item) => {
                                if(this.state.filter !== "") {
                                    const regex = new RegExp(this.state.filter, 'g');
                                    return item.name.match(regex);
                                }
                                return true;
                            })
                            .map(this.renderTodoListsItem.bind(this))
                            }
                        </div>

                        {!this.props.todoLists.isLoading && this.props.todoLists.data.length > 0 &&
                            <div className="small">Hint: double-click a todos name to edit it.</div>
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
        addTodoList: (list) => {
            dispatch(actions.add.addTodoList(list))
        },
        getTodoList: () => {
            dispatch(actions.get.getTodoList())
        },
        removeTodoList: (todoListsId) => {
            dispatch(actions.remove.removeTodoList(todoListsId))
        },
        editTodoList: (todoListId, data) => {
            dispatch(actions.edit.editTodoList(todoListId, data))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)