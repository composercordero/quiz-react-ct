import { Alert, Space } from 'antd';
import CategoryType from '../../types/Category';

type alertProps = {
    category: CategoryType,
    message: string|null,
    flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const AlertMessage = ({ message, category, flashMessage}: alertProps) => {
  return (<>
    <Space direction="vertical" style={{ width: '100%' }}>
        <Alert type={category} message={message} banner closable/>
    </Space>
    </>);
}

export default AlertMessage