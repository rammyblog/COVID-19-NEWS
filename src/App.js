import React, { useEffect,useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { NewsProvider, newsContext } from './context/NewsContext';
import Cards from './components/Cards';
import Navbar from './components/containers/Navbar'
import {Container} from "react-bootstrap";
import {StatProvider} from "./context/StatsContext";


function App() {


  return (
    <NewsProvider>
    <StatProvider>

      <Navbar/>
      <Container>
        <Cards/>
      </Container>

    </StatProvider>
    </NewsProvider>

  );
}

export default App;
