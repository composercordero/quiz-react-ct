// import node modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import types
import CategoryType from '../types/Category';
import UserType from '../types/User';
// import apiWrapper functions
import { editUser} from '../lib/apiWrapper'
// import elements
import {Form, Input, Layout, Typography, theme} from 'antd';

type editUserProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Register = ({flashMessage}: editUserProps) => {

  const {token: { colorBgContainer },} = theme.useToken();
  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
  };
  
  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, },
  };

  const [form] = Form.useForm();

const [userFormData, setUserFormData] = useState<Partial<UserType>>(
    {
        first_name: '', 
        last_name: '', 
        email: '', 
        password: '',
    }
);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  setUserFormData({...userFormData, [e.target.name]: e.target.value})
}

const handleFormSubmit = async (e:React.FormEvent):Promise<void> => {
    // e.preventDefault();
    const token = localStorage.getItem('token') || ''
    let response = await editUser(userFormData, token)
    if(response.error){
        flashMessage(response.error, 'error')
    }else{
        flashMessage('User successfully edited', 'info')
        navigate('/dashboard')  
    }
}

const { Title } = Typography;

// RETURN ---------------------------------------------------------------------

  return (<>
    <Layout style={{ padding: 20, margin:40, borderRadius:20, background: colorBgContainer }}>
    <Title style={{marginTop:0}}>Sign Up</Title>  
  <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={handleFormSubmit}
    style={{ maxWidth: 600 }}
    scrollToFirstError
  >

    {/* NAME */}

    <Form.Item
      label="First Name"
      tooltip="What do you want others to call you?"
      rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
    >
      <Input 
        name="first_name"
        onChange={handleInputChange} 
        placeholder={localStorage.getItem('first name')!} />
    </Form.Item>

    <Form.Item
      label="Last Name"
      tooltip="What do you want others to call you?"
      rules={[{ required: true, message: 'PleaseEditQ input your name!', whitespace: true }]}
    >
      <Input 
          name="last_name"
          onChange={handleInputChange} 
          placeholder={localStorage.getItem('last name')!}/>
    </Form.Item>

    {/* EMAIL */}

    <Form.Item name="email" label="E-mail" rules={[ { type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', }, ]}
    >
      <Input 
          name="email"
          onChange={handleInputChange} 
          placeholder={localStorage.getItem('email')!}/>
    </Form.Item>

  </Form>
    </Layout>
    </>)
}

export default Register

