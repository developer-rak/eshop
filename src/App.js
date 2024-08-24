import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

import { Header, Footer } from "./components";
import { Home, Admin, Cart, Contact, OrderHistory } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/admin' element={ <Admin /> } />
            <Route path='/contact' element={ <Contact /> } />
            <Route path='/cart' element={ <Cart /> } />
            <Route path='/orderhistory' element={ <OrderHistory /> } />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;