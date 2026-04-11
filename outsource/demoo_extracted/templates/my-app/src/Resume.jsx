import "./Resume.css";

function Resume({ data }) {
  return (
    <div className="container">

      {/* LEFT SIDE */}
      <div className="left">

        <div className="profile">
          <img src={data.image} alt="profile" />
        </div>

        <div className="section">
          <h3>About Me</h3>
          <p>{data.about}</p>
        </div>

        <div className="section">
          <h3>Skills</h3>
          <ul>
            {data.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Reward</h3>
          {data.rewards.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </div>

        <div className="section">
          <h3>Languages</h3>
          {data.languages.map((lang, i) => (
            <p key={i}>{lang}</p>
          ))}
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="right">

        <div className="header">
          <h1>{data.name}</h1>
          <h2>{data.role}</h2>
        </div>

        <div className="contact">
          <div><strong>Phone</strong><br />{data.phone}</div>
          <div><strong>Email</strong><br />{data.email}</div>
          <div><strong>Address</strong><br />{data.address}</div>
        </div>

        <div className="title">Experience</div>

        {data.experience.map((exp, i) => (
          <div className="item" key={i}>
            <h4>
              {exp.title}
              <span>{exp.years}</span>
            </h4>
            <p><strong>{exp.company}</strong></p>
            <p>{exp.desc}</p>
          </div>
        ))}

        <div className="title">Education</div>

        {data.education.map((edu, i) => (
          <div className="item" key={i}>
            <h4>
              {edu.degree}
              <span>{edu.years}</span>
            </h4>
            <p><strong>{edu.college}</strong></p>
            <p>{edu.desc}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Resume;