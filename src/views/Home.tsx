import { Content } from "antd/es/layout/layout"
import { Layout, theme } from 'antd';

type homeProps = {}

function Home(props: homeProps){

const {token: { colorBgContainer},} = theme.useToken();

  return (<>
    <Content
        style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        }}
    >
        Content
    </Content>
    </>)
}
export default Home

