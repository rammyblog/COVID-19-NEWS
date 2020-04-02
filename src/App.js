import React from 'react';
import './App.css';
import { NewsProvider } from './context/NewsContext';
import Navbar from './components/containers/Navbar';
import {Container} from "react-bootstrap";
import {StatProvider} from "./context/StatsContext";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter as Router} from "react-router-dom";
import BaseRoute from "./routes";
import Footer from "./components/containers/Footer";

function App() {
  const theme = createMuiTheme({
  typography: {
    fontFamily: [
        'Sen',
      'sans-serif'

    ].join(','),
  },
});
  return (
      <Router>
    <NewsProvider>
    <StatProvider>
      <ThemeProvider theme={theme}>
      <Navbar/>
      <Container>
          <BaseRoute/>
      </Container>
        <Footer/>
      </ThemeProvider>
    </StatProvider>
    </NewsProvider>
  </Router>

  );
}

export default App;
