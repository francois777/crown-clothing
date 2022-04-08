import { compose, createStore, applyMiddleware, Middleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
// import { loggerMiddleware } from './middleware/logger'

// We use `storage` to access local storage
import storage from 'redux-persist/lib/storage'

// Replace Thunks by Sagas
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOL_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

// We can either blacklist or whitelist some reducer values
const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}
const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Middlewares are library helpers that happen before an action hits the reducer
// So, when you dispatch an action, it hits the middlewares first
// NB: Only perform logging in Development; not Production
const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancer = (
  process.env.NODE_ENV !== 'production'
  && window && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__
) || compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
)
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
