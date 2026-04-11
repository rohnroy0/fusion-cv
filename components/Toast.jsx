'use client';
import { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const iconMap = {
    success: 'ri-checkbox-circle-fill',
    error: 'ri-error-warning-fill',
    info: 'ri-information-fill'
  };

  return (
    <div className={`toast ${type}`}>
      <i className={iconMap[type] || iconMap.info}></i>
      <span>{message}</span>
    </div>
  );
}
