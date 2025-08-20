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
    <div className="flex min-h-screen flex-col justify-start bg-gray-200 p-6">
      <h1 className="mb-6 self-center text-3xl font-bold underline">
        Employee
      </h1>
      <button className="mb-6 max-w-[130px] cursor-pointer self-end rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600">
        Add Employee
      </button>
      <div className="flex flex-wrap justify-center gap-4">
        {employees.map((e) => (
          <EmployeeCard key={e.id} employee={e} />
        ))}
      </div>
    </div>
  );
}

export default App;
