import { Link } from 'react-router-dom';

function Home() {
  const links = 'border-2 py-2 px-4 border-blue-700 uppercase hover:bg-blue-700 hover:text-white';
  return (
    <div className='max-w-[90%] w-[1200px] mx-auto text-center'>
      <h1 className='text-3xl text-blue-700 uppercase mt-5 mb-7 underline underline-offset-2'>Airtables - demo</h1>
      <div>
        <div>
          <Link to='/employees' className={links}>
            employees
          </Link>
        </div>
        <br />
        <div>
          <Link to='/todos' className={links}>
            todos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
