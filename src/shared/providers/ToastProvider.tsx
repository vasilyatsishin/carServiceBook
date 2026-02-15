import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import Toast from '../components/Toast/Toast';

// 1. Описуємо тип самого повідомлення
export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

// 2. Описуємо тип функції, яку ми будемо експортувати через контекст
type AddToastFn = (message: string, type?: ToastType) => void;

// 3. Створюємо контекст з початковим значенням undefined
const ToastContext = createContext<AddToastFn | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{
        position: "fixed",
        bottom: 50,
        right: 20,
        transition: "1s right ease-in-out"
      }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => removeToast(toast.id)} 
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// 4. Безпечний хук з перевіркою на Provider
export const useToast = (): AddToastFn => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};