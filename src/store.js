import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// Redux presist related
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = {};

const middleware = [thunk];

// redux-persists setup
const persistConfig = {
    key: 'root',
    storage,
    // stateReconciler: hardSet,
    autoMergeLevel2,
    whitelist: ['auth', 'cart', 'course'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer, // rootReducer, is used if persist is not used
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
