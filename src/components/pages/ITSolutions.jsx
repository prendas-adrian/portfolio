import { useState } from "react";
import SkillBar from "../SkillBar";
import Project from "../Project";

function ITSolutions({ solutions, projects, skills }) {
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleProject = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div id="itsolutions">
      <section className="clearfix">
        <div className="g2">
          <h3>Software Solutions</h3>
          <ul className="no-list work">
            {solutions.map((sol) => (
              <li key={sol}>{sol}</li>
            ))}
          </ul>
          <h3>Some Projects</h3>
          <ul className="no-list work">
            {projects.map((project, index) => (
              <Project
                key={project.id || index}
                project={project}
                isExpanded={expandedProject === project.id}
                onToggle={toggleProject}
              />
            ))}
          </ul>
        </div>
        <div className="g1">
          <div className="sidebar">
            <h3>Skills</h3>

            <h5>Programming Language</h5>
            {skills.programmingLanguages.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}

            <h5>Database</h5>
            {skills.database.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}

            <div className="break"></div>

            <h5>Web</h5>
            {skills.web.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}

            <h5>Operating Systems</h5>
            {skills.operatingSystems.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}

            <h5>Mobile</h5>
            {skills.mobile.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ITSolutions;
