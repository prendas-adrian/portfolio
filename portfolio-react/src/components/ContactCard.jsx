function ContactCard({ icon, title, text, link }) {
  const content = (
    <>
      <div className="sny-icon">
        <img src={icon} alt={title} width="100" style={{ marginBottom: 0 }} />
      </div>
      <div className="sny-icon-content">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </>
  );

  return (
    <div className="g1">
      <div className="sny-icon-box">
        {link ? <a href={link}>{content}</a> : content}
      </div>
    </div>
  );
}

export default ContactCard;
