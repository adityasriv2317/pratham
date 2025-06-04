const PatientDashboard = () => {
  return (
    <main className="bg-white min-h-screen">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Appointments</h2>
          <p className="text-blue-900/70">View and manage your appointments.</p>
        </div>
        <div className="bg-white shadow rounded p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Medical Records</h2>
          <p className="text-blue-900/70">
            Access your medical history and records.
          </p>
        </div>
        <div className="bg-white shadow rounded p-6 border border-blue-900">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Billing</h2>
          <p className="text-blue-900/70">View and pay your medical bills.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Recent Activity</h2>
        <ul className="bg-white shadow rounded p-4 border border-blue-900">
          <li className="border-b border-blue-900/20 py-2 text-blue-900">
            Appointment with Dr. Smith on 2023-10-01.
          </li>
          <li className="border-b border-blue-900/20 py-2 text-blue-900">
            Prescription refilled on 2023-09-25.
          </li>
          <li className="py-2 text-blue-900">
            Bill payment of $150 completed on 2023-09-20.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default PatientDashboard;
