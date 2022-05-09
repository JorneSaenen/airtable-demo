import { employees } from '../utils/airtable';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Employees() {
  const [data, setData] = useState([]);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [stat, setStat] = useState('In dienst');
  const [job, setJob] = useState('Lesgever');
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [bla, setBla] = useState([]);

  const getData = async () => {
    console.log('Data Refreshed');
    const records = await employees.select({ view: 'Grid view' }).all();

    setData(
      records.map((record) => {
        return { id: record.id, firstName: record.fields.firstName, lastName: record.fields.lastName, status: record.fields.status, jobTitle: record.fields.jobTitle };
      })
    );

    // mogelijkheid 2
    setBla(
      records.map((record) => {
        return { id: record.id, fields: record.fields };
      })
    );
    setLoading(false);
  };

  const deleteRecord = async (id) => {
    await employees.destroy(id);
    setData(data.filter((record) => record.id !== id));
    getData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { firstName: first, lastName: last, status: stat, jobTitle: job };
    const createdRecord = await employees.create(newEmployee);
    setData([...data, { id: createdRecord.id, firstName: first, lastName: last, status: stat, jobTitle: job }]);
    setFirst('');
    setLast('');
    setStat('In dienst');
    setJob('Lesgever');
    console.log({ createdRecord });
    getData();
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  return (
    <div className='h-screen w-full flex items-center flex-col font-sans'>
      <h1 className='text-grey-900 text-3xl my-5 underline uppercase flex items-center gap-1'>
        <Link to='/'>
          <AiOutlineHome />
        </Link>{' '}
        Employees
      </h1>
      {loading && <h1>Loading...</h1>}
      <ul>
        {data.map((employee) => (
          <li key={employee.id}>
            <p>Voornaam: {employee.firstName}</p> <p>Achternaam: {employee.lastName}</p> <p>Status: {employee.status}</p> <p>Functie: {employee.jobTitle}</p>{' '}
            <button onClick={() => deleteRecord(employee.id)} className='bg-red-500 py-1 px-2 text-white text-sm my-2'>
              delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className='mt-5'>
        <input type='text' value={first} placeholder='Voornaam' onChange={(e) => setFirst(e.target.value)} />
        <input type='text' value={last} placeholder='Achternaam' onChange={(e) => setLast(e.target.value)} />
        <select onChange={(e) => setStat(e.target.value)}>
          <option value='In dienst'>In dienst</option>
          <option value='Uit dienst'>Uit dienst</option>
        </select>
        <select onChange={(e) => setJob(e.target.value)}>
          <option value='Lesgever'>Lesgever</option>
          <option value='Verkoper'>Verkoper</option>
        </select>
        <div className='text-center mt-1'>
          <button className='bg-green-500 py-2 px-4 text-white'>Opslaan</button>
        </div>
      </form>
    </div>
  );
}

export default Employees;
