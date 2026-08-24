function SkillBar({ name, width, color }) {
  return (
    <div className={`meter ${color}`}>
      <span style={{ width }}>
        <span>{name}</span>
      </span>
    </div>
  );
}

export default SkillBar;
