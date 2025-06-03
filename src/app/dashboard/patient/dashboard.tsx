const PatientDashboard = () => {
  return (
    <main className="p-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Appointments</h2>
          <p className="text-gray-600">View and manage your appointments.</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Medical Records</h2>
          <p className="text-gray-600">
            Access your medical history and records.
          </p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Billing</h2>
          <p className="text-gray-600">View and pay your medical bills.</p>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="bg-white shadow rounded p-4">
          <li className="border-b py-2">
            Appointment with Dr. Smith on 2023-10-01.
          </li>
          <li className="border-b py-2">
            Prescription refilled on 2023-09-25.
          </li>
          <li className="py-2">
            Bill payment of $150 completed on 2023-09-20.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default PatientDashboard;
