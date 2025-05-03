import { Link } from "react-scroll";

const AboutMeText = () => {
  return (
    <div className="flex flex-col md:items-start sm:items-center md:text-left sm:text-center">
      <h2 className="text-6xl text-cyan mb-10">About Me</h2>
      <p>
      Hi, I'm Aditya Mayank Sinha — a passionate and versatile full-stack developer with a strong foundation in the MERN stack 
      (MongoDB, Express.js, React, Node.js). I love building intuitive, scalable web applications that solve real-world problems. 
      Whether it's designing seamless user interfaces or architecting robust backend systems, I enjoy every step of the development 
      process.<br/>
      When I’m not coding, you’ll find me exploring music, playing video games.
      </p>
      <button className="border border-orange rounded-full py-2 px-4 text-lg flex gap-2 items-center mt-10 hover:bg-orange transition-all duration-500 cursor-pointer md:self-start sm:self-center">
        <Link
          spy={true}
          smooth={true}
          duration={500}
          offset={-120}
          to="projects"
          className="cursor-pointer text-white hover:text-cyan transition-all duration-500"
        >
          My Projects
        </Link>
      </button>
    </div>
  );
};

export default AboutMeText;
