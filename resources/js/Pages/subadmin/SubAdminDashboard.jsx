import { useSubAdmin } from "@/contexts/subContext";

export default function SubAdminDashboard() {
  const { subadmin, permissions } = useSubAdmin();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sub Admin Dashboard</h1>
      <p>This is where Sub Admin manages their tasks.</p>

      <div className="mt-4">
        {permissions.includes('dashboardView') ? (
          <h2 className="text-xl font-semibold">Welcome, {subadmin?.name}!</h2>
        ) : (
          <p className="text-red-600 font-medium">
            Name hidden: 'dashboardView' permission required.
          </p>
        )}

        <p><strong>Email:</strong> {subadmin?.email ?? 'N/A'}</p>
        <p><strong>ID:</strong> {subadmin?.id ?? 'N/A'}</p>
        <p><strong>Roles:</strong> {Array.isArray(subadmin?.roles) ? subadmin.roles.join(', ') : 'N/A'}</p>

        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Your Profile:</h3>
          <p><strong>Phone:</strong> {subadmin?.phone ?? 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {subadmin?.dob ?? 'N/A'}</p>
          <p><strong>IP Address:</strong> {subadmin?.ip ?? 'N/A'}</p>
          <p><strong>Address:</strong> {subadmin?.address ?? 'N/A'}</p>
          <p><strong>Status:</strong> {subadmin?.status ?? 'N/A'}</p>
          <p><strong>Joined On:</strong> {subadmin?.created_at ?? 'N/A'}</p>

          {permissions.length > 0 && (
            <div className="mt-4">
              <strong>Permissions:</strong>
              <ul className="list-disc ml-5">
                {permissions.map((perm, i) => (
                  <li key={i}>{perm}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Use layout
import SubAdminLayout from "@/Layouts/SubAdminLayout";
SubAdminDashboard.layout = (page) => <SubAdminLayout>{page}</SubAdminLayout>;
