// import node modules
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import types
import CategoryType from '../types/Category';
import UserType from '../types/User';
// import apiWrapper functions
import { login } from '../lib/apiWrapper'
// import elements
import {Form, Input, Button, Layout, Typography, theme} from 'antd';
import LoginType from '../types/Login';

type LoginProps = {
  isLoggedIn: boolean
  logUserIn:(user:string|undefined) => void
  flashMessage: (message:string|null, category: CategoryType|null) => void,
}

export default function Login({ isLoggedIn, logUserIn, flashMessage}: LoginProps) {

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
		  password: '',
	  }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
	  // console.log(e.target)
	setUserFormData({...userFormData, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async (e:React.FormEvent):Promise<void> => {
	  // e.preventDefault();
	  let response = await login(userFormData.email!, userFormData.password!)
	  const currentUser = response.data
	  if(response.error){
		  flashMessage(response.error, 'error')
	  }else{
		localStorage.setItem('token', response.data?.token as string);
		const token = response.data?.token
		logUserIn(token);
		navigate('/');
	  }
  }

  const { Title } = Typography;

  // RETURN ---------------------------------------------------------------------

	return (<>
	  <Layout style={{ padding: 20, margin:40, borderRadius:20, background: colorBgContainer }}>
	  <Title style={{marginTop:0}}>Login</Title>
	<Form
	  {...formItemLayout}
	  form={form}
	  name="login"
	  onFinish={handleFormSubmit}
	  style={{ maxWidth: 600 }}
	  scrollToFirstError
	>

	  {/* EMAIL */}

	  <Form.Item
	  name="email"
	  label="E-mail"
	  rules={[ { type: 'email', message: 'The input is not valid E-mail!', },
	  { required: true, message: 'Please input your E-mail!', }, ]}
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
		  Register
		</Button>
	  </Form.Item>
	</Form>

	  </Layout>
	  </>)
  }

