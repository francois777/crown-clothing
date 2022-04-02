import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import reportWebVitals from './reportWebVitals';
import App from './App';
import { store, persistor } from './store/store'
import './index.scss';

const rootElement = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// THE BIGGER PICTURE:
//  Replace <App> with it's contents:
//     <BrowserRouter>
//         <Routes>
//             <Route path='/' element={ <Home /> } />
//        </Routes>
//    </BrowserRouter>
