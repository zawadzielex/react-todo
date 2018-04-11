import axios from 'axios';
import * as constants from '../../constants';


export function getTodoListStart() {
    return {
        type: constants.TODO_LISTS_GET_START
      }
}

export function getTodoListSuccess(data) {
    console.log(data);
    return {
        type: constants.TODO_LISTS_GET_SUCCESS,
        payload: {
          data
        }
      }
}

export function getTodoListError(error) {
    return {
        type: constants.TODO_LISTS_GET_ERROR,
        payload: {
          error
        }
      }
}

export function getTodoList() {
    return (dispatch) => {
        dispatch(getTodoListStart());
        axios('https://todos.venturedevs.net/api/todolists/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log(response.data);
            dispatch(getTodoListSuccess(response.data))
        })
        .catch(error => {
            dispatch(getTodoListError(error));
        });
    }
}

