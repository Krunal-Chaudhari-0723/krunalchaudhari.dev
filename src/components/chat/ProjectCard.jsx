import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import AttendIQImg from "../../assets/attendiq.png";
import BrightPaperImg from "../../assets/brightpaper.png";
import SystemPortalImg from "../../assets/systemportal.png";
import FreelanceSiteImg from "../../assets/chaudharikrunal.png";
import SelioraImg from '../../assets/seloria.png';
import FoodImg from '../../assets/food.png';
import JadooImg from '../../assets/Jadoo.png';

const imageMap = {
  "AttendIQ - Smart Attendance": AttendIQImg,
  "Bright Paper Website": BrightPaperImg,
  "Bright Paper Systems Portal": SystemPortalImg,
  "Freelance Studio Website": FreelanceSiteImg,
  "Seliora FreeLance": SelioraImg,
  "Food Delivery App": FoodImg,
  "Jadoo - Travels Website": JadooImg,
};

// Compact card used in the chat's horizontal project carousel
const ProjectCard = ({ project }) => {
  const { title, description, tech, github, demo, achievement } = project;
  const projectImg = imageMap[title] || null;

  return (
    <div className="flex w-60 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20">
      {projectImg && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
          <img src={projectImg} alt={title} loading="lazy" className="h-full w-full object-cover object-top" />
          {achievement && (
            <span className="absolute left-2 top-2 rounded-full bg-amber-400/90 px-2 py-0.5 text-[10px] font-semibold text-amber-950">
              {achievement}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-3">
        <h4 className="text-sm font-medium text-zinc-50">{title}</h4>
        <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-zinc-400">{description}</p>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {tech.slice(0, 3).map((t) => (
            <span key={t} className="rounded border border-white/10 px-1.5 py-px font-mono text-[10px] text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-3 text-xs">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-zinc-100 hover:text-brand-300"
            >
              Live demo <FiArrowUpRight />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-100"
            >
              <FaGithub /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
