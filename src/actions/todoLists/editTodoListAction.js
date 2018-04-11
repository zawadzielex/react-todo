import axios from 'axios';
import * as constants from '../../constants';

export function editTodoListStart(todoListId, data) {
    return {
        type: constants.TODO_LIST_EDIT_START,
        payload: {
            data,
            todoListId
        }
      }
}

export function editTodoListSuccess(todoListId, data) {
    return {
        type: constants.TODO_LIST_EDIT_SUCCESS,
        payload: {
            data,
            todoListId
        }
      }
}

export function editTodoListError(todoListId, error) {
    return {
        type: constants.TODO_LIST_EDIT_ERROR,
        payload: {
          error,
          todoListId
        }
      }
}

export function editTodoList(todoListId, data) {
    return (dispatch) => {
        dispatch(editTodoListStart(todoListId, data));
        axios(`https://todos.venturedevs.net/api/todolists/${todoListId}/`, {
            method: "PUT",
            data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            dispatch(editTodoListSuccess(todoListId, response.data))
        })
        .catch(error => {
            dispatch(editTodoListError(todoListId, error));
        });
    }
}