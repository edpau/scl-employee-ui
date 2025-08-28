import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddEmployeeSchema } from '../types';
import type { AddEmployeeFormData } from '../types';
import { toastSuccess, toastError } from '../toastConfig';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  fetchData: () => void;
};

export default function AddEmployeeModal({
  isOpen,
  onClose,
  fetchData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddEmployeeFormData>({
    resolver: zodResolver(AddEmployeeSchema),
  });

  const onSubmit = async (data: AddEmployeeFormData) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseURL}/employees`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        toastError(error.message || 'Failed to create employee.');
        return;
      }
      toastSuccess('Employee added successfully!');
      reset();
      fetchData();
      onClose();
    } catch (err) {
      console.error('Unexpected error:', err);
      toastError('Something went wrong. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 flex w-screen items-center justify-center bg-yellow-100/30 p-4 backdrop-blur-sm"
        aria-hidden="true"
      >
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Add Employees</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('firstName')}
                className="w-full rounded border p-2"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('lastName')}
                className="w-full rounded border p-2"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('email')}
                className="w-full rounded border p-2"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                {...register('mobileNumber')}
                className="w-full rounded border p-2"
                placeholder="Mobile Number"
              />
              {errors.mobileNumber && (
                <p className="text-sm text-red-500">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register('address')}
                className="w-full rounded border p-2"
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
