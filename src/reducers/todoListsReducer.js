import * as constants from '../constants';

const initalState = {
            data: [],
            isError: false,
            isLoading: false,
        };

export const todoListsReducer = (state = initalState, action) => {
    switch (action.type) {
      case constants.TODO_LISTS_GET_START:
        return { ...state, isLoading : true};
      case constants.TODO_LISTS_GET_SUCCESS:
        return { ...state, isLoading: false, data: action.payload.data};
      case constants.TODO_LISTS_GET_ERROR:
        return { ...state, isLoading: false, isError: true};

    case constants.TODO_LIST_POST_START:
        return { ...state, isLoading : true};
      case constants.TODO_LIST_POST_SUCCESS:
        return { ...state, isLoading: false, data: [...state.data, action.payload.data]};
      case constants.TODO_LIST_POST_ERROR:
        return { ...state, isLoading: false, isError: true};

    case constants.TODO_LIST_REMOVE_START:
        return { ...state, isLoading : true};
    case constants.TODO_LIST_REMOVE_SUCCESS:
        return { ...state, isLoading: false, data: state.data.filter((item)=>item.id !== action.payload.todoListId)};
    case constants.TODO_LIST_REMOVE_ERROR:
        return { ...state, isLoading: false, isError: true};


    case constants.TODO_LIST_EDIT_START:
        return { ...state, isLoading : true, data: state.data.map((item)=>{ 
            if(item.id === action.payload.todoListId) {
                return  {...item, ...action.payload.data}
            } 
            return item
        })};
    case constants.TODO_LIST_EDIT_SUCCESS:
        return { ...state, isLoading: false, data: state.data.map((item)=>{ 
                if(item.id === action.payload.todoListId) {
                    return action.payload.data
                } 
                return item
            })
        };
    case constants.TODO_LIST_EDIT_ERROR:
        return { ...state, isLoading: false, isError: true};
    default:
        return state;
    }
    
  };