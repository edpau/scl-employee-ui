import { toast } from 'react-hot-toast';

export const toastSuccess = (message: string) =>
  toast.success(message, {
    style: {
      border: '1px solid #4ade80',
      padding: '16px',
      color: '#166534',
    },
    iconTheme: {
      primary: '#4ade80',
      secondary: '#dcfce7',
    },
  });

export const toastError = (message: string) =>
  toast.error(message, {
    style: {
      border: '1px solid #f87171',
      padding: '16px',
      color: '#7f1d1d',
    },
    iconTheme: {
      primary: '#f87171',
      secondary: '#fee2e2',
    },
  });
