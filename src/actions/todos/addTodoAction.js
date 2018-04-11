import axios from 'axios';
import * as constants from '../../constants';

export function addTodoStart() {
    return {
        type: constants.TODO_POST_START
      }
}

export function addTodoSuccess(data) {
    console.log(data);
    return {
        type: constants.TODO_POST_SUCCESS,
        payload: {
          data
        }
      }
}

export function addTodoError(error) {
    return {
        type: constants.TODO_POST_ERROR,
        payload: {
          error
        }
      }
}

export function addTodo(data) {
    return (dispatch) => {
        dispatch(addTodoStart());
        axios('https://todos.venturedevs.net/api/todos/', {
            method: "POST",
            data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            dispatch(addTodoSuccess(response.data))
        })
        .catch(error => {
            dispatch(addTodoError(error));
        });
    }
} 