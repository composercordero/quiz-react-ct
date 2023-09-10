// Import Node Modules
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Import Views
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
// Import Components
import { Layout } from "antd";
import Navigation from "./components/global/Navigation";
// import  from "./components/global/Navigation2";
import AlertMessage from "./components/global/AlertMessage";
// Import Globals
import Header from './components/global/Header'
import Footer from './components/global/Footer'
// Import Types
import CategoryType from "./types/Category";
import UserType from "./types/User";
// Import apiWrapper Functions



export default function App(){

  const navigate = useNavigate();
  const nav = (key:string): void => {key === '/logout' ? logUserOut():navigate(key)}

  // USER LOGIN ---------------------------------------------------------------------

  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false );
  const [loggedInUser, setLoggedInUser] = useState<string|undefined>(undefined)

  const logUserIn = (user:string|undefined):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user)
    flashMessage(`You are logged in`, 'success')
    navigate('/dashboard')
  }

  // USER LOG OUT ---------------------------------------------------------------------

  const logUserOut = (): void => {
    setIsLoggedIn(false);
    setLoggedInUser(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    flashMessage('You have logged out', 'info');
  }

  // MENU COLLAPSING ---------------------------------------------------------------------
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = (): void => {
    setCollapsed(!collapsed)
  }
  // ALERTS ---------------------------------------------------------------------
  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
    setMessage(newMessage);
    setCategory(newCategory);
  }

  // MENU COLLAPSING ---------------------------------------------------------------------

  return (<>
    <Layout >
      <Navigation nav={nav} collapsed={collapsed} isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
      <Layout className="site-layout">
      {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}
        <Header handleCollapsed={handleCollapsed} collapsed={collapsed}/>
        <Routes>
          <Route path='/' element={<Home flashMessage={flashMessage} /> }></Route>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage} />}></Route>
          <Route path='/dashboard' element={<Dashboard flashMessage={flashMessage}/>}></Route>
        </Routes>
        <Footer />
      </Layout>
    </Layout>
  </>);
};