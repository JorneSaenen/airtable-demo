import { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import Form from '../components/Form';
import { todos } from '../utils/airtable';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Todos = () => {
  const [todosState, setTodosState] = useState([]);

  const getTodos = async () => {
    console.log('Data refreshed');
    const records = await todos.select({ view: 'Grid view' }).all();
    setTodosState(
      records.map((record) => {
        if (!record.fields.completed) {
          // TODO: add types
          // @ts-ignore
          record = { ...record, fields: { ...record.fields, completed: false } };
        }
        return { id: record.id, fields: record.fields };
      })
    );
  };

  const addTodo = async (text: string) => {
    const record = await todos.create([
      {
        fields: {
          text: text,
          completed: false,
        },
      },
    ]);
    setTodosState([...todosState, { id: record[0].id, fields: record[0].fields }]);
    console.log('Todo added', record);
    getTodos();
  };

  const deleteTodo = async (id: string) => {
    await todos.destroy(id);
    setTodosState(todosState.filter((todo) => todo.id !== id));
    getTodos();
  };

  const setCompleted = async (id: string, completed: boolean) => {
    await todos.update(id, { completed: !completed });
    setTodosState(todosState.map((todo) => (todo.id === id ? { ...todo, fields: { ...todo.fields, completed: !completed } } : todo)));
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='h-screen w-full flex  justify-center bg-white font-sans'>
      <div className='bg-white rounded shadow-lg p-6 m-4 w-full lg:w-3/4 lg:max-w-lg h-fit'>
        <div className='mb-4'>
          <h1 className='text-grey-900 text-2xl uppercase flex items-center gap-1'>
            <Link to='/'>
              <AiOutlineHome />
            </Link>
            Todo List ( #Todos: {todosState.length})
          </h1>

          <Form addTodo={addTodo} />
        </div>
        {todosState.length === 0 && <h2 className='text-grey-900'>No todos</h2>}
        {todosState.map((todo) => (
          <Todo key={todo.id} todo={todo} setCompleted={setCompleted} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
