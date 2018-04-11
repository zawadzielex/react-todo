import axios from 'axios';
import * as constants from '../../constants';

export function addTodoListStart() {
    return {
        type: constants.TODO_LIST_POST_START
      }
}

export function addTodoListSuccess(data) {
    console.log(data);
    return {
        type: constants.TODO_LIST_POST_SUCCESS,
        payload: {
          data
        }
      }
}

export function addTodoListError(error) {
    return {
        type: constants.TODO_LIST_POST_ERROR,
        payload: {
          error
        }
      }
}

export function addTodoList(data) {
    return (dispatch) => {
        dispatch(addTodoListStart());
        axios('https://todos.venturedevs.net/api/todolists/', {
            method: "POST",
            data,
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            dispatch(addTodoListSuccess(response.data))
        })
        .catch(error => {
            dispatch(addTodoListError(error));
        });
    }
}