export type ActionWithPayload<T, P> = {
  type: T;
  payoad: P;
}

export type Action<T> = {
  type: T;
}

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>

export function createAction<T extends string>(type: T, payload: void): Action<T>

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload}
}

//export const createAction = (type, payload):ActionWithPayload  => ({ type, payload });
// import { anyActionType } from 'redux'
