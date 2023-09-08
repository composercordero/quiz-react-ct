import { useState } from "react";
import { Layout } from "antd";
import Navigation from "./components/global/Navigation";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from './components/global/Header'
import Footer from './components/global/Footer'
// Import Views
import Home from './views/Home'
import Register from './views/Home'


export default function App() {

  const navigate = useNavigate();

  const nav = (key:string): void => {
    navigate(key)
  }

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = (): void => {
    setCollapsed(!collapsed)
  }

  return (<>
    <Layout>
      <Navigation nav={nav} collapsed={collapsed} />
      <Layout>
        <Header handleCollapsed={handleCollapsed} collapsed={collapsed}/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
        <Footer />
      </Layout>
    </Layout>
  </>);
};