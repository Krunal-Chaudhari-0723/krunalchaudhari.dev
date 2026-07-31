import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import SelioraImg from '../../assets/seloria.png';
import FoodImg from '../../assets/food.png';
import JadooImg from '../../assets/Jadoo.png';

const imageMap = {
  "Seliora FreeLance": SelioraImg,
  "Food Delivery App": FoodImg,
  "Jadoo - Travels Website": JadooImg,
};

const ProjectCard = ({ project }) => {
  const { title, description, tech, github, demo, challenges } = project;
  const projectImg = imageMap[title] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="flex flex-col w-full bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg shadow-black/30 hover:border-cyan-500/30 transition-all duration-300 my-2"
    >
      {/* Project Image */}
      {projectImg && (
        <div className="relative h-32 w-full overflow-hidden border-b border-slate-800">
          <img
            src={projectImg}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="text-sm font-semibold text-white mb-1.5 hover:text-cyan-400 transition-colors">
          {title}
        </h4>
        <p className="text-slate-350 text-[11px] leading-relaxed mb-3 line-clamp-4">
          {description}
        </p>

        {/* Challenges section */}
        {challenges && (
          <div className="mb-3 bg-cyan-950/20 border border-cyan-850/30 rounded-lg p-2">
            <span className="text-[10px] font-semibold text-cyan-400 block mb-0.5">Challenges Overcome:</span>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              {challenges}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex gap-2 w-full">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:bg-slate-700 hover:text-white text-slate-300 text-xs font-medium transition duration-200"
            >
              <FaGithub className="text-[11px]" />
              GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-medium transition duration-200 shadow-md shadow-cyan-500/10"
            >
              <HiEye className="text-[11px]" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
