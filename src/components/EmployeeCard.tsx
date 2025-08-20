import type { Employee } from '../types';

type Props = {
  employee: Employee;
};

function EmployeeCard({ employee }: Props) {
  return (
    <div className="max-w-xs rounded border border-black p-4 shadow transition-shadow hover:shadow-md">
      <h2 className="text-lg font-semibold">
        Name: {employee.firstName} {employee.lastName}
      </h2>
      <p className="text-sm">Email: {employee.email}</p>
      {employee.mobileNumber && (
        <p className="text-sm">Mobile: {employee.mobileNumber}</p>
      )}
      <p className="text-sm">Address: {employee.address}</p>
      <div className="mt-4 flex gap-2">
        <button className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600">
          Delete
        </button>
        <button className="cursor-pointer rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600">
          Edit
        </button>
        <button className="cursor-pointer rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
          Show Contract
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
