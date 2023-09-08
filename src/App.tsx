// Import Node Modules
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Import Views
import Home from './views/Home'
import Register from './views/Register'
// Import Components
import { Layout } from "antd";
import Navigation from "./components/global/Navigation";
import Navigation2 from "./components/global/Navigation2";
import AlertMessage from "./components/global/AlertMessage";
// Import Globals
import Header from './components/global/Header'
import Footer from './components/global/Footer'
// Import Types
import CategoryType from "./types/Category";
// Import apiWrapper Functions
import { getMe } from './lib/apiWrapper';


export default function App() {

  const navigate = useNavigate();
  const nav = (key:string): void => {navigate(key)}

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = (): void => {
    setCollapsed(!collapsed)
  }

  const [message, setMessage] = useState<string|null>(null);
  const [category, setCategory] = useState<CategoryType|null>(null);

  const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
    setMessage(newMessage);
    setCategory(newCategory);
  }

  return (<>
    <Layout>
      {message && <AlertMessage category={category!} message={message} flashMessage={flashMessage}/>}
      <Navigation nav={nav} collapsed={collapsed} />
      <Layout>
        <Header handleCollapsed={handleCollapsed} collapsed={collapsed}/>
        <Routes>
          <Route path='/' element={<Home flashMessage={flashMessage}/> }></Route>
          <Route path='/register' element={<Register flashMessage={flashMessage}/>}></Route>
          <Route path='/about' element={<div>about</div>}></Route>
        </Routes>
        <Footer />
      </Layout>
    </Layout>
  </>);
};