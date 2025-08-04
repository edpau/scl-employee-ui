import { useEffect, useState } from 'react';
import type { Employee } from './types';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchData = async (): Promise<void> => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const url = useMock
      ? '/mock/staff/mock-employee.json'
      : `${baseURL}/employees`;

    try {
      const response = await fetch(url);
      const json: Employee[] = await response.json();
      if (!Array.isArray(json)) {
        throw new Error('API did not return an array');
      }
      setEmployees(json);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load employee data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Employee</h1>
      {employees.map((employee) => (
        // make card here
        <p key={employee.id}>{employee.firstName}</p>
      ))}
    </>
  );
}

export default App;
