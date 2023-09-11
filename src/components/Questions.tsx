import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { getAllQuestions, getUserQuestions } from '../lib/apiWrapper';
import QuestionType from '../types/Question';
import { Space, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

type questionsProps = {
}

const Questions = ({ }:questionsProps) => {

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData(){
        const response = await getAllQuestions();
        if (response.data){
            setQuestions(response.data);
        }
    };
    fetchData();
  }, [])

  const userQuestions = (): void => {
      async function fetchData(){
          const token = localStorage.getItem('token') || ''
          console.log(token)
          const response = await getUserQuestions(token);
          console.log(response.data)
          if (response.data){
              setQuestions(response.data);
          }
      };
      fetchData();
    }

    const allQuestions = (): void => {
      async function fetchData(){
          const response = await getAllQuestions();
          if (response.data){
              setQuestions(response.data);
          }
      };
      fetchData();
    }

    const genExtra = () => (
      <SettingOutlined
        onClick={(event) => {
          console.log('edit')
        }}
      />
    );

  const items: CollapseProps['items'] = [];

  questions.forEach((q) => items.push({'label':q.question, 'children':q.answer, 'extra': genExtra() }))
  
  return (<>
        <Space>
          <Button type="primary" onClick={userQuestions}>Show Only My Questions</Button>
          <Button type="primary" onClick={allQuestions}>Show All Questions</Button>
          <Button type="primary" onClick={() => {navigate('/question/167')}}>Edit Question 167</Button>
        </Space>
        <Collapse items={items} />
        </>)
      }
      export default Questions