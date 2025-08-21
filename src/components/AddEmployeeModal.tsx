import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddEmployeeModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 flex w-screen items-center justify-center bg-yellow-100/30 p-4 backdrop-blur-sm"
        aria-hidden="true"
      >
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Add Employees</DialogTitle>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="cursor-pointer rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
