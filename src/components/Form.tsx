import { useState } from 'react';

interface Props {
  addTodo: (text: string) => Promise<void>;
}

const Form = ({ addTodo }: Props) => {
  const [text, setText] = useState('');
  return (
    <form
      className='flex mt-4'
      onSubmit={(e) => {
        e.preventDefault();
        addTodo(text);
        setText('');
      }}
    >
      <input
        type='text'
        placeholder='Add Todo'
        className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-800'
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className='flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500'>Add</button>
    </form>
  );
};

export default Form;
