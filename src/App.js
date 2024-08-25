import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

import { Header, Footer } from "./components";
import { Admin, Home, Contact, Login, Register, OrderHistory, Cart, Reset } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/contact' element={ <Contact /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/reset' element={ <Reset /> } />
            <Route path='/admin' element={ <Admin /> } />
            <Route path='/orderhistory' element={ <OrderHistory /> } />
            <Route path='/cart' element={ <Cart /> } />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;