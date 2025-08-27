import { useEffect, useState } from 'react';
import type { Employee } from './types';
import EmployeeCard from './components/EmployeeCard';
import AddEmployeeModal from './components/AddEmployeeModal';
import { Toaster } from 'react-hot-toast';

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

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <Toaster position="top-center" />
      <div className="container mx-auto flex flex-col items-center justify-start">
        <h1 className="mb-6 text-3xl font-bold underline">Employee</h1>
        <button
          onClick={() => setIsEmployeeModalOpen(true)}
          className="mb-6 max-w-[130px] cursor-pointer rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
        >
          Add Employee
        </button>
        <div className="flex flex-wrap justify-center gap-4">
          {employees.map((e) => (
            <EmployeeCard key={e.id} employee={e} />
          ))}
        </div>
      </div>

      <AddEmployeeModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setIsEmployeeModalOpen(false)}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
