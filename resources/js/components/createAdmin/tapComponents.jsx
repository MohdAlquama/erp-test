'use client';
import { useState, useMemo } from 'react';
import CreateUserPage from './CreateUserPage';
import { useSubAdmin } from "@/contexts/subContext";

const allTabs = [
  {
    id: 'home',
    label: 'Home',
    component: <CreateUserPage />,
    permission: 'SATapCollegeMGMT',
  },
  {
    id: 'about',
    label: 'About',
    component: <div>About section content</div>,
    permission: null, // no permission required
  },
  {
    id: 'contact',
    label: 'Contact',
    component: <div>Contact content</div>,
    permission: null,
  },
];

export default function TabComponent() {
  const { permissions } = useSubAdmin();

  // Filter tabs the user has access to
  const availableTabs = useMemo(() => {
    return allTabs.filter(
      (tab) => !tab.permission || permissions.includes(tab.permission)
    );
  }, [permissions]);

  const [activeTab, setActiveTab] = useState(availableTabs[0]?.id || null);

  const activeTabData = availableTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full">
      {availableTabs.length === 0 ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 font-medium">
          You do not have access to any sections.
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex space-x-4 border-b mb-4">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full bg-white p-4 shadow rounded-md">
            {activeTabData?.component}
          </div>
        </>
      )}
    </div>
  );
}
