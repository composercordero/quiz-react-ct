import {
  HeartOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

type navigationProps ={
    nav: (key:string)=>void,
    collapsed: boolean,
}

export default function Navigation({nav, collapsed}:navigationProps) {

    const {Sider} = Layout;

    return(<>
            <Sider 
                style={{overflow: 'auto',height: '100vh',}}
                trigger={null} 
                collapsible 
                collapsed={collapsed}>
        
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                    { key: '/', icon: <HomeOutlined />, label: 'Home', },
                    { key: '/about', icon: <HeartOutlined />, label: 'About', },
                    { key: '/register', icon: <InfoCircleOutlined />, label: 'Register', },
                    { key: '/login', icon: <InfoCircleOutlined />, label: 'Login', },
                    { key: '/contact', icon: <MailOutlined />, label: 'Contact', },
                    ]}
                    onClick = {({key}) => {nav(key)}}
                />
            </Sider>
    </>)
}