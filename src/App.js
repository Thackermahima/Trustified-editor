import './App.css';
import MiniDrawer from './sidebar/Drawer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const outerTheme = createTheme({
  palette: {
    mode: 'light',
  }
});


function App() {
  return (
    <ThemeProvider theme={outerTheme}>
      <MiniDrawer />
    </ThemeProvider>
  );
}

export default App;
