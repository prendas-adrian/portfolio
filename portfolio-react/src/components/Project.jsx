function Project({ project, isExpanded, onToggle }) {
  if (project.type === "link") {
    return (
      <li>
        <a href={project.url}>{project.title}</a>
      </li>
    );
  }

  return (
    <li>
      <a
        href={`#${project.id}`}
        onClick={(e) => {
          e.preventDefault();
          onToggle(project.id);
        }}
      >
        {project.title}
      </a>
      {isExpanded && (
        <div id={`content-${project.id}`}>
          {project.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {project.image && (
            <center>
              <img src={project.image} id={`${project.id}Img`} alt={project.title} />
            </center>
          )}
          {project.extraDescription && <p>{project.extraDescription}</p>}
          {project.repoLabel && (
            <p>
              Repository:{" "}
              <a href={project.repoUrl}>{project.repoLabel}</a>
            </p>
          )}
          {project.techStack && (
            <center>
              <div style={{ display: "inline-block", width: "100%" }}>
                {project.techStack.map((tech, i) => (
                  <div key={i} style={{ display: "inline-block", paddingLeft: i > 0 ? "10%" : 0 }}>
                    <img src={tech.image} alt={tech.name} width="50" />
                    <p>{tech.name}</p>
                  </div>
                ))}
              </div>
              {project.gif && (
                <img src={project.gif} id={project.id} alt={project.title} />
              )}
            </center>
          )}
          {project.extraText && project.extraLinkLabel && (
            <p>
              {project.extraText}
              <a href={project.extraLinkUrl}>{project.extraLinkLabel}</a>
            </p>
          )}
          {project.footerText && <p>{project.footerText}</p>}
        </div>
      )}
    </li>
  );
}

export default Project;
