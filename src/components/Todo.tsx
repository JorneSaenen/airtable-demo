import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';

interface Props {
  todo: any;
  deleteTodo: (id: string) => Promise<void>;
  setCompleted: (id: string, completed: boolean) => Promise<void>;
}

const Todo = ({ todo, deleteTodo, setCompleted }: Props) => {
  return (
    <div className='flex mb-4 items-center'>
      <p className={`w-full text-grey-darkest ${todo.fields.completed ? 'line-through' : ''}`}>{todo.fields.text}</p>
      <CopyToClipboard text={todo.fields.text}>
        <button className='flex-no-shrink p-2 ml-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500'>
          <BiCopy className='text-2xl' />
        </button>
      </CopyToClipboard>
      <button
        className='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500'
        onClick={() => setCompleted(todo.id, todo.fields.completed)}
      >
        {todo.fields.completed ? 'Undo' : 'Done'}
      </button>
      <button className='flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500' onClick={() => deleteTodo(todo.id)}>
        Remove
      </button>
    </div>
  );
};

export default Todo;
