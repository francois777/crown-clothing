import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import App from './App';
import {UserProvider} from './contexts/user.context'
import {CategoriesProvider} from './contexts/categories.context'
import {CartProvider} from './contexts/cart.context'

import './index.scss';

const rootElement = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
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
