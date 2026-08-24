import { personalInfo, socialLinks } from "../../data/data";
import ContactInfoItem from "../ContactInfoItem";

function About({ onNavigate }) {
  return (
    <div id="about">
      <section className="clearfix">
        <div className="g2">
          <div className="photo">
            <img src={personalInfo.profileImage} width="200" height="200" alt="about me" />
          </div>
          <div className="info">
            <h2>{personalInfo.name}</h2>
            <h4 style={{ marginBottom: 0 }}>{personalInfo.title}</h4>
            <p className="parrafo">{personalInfo.about}</p>
          </div>
        </div>
        <div className="g1">
          <div className="main-links sidebar">
            <ul>
              <li>
                <a href="#itsolutions" onClick={(e) => { e.preventDefault(); onNavigate("itsolutions"); }}>
                  View It Solutions
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate("contact"); }}>
                  Hire me for your next project
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="break"></div>
        <div className="contact-info">
          {socialLinks.map((link) => (
            <ContactInfoItem key={link.name} link={link} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
