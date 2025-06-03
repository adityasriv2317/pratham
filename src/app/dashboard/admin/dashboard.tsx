const AdminDashboard = () => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Manage user accounts and permissions.</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p className="text-gray-600">View and generate system reports.</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-600">Configure application settings.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="bg-white shadow rounded p-4">
          <li className="border-b py-2">User JohnDoe updated permissions.</li>
          <li className="border-b py-2">System backup completed.</li>
          <li className="py-2">New user JaneSmith registered.</li>
        </ul>
      </section>
    </main>
  );
};
export default AdminDashboard;
