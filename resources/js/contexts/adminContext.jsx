import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePage } from '@inertiajs/react';
import axiosInstance from '@/utils/axiosInstance';

// 1. Create Context
const BaseContext = createContext(null);

// 2. Custom Hook
export const useBaseContext = () => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBaseContext must be used within a BaseProvider');
  }
  return context;
};

// 3. Provider
export const BaseProvider = ({ children }) => {
  const { props } = usePage();
  const pageAdmin = props?.admin || null;

  const [admin, setAdmin] = useState(pageAdmin);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 4. Sync admin from page props
  useEffect(() => {
    if (pageAdmin?.id && pageAdmin?.id !== admin?.id) {
      setAdmin(pageAdmin);
    }
  }, [pageAdmin]);

  // 5. Fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!admin?.id) {
        setPermissions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/admin/${admin.id}/permissions`);
        setPermissions(data.permissions || []);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [admin?.id]);

  // 6. Memoized context
  const contextValue = useMemo(
    () => ({
      admin,
      setAdmin,
      permissions,
      setPermissions,
      loading,
    }),
    [admin, permissions, loading]
  );

  // 7. Optional loading fallback
  // You can remove this if you want to handle loading in the component using the context
  if (loading) {
    return <div>Loading admin data...</div>;
  }

  return (
    <BaseContext.Provider value={contextValue}>
      {children}
    </BaseContext.Provider>
  );
};
