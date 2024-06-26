import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const teamDetails = [
  {
    id: 1,
    name: "Ruffin HOUNSOUNNON",
    profile: "/images/image.png",
    designation: "Backend & Frontend Developer",
    socials: {
      portfolio: "",
      github: "https://github.com/ruffinh22",
      linkedin: "https://www.linkedin.com/in/ruffin-hounsounnon-359559244/",
      twitter: "https://twitter.com/ruffinh22",
    },
  },
  
];

const TeamCard = ({ name, profile, designation, socials }) => {
  return (
    <div className="bg-white border shadow-lg p-4 rounded-lg flex items-center flex-col gap-y-4">
      <div className="w-full overflow-hidden rounded-md border-2 border-transparent hover:border-blue-400 transition-effect">
        <img
          src={profile}
          alt="profile picture"
          className="w-[280px] hover:scale-105 transition-effect"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-center mb-1">{name}</h2>
        <p className="bg-blue-400 px-2 w-fit rounded-md text-primary-white font-medium text-sm">
          {designation}
        </p>
      </div>
      <div className="w-full border-t border-gray-light pt-4 px-4">
        <div className="w-full flex-center gap-6">
          {socials.portfolio ? (
            <Link
              to={socials.portfolio}
              target="_blank"
              className="team_card_icon"
            >
              <i className="fa-solid fa-briefcase"></i>
            </Link>
          ) : (
            ""
          )}
          <Link to={socials.github} target="_blank" className="team_card_icon">
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link
            to={socials.linkedin}
            target="_blank"
            className="team_card_icon"
          >
            <i className="fa-brands fa-linkedin-in"></i>
          </Link>
          {socials.twitter ? (
            <Link
              to={socials.twitter}
              target="_blank"
              className="team_card_icon"
            >
              <i className="fa-brands fa-twitter"></i>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  socials: PropTypes.shape({
    portfolio: PropTypes.string,
    github: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
    twitter: PropTypes.string,
  }).isRequired,
};

const TeamCardSection = () => {
  const data = teamDetails;
  return (
    <section className="mt-32 flex-center flex-col">
      <h2 className="section_title">Meet ByteBlasters</h2>
      <p className="section_subtitle">
        The one and only force behind development of ezMark from scratch.
        Recursively testing and upgrading the application for seamless and best
        user experience.
      </p>
      <div className="w-full mt-10 flex-center max-sm:flex-col gap-y-6 md:gap-x-[15%]">
        {data.map((item) => (
          <TeamCard
            key={item.id}
            name={item.name}
            profile={item.profile}
            designation={item.designation}
            socials={item.socials}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamCardSection;
