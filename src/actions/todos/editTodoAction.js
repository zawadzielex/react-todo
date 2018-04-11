import axios from 'axios';
import * as constants from '../../constants';

export function editTodoStart(todoId, data) {
    return {
        type: constants.TODO_EDIT_START,
        payload: {
            data,
            todoId
        }
      }
}

export function editTodoSuccess(todoId, data) {
    return {
        type: constants.TODO_EDIT_SUCCESS,
        payload: {
            data,
            todoId
        }
      }
}

export function editTodoError(todoId, error) {
    return {
        type: constants.TODO_EDIT_ERROR,
        payload: {
          error,
          todoId
        }
      }
}

export function editTodo(todoId, data) {
    return (dispatch) => {
        dispatch(editTodoStart(todoId, data));
        axios(`https://todos.venturedevs.net/api/todos/${todoId}/`, {
            method: "PUT",
            data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            dispatch(editTodoSuccess(todoId, response.data))
        })
        .catch(error => {
            dispatch(editTodoError(todoId, error));
        });
    }
}