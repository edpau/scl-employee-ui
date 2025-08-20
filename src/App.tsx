import { useEffect, useState } from 'react';
import type { Employee } from './types';
import EmployeeCard from './components/EmployeeCard';

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
      <div className="flex flex-wrap gap-4">
        {employees.map((e) => (
          // make card here
          <EmployeeCard key={e.id} employee={e} />
        ))}
      </div>
    </>
  );
}

export default App;
