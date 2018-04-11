import * as constants from '../constants';

const initalState = {
    data: [],
    isError: false,
    isLoading: false
};


export const todoReducer = (state = initalState, action) => { 
    switch (action.type) {
        case constants.TODO_POST_START:
            return { ...state, isLoading : true};
        case constants.TODO_POST_SUCCESS:
            return { ...state, isLoading: false, data: [...state.data, action.payload.data]};
        case constants.TODO_POST_ERROR:
            return { ...state, isLoading: false, isError: true};

        case constants.TODOS_GET_START:
            return { ...state, isLoading : true};
        case constants.TODOS_GET_SUCCESS:
            return { ...state, isLoading: false, data: action.payload.data};
        case constants.TODOS_GET_ERROR:
            return { ...state, isLoading: false, isError: true};

        case constants.TODO_EDIT_START:
            return { ...state, isLoading : true, data: state.data.map((item)=>{ 
                if(item.id === action.payload.todoId) {
                    return {...item, ...action.payload.data}
                } 
                return item
            })};
        case constants.TODO_EDIT_SUCCESS:
            return { ...state, isLoading: false, data: state.data.map((item)=>{ 
                if(item.id === action.payload.todoId) {
                    return action.payload.data
                } 
                return item
            })};
        case constants.TODO_EDIT_ERROR:
            return { ...state, isLoading: false, isError: true};
        case constants.TODO_CLEAR: 
            return { ...state, isLoading: false, isError: true, data: [] }

        case constants.TODO_REMOVE_START:
            return { ...state, isLoading : true, data: state.data.filter((item)=>item.id !== action.payload.todoId)};
        case constants.TODO_REMOVE_SUCCESS:
            return { ...state, isLoading: false, data: state.data.filter((item)=>item.id !== action.payload.todoId)};
        case constants.TODO_REMOVE_ERROR:
            return { ...state, isLoading: false, isError: true};
        default:
            return state;
    }
}