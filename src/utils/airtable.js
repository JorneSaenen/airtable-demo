import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE_ID);

export const employees = base.table('Employees');
export const todos = base.table('Todos');
