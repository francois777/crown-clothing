export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action)
  }
  console.log('[loggerMiddleware] - type: ', action.type);
  console.log('[loggerMiddleware] - payload: ', action.payload);
  console.log('[loggerMiddleware] - currentState: ', store.getState);

  next(action)

  console.log('[loggerMiddleware] - next state: ', store.getState);
}
