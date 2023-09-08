import { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { getAllQuestions } from '../lib/apiWrapper';
import QuestionType from '../types/Question';

type questionsProps = {

}

const Questions = ({}:questionsProps) => {

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    async function fetchData(){
        const response = await getAllQuestions();
        if (response.data){
            setQuestions(response.data);
        }
    };
    fetchData();
  }, [])
  
  // const items: CollapseProps['items'] = []
  // questions.map( item => items.push(item['question'], 'children':item['answer']}) )
  
    return (
        
        <Collapse items={items} />
  )
}
export default Questions