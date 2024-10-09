import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import BidGeniusAppRoutes from './AppRoutes/BidGeniusAppRoutes';

function App() {
  return (

    <BrowserRouter>
      <BidGeniusAppRoutes/>
    </BrowserRouter>

  );
}

export default App;
