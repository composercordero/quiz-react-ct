// import Node Modules
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Ant D elements
import {Form, Input, Button, Typography, theme}  from 'antd';
import { Content } from "antd/es/layout/layout"
// import types
import QuestionType from '../types/Question';
import CategoryType from '../types/Category';
// import apiWrapper Functions
import { getQuestionById, editQuestionById, deleteQuestionById } from '../lib/apiWrapper'

type EditQuestionProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function EditQuestion({ flashMessage }:EditQuestionProps){
    
    const {token: { colorBgContainer},} = theme.useToken();
    const [form] = Form.useForm();
    const { questionId } = useParams();
    const { Title } = Typography;
    const navigate = useNavigate();


    const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
      };
    
      const tailFormItemLayout = {
        wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, },
      };    

    const [questionToEdit, setQuestionToEdit] = useState<QuestionType|null>(null)

    useEffect(()=>{
        async function getQuestion(){
            let response = await getQuestionById(questionId!);
            if(response.error){
                flashMessage(response.error, 'error');
                navigate('/dashboard')
            } else{
                setQuestionToEdit(response.data!);
            }
        }
        getQuestion();
    }, [flashMessage, navigate, questionId])

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToEdit({...questionToEdit, [e.target.name]: e.target.value} as QuestionType)
    }

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editQuestionById(token, questionId!,questionToEdit!);
        if (response.error){
            flashMessage(response.error, 'error')
        } else {
            flashMessage(`Your question has been updated`, 'success')
            console.log('click')
            navigate('/')
        }
    }

    const handleDeleteQuestion = async() => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteQuestionById(token, questionId!);
        if(response.error){
            flashMessage(response.error, 'error')
        } else {
            flashMessage('You\'ve deleted the question', 'error');
            navigate('/')
        }
    }

    return (
        <>
  <Content
        style={{
        margin: 40,
        padding: 20,
        minHeight: 280,
        borderRadius:20,
        background: colorBgContainer,
        }}
    >

<Title style={{marginTop:0}}>Edit Question</Title>
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
        value={questionToEdit?.question} />
    </Form.Item>

    <Form.Item
      label="Answer"
      tooltip="What's the answer to your question?"
      rules={[{ required: true, message: 'Please input the answer!', whitespace: true }]}
    >
      <Input 
          name="answer"
          onChange={handleInputChange} 
          value={questionToEdit?.answer}/>
    </Form.Item>

	  <Form.Item {...tailFormItemLayout}>
		<Button type="primary" htmlType="submit">
		  Submit Edits
		</Button>
	  </Form.Item>
	</Form>

    <Button type='primary' danger onClick={handleDeleteQuestion}>Delete Question</Button>

    </Content>
        </>
    )
}