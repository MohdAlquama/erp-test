import { Pencil, Trash2 } from 'lucide-react';

export default function UserTable({ users }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-3 border-b">Name</th>
            <th className="py-2 px-3 border-b">Email</th>
            <th className="py-2 px-3 border-b">Role</th>
            <th className="py-2 px-3 border-b">Permission</th>
            <th className="py-2 px-3 border-b">Status</th>
            <th className="py-2 px-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-3 border-b">{user.name}</td>
              <td className="py-2 px-3 border-b">{user.email}</td>
              <td className="py-2 px-3 border-b">{user.role}</td>
              <td className="py-2 px-3 border-b">{user.permission}</td>
              <td className="py-2 px-3 border-b">
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-2 px-3 border-b">
                <div className="flex items-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
