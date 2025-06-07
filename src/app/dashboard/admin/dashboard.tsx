const AdminDashboard = () => {
  return (
    <main className="bg-white rounded-2xl p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Admin Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Users</h2>
          <p className="text-blue-700">Manage user accounts and permissions.</p>
        </div>
        <div className="bg-white shadow rounded p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Reports</h2>
          <p className="text-blue-700">View and generate system reports.</p>
        </div>
        <div className="bg-white shadow rounded p-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">Settings</h2>
          <p className="text-blue-700">Configure application settings.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">
          Recent Activity
        </h2>
        <ul className="bg-white shadow rounded p-4 border border-blue-100">
          <li className="border-b border-blue-100 py-2 text-blue-700">
            User JohnDoe updated permissions.
          </li>
          <li className="border-b border-blue-100 py-2 text-blue-700">
            System backup completed.
          </li>
          <li className="py-2 text-blue-700">New user JaneSmith registered.</li>
        </ul>
      </section>
    </main>
  );
};
export default AdminDashboard;
