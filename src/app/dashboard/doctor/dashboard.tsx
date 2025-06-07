const DoctorDashboard = () => {
    return (
        <main className="doctor-dashboard-container p-8 bg-white rounded-2xl text-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Doctor</h1>
            <section className="mt-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Today's Overview</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Appointments: 8</li>
                    <li>Pending Lab Results: 3</li>
                    <li>Messages: 2</li>
                </ul>
            </section>
            <section className="mt-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Quick Actions</h2>
                <div className="flex gap-4">
                    <button className="bg-blue-900 text-white rounded px-6 py-3 font-medium hover:bg-blue-800 transition">
                        View Appointments
                    </button>
                    <button className="bg-blue-900 text-white rounded px-6 py-3 font-medium hover:bg-blue-800 transition">
                        Check Lab Results
                    </button>
                    <button className="bg-blue-900 text-white rounded px-6 py-3 font-medium hover:bg-blue-800 transition">
                        Patient Records
                    </button>
                </div>
            </section>
            <section className="mt-8">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Recent Patients</h2>
                <table className="w-full border-collapse bg-blue-50 text-gray-900">
                    <thead>
                        <tr>
                            <th className="border-b-2 border-blue-200 px-2 py-2 text-left">Name</th>
                            <th className="border-b-2 border-blue-200 px-2 py-2 text-left">Last Visit</th>
                            <th className="border-b-2 border-blue-200 px-2 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-2 py-2 border-b border-blue-100">John Doe</td>
                            <td className="px-2 py-2 border-b border-blue-100">2024-06-10</td>
                            <td className="px-2 py-2 border-b border-blue-100">Follow-up</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2 border-b border-blue-100">Jane Smith</td>
                            <td className="px-2 py-2 border-b border-blue-100">2024-06-09</td>
                            <td className="px-2 py-2 border-b border-blue-100">New</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2">Michael Lee</td>
                            <td className="px-2 py-2">2024-06-08</td>
                            <td className="px-2 py-2">Discharged</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default DoctorDashboard;
