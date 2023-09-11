// Import Node Modules
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Import Views
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import EditUser from './views/EditUser'
import EditQuestion from './views/EditQuestion'
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
import LoginType from "./types/Login";
// Import apiWrapper Functions
import { deleteUser } from "./lib/apiWrapper";

export default function App(){

  const navigate = useNavigate();
  const nav = (key:string): void => {
    key === '/logout' ? logUserOut(): 
    key === '/delete' ? handleDeleteUser():
    navigate(key)}

  // USER LOGIN ---------------------------------------------------------------------

  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') as string) > new Date()) || false );
  const [loggedInUser, setLoggedInUser] = useState<LoginType|null>(null)

  const logUserIn = (user:LoginType):void => {
    setIsLoggedIn(true);
    setLoggedInUser(user) // The culprit!
    console.log(user)
    flashMessage(`You are logged in`, 'success')
    navigate('/dashboard')
  }

  // USER LOG OUT ---------------------------------------------------------------------

  const logUserOut = (): void => {
    setIsLoggedIn(false);
    setLoggedInUser(    {    
      admin: null,
      created_on: '',
      email: '',
      first_name: '',
      last_name: '',
      modified_on: '',
      token: '',
      user_id: 1
      });
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    flashMessage('You have logged out', 'info');
  }

  // DELETE USER ---------------------------------------------------------------------

  const handleDeleteUser = async (): Promise<void> => {
    const token = localStorage.getItem('token') || ''
    let response = await deleteUser(token)
    if (response.error){
      flashMessage(response.error, 'error')
    } else {
      flashMessage('User Deleted', 'warning')
      logUserOut()
      navigate('/')
    }
  }

  // MENU COLLAPSING 
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
      <Navigation nav={nav} collapsed={collapsed} isLoggedIn={isLoggedIn}/>
      <Layout className="site-layout">
      {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}
        <Header handleCollapsed={handleCollapsed} collapsed={collapsed}/>
        <Routes>
          <Route path='/' element={<Home flashMessage={flashMessage} /> }></Route>
          <Route path='/login' element={<Login isLoggedIn={isLoggedIn} logUserIn={logUserIn} flashMessage={flashMessage} />}></Route>
          <Route path='/dashboard' element={<Dashboard flashMessage={flashMessage}/>}></Route>
          <Route path='/create' element={<Dashboard flashMessage={flashMessage}/>}></Route>
          <Route path='/info' element={<EditUser flashMessage={flashMessage}/>}></Route>
          <Route path='/question/:questionId' element={<EditQuestion flashMessage={flashMessage} />} />
        </Routes>
        <Footer />
      </Layout>
    </Layout>
  </>);
};