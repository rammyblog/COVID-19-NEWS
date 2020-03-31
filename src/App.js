import React from 'react';
import './App.css';
import { NewsProvider } from './context/NewsContext';
import Cards from './components/Cards';
import Navbar from './components/containers/Navbar';
import StatsRow from './components/StatsRow';
import {Container} from "react-bootstrap";
import {StatProvider} from "./context/StatsContext";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


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
    <NewsProvider>
    <StatProvider>
      <ThemeProvider theme={theme}>
      <Navbar/>
      <Container>
        <div className='center-block'>
          <StatsRow/>
          <Cards/>
        </div>
      </Container>
      </ThemeProvider>
    </StatProvider>
    </NewsProvider>

  );
}

export default App;
