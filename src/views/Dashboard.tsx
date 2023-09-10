import { Content } from "antd/es/layout/layout"
import { useState } from "react";
import {Form, Input, Button, Typography, theme} from 'antd';
import Questions from "../components/Questions";
import CategoryType from "../types/Category";
import QuestionType from "../types/Question";
import { createQuestion } from "../lib/apiWrapper";

type dashboardProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

function Home({flashMessage} : dashboardProps){

const {token: { colorBgContainer},} = theme.useToken();
const { Title } = Typography;
const [form] = Form.useForm();

const [userQuestionData, setUserQuestionData] = useState<Partial<QuestionType>>(
    {
            question: '',
            answer:'',
    }
);

const formItemLayout = {
	labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
	wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
  };

  const tailFormItemLayout = {
	wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
	setUserQuestionData({...userQuestionData, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async (e:React.FormEvent):Promise<void> => {
	//   e.preventDefault();
    const token = localStorage.getItem('token') || ''
    const response = await createQuestion(token);
	  if(response.error){
		  flashMessage(response.error!, 'error')
	  }else{
        flashMessage('You\'ve create a new question!', 'success')
	  }
  }

  // RETURN ---------------------------------------------------------------------

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

<Title style={{marginTop:0}}>Create a Question</Title>
	<Form
	  {...formItemLayout}
	  form={form}
	  name="login"
	  onFinish={handleFormSubmit}
	  style={{ maxWidth: 600 }}
	  scrollToFirstError
	>

    <Form.Item
      label="Question"
      tooltip="What is tour question?"
      rules={[{ required: true, message: 'Please input your question!', whitespace: true }]}
    >
      <Input 
        name="question"
        onChange={handleInputChange} 
        value={userQuestionData.question} />
    </Form.Item>

    <Form.Item
      label="Answer"
      tooltip="What's the answer to your question?"
      rules={[{ required: true, message: 'Please input the answer!', whitespace: true }]}
    >
      <Input 
          name="answer"
          onChange={handleInputChange} 
          value={userQuestionData.answer}/>
    </Form.Item>

	  <Form.Item {...tailFormItemLayout}>
		<Button type="primary" htmlType="submit">
		  Submit Question
		</Button>
	  </Form.Item>
	</Form>

    <Questions />
    </Content>
    </>)
}
export default Home

