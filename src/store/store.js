import { compose, createStore, applyMiddleware } from 'redux'
//import logger from 'redux-logger'
import { rootReducer } from './root-reducer'

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }

  next(action)
}


// Middlewares are library helpers that happen before an action hits the reducer
// So, when you dispatch an action, it hits the middlewares first
// const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
//   Boolean
// );
const middleWares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)
