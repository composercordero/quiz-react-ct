// import node modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import types
import CategoryType from '../types/Category';
import UserType from '../types/User';
// import apiWrapper functions
import { register} from '../lib/apiWrapper'
// import elements
import {Form, Input, Button, Layout, Typography, theme} from 'antd';

type registerProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Register = ({flashMessage}: registerProps) => {

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
    // console.log(e.target)
  setUserFormData({...userFormData, [e.target.name]: e.target.value})
}

const handleFormSubmit = async (e:React.FormEvent):Promise<void> => {
    // e.preventDefault();
    let response = await register(userFormData)
    if(response.error){
        flashMessage(response.error, 'error')
    }else{
        flashMessage('User Created', 'success')
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
        value={userFormData.first_name} />
    </Form.Item>

    <Form.Item
      label="Last Name"
      tooltip="What do you want others to call you?"
      rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
    >
      <Input 
          name="last_name"
          onChange={handleInputChange} 
          value={userFormData.last_name}/>
    </Form.Item>

    {/* EMAIL */}

    <Form.Item name="email" label="E-mail" rules={[ { type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', }, ]}
    >
      <Input 
          name="email"
          onChange={handleInputChange} 
          value={userFormData.email}/>
    </Form.Item>

    {/* PASSWORD */}

    <Form.Item name="password" label="Password" rules={[ { required: true, message: 'Please input your password!', }, ]} hasFeedback >
      <Input.Password 
          name="password"
          onChange={handleInputChange} 
          value={userFormData.password}/>
    </Form.Item>

    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        Register!
      </Button>
    </Form.Item>
  </Form>

    </Layout>
    </>)
}

export default Register

