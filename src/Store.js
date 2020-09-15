// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import createSagaMiddleware from 'redux-saga';
// import reducer from './Reducers';
// import rootSaga from './Sagas';
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//     reducer,
//     applyMiddleware(
//     sagaMiddleware,
//     createLogger(),
//   ),
// );
// // Middleware: Redux Saga
// sagaMiddleware.run(rootSaga);
// export { store }

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './Reducers';
import rootSaga from './Sagas';

const logger = createLogger({
  collapsed: true,
});

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const getMiddleware = () => {
    if (process.env.NODE_ENV === 'development') {
      return applyMiddleware(sagaMiddleware, logger);
    }
    return applyMiddleware(sagaMiddleware);
  };

  const store = createStore(
    reducer,
    initialState,
    getMiddleware(),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}