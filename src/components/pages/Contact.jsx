import { personalInfo } from "../../data/data";
import ContactCard from "../ContactCard";

function Contact() {
  return (
    <div id="contact">
      <section className="clearfix">
        <ContactCard
          icon="/images/address.svg"
          title="My Address"
          text={personalInfo.address}
        />
        <ContactCard
          icon="/images/smartphone.svg"
          title="Mobile Number"
          text={personalInfo.phone}
          link={personalInfo.phoneLink}
        />
        <ContactCard
          icon="/images/businessman.svg"
          title="About Me"
          text={personalInfo.aboutContact}
        />
        <div className="break"></div>
      </section>
    </div>
  );
}

export default Contact;
