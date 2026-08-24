function ContactInfoItem({ link }) {
  return (
    <div className="g1">
      <div className="item-box clearfix">
        <div className="item-data">
          <h3>
            <a href={link.url}>
              <img src={link.icon} alt={link.name} width="50" style={{ marginBottom: 0 }} />
              {link.display}
              <p>{link.label}</p>
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ContactInfoItem;
