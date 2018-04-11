import axios from 'axios';
import * as constants from '../../constants';

export function removeTodoListStart() {
    return {
        type: constants.TODO_LIST_REMOVE_START
      }
}

export function removeTodoListSuccess(todoListId) {
    return {
        type: constants.TODO_LIST_REMOVE_SUCCESS,
        payload: {
            todoListId
        }
      }
}

export function removeTodoListError(error) {
    return {
        type: constants.TODO_LIST_REMOVE_ERROR,
        payload: {
          error
        }
      }
}

export function removeTodoList(todoListId) {
    return (dispatch) => {
        dispatch(removeTodoListStart());
        axios(`https://todos.venturedevs.net/api/todolists/${todoListId}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            dispatch(removeTodoListSuccess(todoListId))
        })
        .catch(error => {
            dispatch(removeTodoListError(error));
        });
    }
}