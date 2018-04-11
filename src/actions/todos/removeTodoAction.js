import axios from 'axios';
import * as constants from '../../constants';

export function removeTodoStart(todoId) {
    return {
        type: constants.TODO_REMOVE_START,
        payload: {
            todoId
        }
      }
}

export function removeTodoSuccess(todoId) {
    return {
        type: constants.TODO_REMOVE_SUCCESS,
        payload: {
            todoId
        }
      }
}

export function removeTodoError(error) {
    return {
        type: constants.TODO_REMOVE_ERROR,
        payload: {
          error
        }
      }
}

export function removeTodo(todoId) {
    return (dispatch) => {
        dispatch(removeTodoStart(todoId));
        axios(`https://todos.venturedevs.net/api/todos/${todoId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            dispatch(removeTodoSuccess(todoId))
        })
        .catch(error => {
            dispatch(removeTodoError(error));
        });
    }
}