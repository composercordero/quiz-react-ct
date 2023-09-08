import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

type headerProps = {
    handleCollapsed: ()=>void,
    collapsed: boolean,
}

const Header = ({handleCollapsed, collapsed}: headerProps) => {

  const { Header } = Layout;
  const {token: { colorBgContainer },} = theme.useToken();
  
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={handleCollapsed}
        style={{
            fontSize: '16px',
            width: 64,
            height: 64,
        }}
      />
    </Header>
  )
}

export default Header