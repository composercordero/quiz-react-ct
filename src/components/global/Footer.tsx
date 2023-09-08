import { Layout, theme } from "antd";

type footerProps = {

}

const Footer = (props: footerProps) => {

  const { Footer } = Layout;

  const {token: { colorBgContainer },} = theme.useToken();

  return (
    <Footer style={{ padding: 20, background: colorBgContainer }} >
      Created by Carlos Cordero
    </Footer>
  )
}

export default Footer