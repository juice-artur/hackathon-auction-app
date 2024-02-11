import './App.css'
import { Layout } from './pages/Layout';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {combineReducer} from "./services/store/store.ts";

const combinedStore = configureStore({reducer:combineReducer});

function App() {
  return (
    <>
      <Provider store={combinedStore}>
      <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const{element, ...rest} = route;
          return <Route key ={index} {...rest} element={element}/>
        })}
      </Routes>
    </Layout>
    </Provider>
    </>

  );
   
}

export default App
