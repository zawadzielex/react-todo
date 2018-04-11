import { combineReducers } from 'redux';
import { todoListsReducer } from './todoListsReducer';
import { todoReducer } from './todoReducer';

const appReducer = combineReducers({
   todoLists : todoListsReducer,
   todos: todoReducer
});


const rootReducer = (state, action) => {  
    return appReducer(state, action)
 }

export default rootReducer;