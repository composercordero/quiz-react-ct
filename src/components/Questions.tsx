import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';


type questionsProps = {}
const Questions = ({}:questionsProps) => {
    const items: CollapseProps['items'] = [
        {
          key: '1',
          label: 'What is bright orange with green on top and sounds like a parrot?',
          children: <p>A Parrot.</p>,
        },
        {
          key: '2',
          label: 'What can you keep after giving to someone?',
          children: <p>A promise.</p>,
        },
        {
          key: '3',
          label: 'Name a 3rd Party Package that helps with API Calls?',
          children: <p>Axios.</p>,
        },
      ];
  
    return (
        
        
        <Collapse items={items} defaultActiveKey={['1']} />
  )
}
export default Questions