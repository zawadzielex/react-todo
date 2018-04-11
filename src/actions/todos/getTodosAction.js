import axios from 'axios';
import * as constants from '../../constants';


export function getTodosStart() {
    return {
        type: constants.TODOS_GET_START
      }
}

export function getTodosSuccess(data) {
    console.log(data);
    return {
        type: constants.TODOS_GET_SUCCESS,
        payload: {
          data
        }
      }
}

export function getTodosError(error) {
    return {
        type: constants.TODOS_GET_ERROR,
        payload: {
          error
        }
      }
}

export function getTodos(todolist_id) {
    return (dispatch) => {
        dispatch(getTodosStart());
        axios(`https://todos.venturedevs.net/api/todolists/${todolist_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log(response.data);
            dispatch(getTodosSuccess(response.data))
        })
        .catch(error => {
            dispatch(getTodosError(error));
        });
    }
}

export function clearTodos() {
    return {
        type: constants.TODO_CLEAR
      }
}