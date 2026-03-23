function Courses() {

  const courses = [
    "AI & ML",
    "Data Science",
    "Front End",
    "Backend",
    "Java Fullstack",
    "Others"
  ]

  return (

    <div>

      <h1>Courses</h1>

      <div className="cards">

        {courses.map((c,i)=>(
          <div className="card" key={i}>
            <h3>{c}</h3>
          </div>
        ))}

      </div>

    </div>

  )
}

export default Courses