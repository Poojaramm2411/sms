export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
        <h2>Students</h2>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-xl shadow">
        <h2>Courses</h2>
      </div>

      <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
        <h2>Offers</h2>
      </div>
    </div>
  );
}