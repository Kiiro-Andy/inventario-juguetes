import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Edit from './componentes/Edit';
import Show from './componentes/Show';
import Create from './componentes/Create';
import Navbar from "./Navbar";
import Charts from './componentes/Charts';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Show /> }/>
          <Route path='/create' element={ <Create /> }/>
          <Route path='/edit/:id' element={ <Edit /> }/>
          <Route path='/charts' element={ <Charts /> }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
