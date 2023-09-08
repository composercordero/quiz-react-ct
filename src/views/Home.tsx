import { Content } from "antd/es/layout/layout"
import { Layout, theme } from 'antd';
import Questions from "../components/Questions";
import CategoryType from "../types/Category";

type homeProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

function Home({flashMessage}: homeProps){

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
        <Questions />
    </Content>
    </>)
}
export default Home

