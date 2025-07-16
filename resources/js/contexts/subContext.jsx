import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';

const SubAdminContext = createContext();

export const useSubAdmin = () => useContext(SubAdminContext);

export const SubContext = ({ children }) => {
  const { auth } = usePage().props;
  const subadmin = auth?.subadmin;

  const [permissions, setPermissions] = useState([]);

  // Fetch dynamic permissions on mount or when subadmin.id changes
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!subadmin?.id) return;

      try {
        const response = await axiosInstance.get(`subadmin/${subadmin.id}/permissions`);
        const perms = response.data.permissions;

        // Normalize format
        if (Array.isArray(perms)) {
          setPermissions(perms);
        } else if (typeof perms === 'string') {
          setPermissions(perms.split('.').filter(Boolean));
        } else if (typeof perms === 'object' && perms !== null) {
          setPermissions(Object.values(perms));
        }
      } catch (error) {
        console.error("Failed to fetch subadmin permissions:", error);
        setPermissions([]);
      }
    };

    fetchPermissions();
  }, [subadmin?.id]);

  const value = useMemo(() => ({ subadmin, permissions }), [subadmin, permissions]);

  return (
    <SubAdminContext.Provider value={value}>
      {children}
    </SubAdminContext.Provider>
  );
};
