import styles from "./Resume.module.css";

function Resume({ data }) {
  if (!data) return null;

  return (
    <div className={styles.container}>

      {/* LEFT SIDE */}
      <div className={styles.left}>

        <div className={styles.profile}>
          <img src={data.image} alt="profile" />
        </div>

        <div className={styles.section}>
          <h3>About Me</h3>
          <p>{data.about}</p>
        </div>

        <div className={styles.section}>
          <h3>Skills</h3>
          <ul>
            {data.skills?.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Reward</h3>
          {data.rewards?.map((r, i) => (
            <p key={i}>{r}</p>
          ))}
        </div>

        <div className={styles.section}>
          <h3>Languages</h3>
          {data.languages?.map((lang, i) => (
            <p key={i}>{lang}</p>
          ))}
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>

        <div className={styles.header}>
          <h1>{data.name}</h1>
          <h2>{data.role}</h2>
        </div>

        <div className={styles.contact}>
          <div><strong>Phone</strong><br />{data.phone}</div>
          <div><strong>Email</strong><br />{data.email}</div>
          <div><strong>Address</strong><br />{data.address}</div>
        </div>

        <div className={styles.title}>Experience</div>

        {data.experience?.map((exp, i) => (
          <div className={styles.item} key={i}>
            <h4>
              {exp.title}
              <span>{exp.years}</span>
            </h4>
            <p><strong>{exp.company}</strong></p>
            <p>{exp.desc}</p>
          </div>
        ))}

        <div className={styles.title}>Education</div>

        {data.education?.map((edu, i) => (
          <div className={styles.item} key={i}>
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
