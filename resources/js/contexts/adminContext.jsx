import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import axiosInstance from '@/utils/axiosInstance';

// 1. Create context
const BaseContext = createContext(null);

// 2. Custom hook
export const useBaseContext = () => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBaseContext must be used within a BaseProvider');
  }
  return context;
};

// 3. Provider
export const BaseProvider = ({ children }) => {
  const page = usePage();
  const initialAdmin = page?.props?.admin || null;

  const [admin, setAdmin] = useState(initialAdmin);
  const [permissions, setPermissions] = useState([]);

  // 4. Fetch permissions when admin is available
  useEffect(() => {
    if (!admin?.id) return;

    const fetchPermissions = async () => {
      try {
        const { data } = await axiosInstance.get(`/admin/${admin.id}/permissions`);
        setPermissions(data.permissions || []);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [admin?.id]);

  // 5. Memoize context value
  const contextValue = useMemo(() => ({
    admin,
    setAdmin,
    permissions,
    setPermissions,
  }), [admin, permissions]);

  return (
    <BaseContext.Provider value={contextValue}>
      {children}
    </BaseContext.Provider>
  );
};
