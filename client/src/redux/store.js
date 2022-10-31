import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { todosReducers } from './reducers/todosReducer';
import { tabReducer } from './reducers/tabReducer';
import { authReducer} from './reducers/user';

const reducer = combineReducers({
    todos: todosReducers,
    currentTab: tabReducer,
    auth: authReducer
})


const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;