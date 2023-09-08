import CategoryType from '../types/Category';
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Layout,
  theme
} from 'antd';

type registerProps = {
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Register = ({flashMessage}: registerProps) => {

  const {token: { colorBgContainer },} = theme.useToken();
  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (<>
    <Layout style={{ padding: 0, background: colorBgContainer }}>
      <Button type="text" style={{ fontSize: '16px', width: 64, height: 64, }} />

  <Form
    {...formItemLayout}
    form={form}
    name="register"
    onFinish={onFinish}
    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
    style={{ maxWidth: 600 }}
    scrollToFirstError
  >

    {/* NAME */}

    <Form.Item
      name="firstName"
      label="First Name"
      tooltip="What do you want others to call you?"
      rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="lasttName"
      label="Last Name"
      tooltip="What do you want others to call you?"
      rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
    >
      <Input />
    </Form.Item>

    {/* EMAIL */}

    <Form.Item name="email" label="E-mail" rules={[ { type: 'email', message: 'The input is not valid E-mail!', }, { required: true, message: 'Please input your E-mail!', }, ]}
    >
      <Input />
    </Form.Item>

    {/* PASSWORD */}

    <Form.Item name="password" label="Password" rules={[ { required: true, message: 'Please input your password!', }, ]} hasFeedback >
      <Input.Password />
    </Form.Item>

    <Form.Item name="confirm"
      label="Confirm Password"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
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

export default Register

