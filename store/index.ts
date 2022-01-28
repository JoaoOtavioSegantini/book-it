import { AnyAction, applyMiddleware, createStore, EmptyObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import reducers from './reducers'
import thunkMiddleware from 'redux-thunk'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const reducer = (
  state: EmptyObject | undefined,
  action: AnyAction
): EmptyObject => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    return nextState
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return reducers(state as any, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
