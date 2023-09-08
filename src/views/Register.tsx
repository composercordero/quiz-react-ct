import { Button, Layout, theme } from 'antd';

type registerProps = {

}

const Register = ({}: registerProps) => {

  const {token: { colorBgContainer },} = theme.useToken();
  
  return (
    <Layout style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        style={{
            fontSize: '16px',
            width: 64,
            height: 64,
        }}
      />
    </Layout>
  )
}

export default Register