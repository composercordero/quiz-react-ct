import { Content } from "antd/es/layout/layout"
import { Layout, theme } from 'antd';
import Questions from "../components/Questions";
import CategoryType from "../types/Category";
import UserType from "../types/User";

type homeProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

function Home({flashMessage} : homeProps){

const {token: { colorBgContainer},} = theme.useToken();

  return (<>

    <Content
        style={{
        margin: 40,
        padding: 20,
        minHeight: 280,
        borderRadius:20,
        background: colorBgContainer,
        }}
    >

        <Questions />
    </Content>
    </>)
}
export default Home

