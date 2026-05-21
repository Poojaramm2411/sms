// export default function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <div className="card blue">
//         <h2>Students</h2>
//       </div>

//       <div className="card green">
//         <h2>Courses</h2>
//       </div>

//       <div className="card purple">
//         <h2>Batches</h2>
//       </div>

//       <div className="card yellow">
//         <h2> Offers</h2>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { FaUserGraduate, FaBook, FaLayerGroup, FaGift } from "react-icons/fa";
import "../App.css";

const BASE_URL = "https://gwk8h3dw-8080.inc1.devtunnels.ms";

export default function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    batches: 0,
    offers: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [stuRes, courseRes, batchRes, offerRes] = await Promise.all([
          fetch(`${BASE_URL}/Student`, { headers }),
          fetch(`${BASE_URL}/Course`, { headers }),
          fetch(`${BASE_URL}/Batch`, { headers }),
          fetch(`${BASE_URL}/Offer`, { headers }),
        ]);

        const students = await stuRes.json();
        const courses = await courseRes.json();
        const batches = await batchRes.json();
        const offers = await offerRes.json();

        setCounts({
          students: students.length || 0,
          courses: courses.length || 0,
          batches: batches.length || 0,
          offers: offers.length || 0,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    fetchCounts(); //  now perfectly safe
  }, []);

  return (
    <div className="dashboard-container">
      <div className="card blue">
        <FaUserGraduate className="icon" />
        <h2>{counts.students}</h2>
        <p>Students</p>
      </div>

      <div className="card green">
        <FaBook className="icon" />
        <h2>{counts.courses}</h2>
        <p>Courses</p>
      </div>

      <div className="card purple">
        <FaLayerGroup className="icon" />
        <h2>{counts.batches}</h2>
        <p>Batches</p>
      </div>

      <div className="card yellow">
        <FaGift className="icon" />
        <h2>{counts.offers}</h2>
        <p>Offers</p>
      </div>
    </div>
  );
}