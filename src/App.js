import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Admin from './pages/admin/Admin';
import Cart from './pages/cart/Cart';
import Contact from './pages/contact/Contact';
import Home from './pages/home/Home';
import OrderHistory from './pages/orderHistory/OrderHistory';

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