// 'use client'

// import {
//   LayoutDashboard,
//   FileText,
//   UserCircle2,
//   LogOut,
//   X,
// } from 'lucide-react'
// import { useState } from 'react'
// import { Link, usePage } from '@inertiajs/react'
// import clsx from 'clsx'
// import { useSubAdmin } from "@/contexts/subContext";

// const navItems = [
//   { name: 'Dashboard', href: '/subadmin/dashboard', icon: LayoutDashboard },
//   { name: 'My Profile', href: '/subadmin/profile', icon: UserCircle2 },
//   { name: 'My Reports', href: '/subadmin/reports', icon: FileText },
// ]

// export default function SubAdminSidebar({ isOpen, toggleSidebar }) {
//   const { url } = usePage()
//    const { subadmin, permissions } = useSubAdmin();
//   const pathname = url

//   return (
//     <aside
//       className={clsx(
//         'fixed top-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 h-full shadow-lg transition-transform duration-300',
//         isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//       )}
//     >
//       <div className="flex items-center justify-between px-4 py-4 bg-teal-600 text-white">
//         <h2 className="font-bold text-lg">Sub Admin</h2>
//         <button onClick={toggleSidebar} className="md:hidden">
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <nav className="flex flex-col mt-4 space-y-1 px-4">
//         {navItems.map((item) => {
//           const isActive = pathname === item.href
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={clsx(
//                 'flex items-center gap-3 px-4 py-2 rounded-md font-medium',
//                 isActive
//                   ? 'bg-teal-500 text-white'
//                   : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
//               )}
//             >
//               <item.icon className="w-5 h-5" />
//               {item.name}
//             </Link>
//           )
//         })}
//       </nav>

//       <div className="mt-auto px-4 py-4">
//         <button
//           onClick={() => alert('Logout')}
//           className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-md w-full"
//         >
//           <LogOut className="w-5 h-5" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   )
// }
import {
  LayoutDashboard,
  FileText,
  UserCircle2,
  LogOut,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { useSubAdmin } from "@/contexts/subContext";

const baseNavItems = [
  { name: 'Dashboard', href: '/subadmin/dashboard', icon: LayoutDashboard, permission: 'userDashboard' },
  { name: 'My Profile', href: '/subadmin/profile', icon: UserCircle2, permission: 'userProfile' },
  { name: 'My Reports', href: '/subadmin/reports', icon: FileText, permission: 'reportView' },
];

export default function SubAdminSidebar({ isOpen, toggleSidebar }) {
  const { url } = usePage();
  const { subadmin, permissions } = useSubAdmin();
  const pathname = url;

  // Filter nav items by permissions
  const filteredNavItems = baseNavItems.filter(
    item => !item.permission || permissions.includes(item.permission)
  );

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 h-full shadow-lg transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      <div className="flex items-center justify-between px-4 py-4 bg-teal-600 text-white">
        <h2 className="font-bold text-lg">Sub Admin</h2>
        <button onClick={toggleSidebar} className="md:hidden">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col mt-4 space-y-1 px-4">
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-2 rounded-md font-medium',
                isActive
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4">
        <button
          onClick={() => alert('Logout')}
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 p-2 rounded-md w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
