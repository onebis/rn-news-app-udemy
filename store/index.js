import { combineReducers, createStore } from 'redux';
import userReducer from './reducers/user';
import { persistReducer, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const rootReducer = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['user'],
};

const persitedRucer = persistReducer(persistConfig, rootReducer);

const store = createStore(persitedRucer);
export const persistor = persistStore(store);
export default store;
