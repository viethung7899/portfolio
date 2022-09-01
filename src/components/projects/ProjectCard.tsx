import { FaCode, FaWindowMaximize } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
  image?: string;
  repo?: string;
  link?: string;
}

const hover =
  'hover:text-orange-500 hover:dark:text-teal-500 transition-colors';

function ProjectCard({ title, description, repo, image, link }: Props) {
  return <div className="flex flex-col">
    {image ?
      <img
        src={image}
        alt={title}
        className="border-[1px] border-black/30 dark:border-white/30 w-full aspect-[16/9] rounded-lg shadow-md shadow-orange-500 dark:shadow-teal-500 hover:scale-[1.05] transition-all"
      />
      : <div
        className="border-[1px] border-black/30 dark:border-white/30 w-full aspect-[16/9] rounded-lg hover:scale-[1.03] transition-all"
      />}
    <div className="flex items-center justify-between pt-6 pb-2">
      <a href={link} className={`text-xl font-bold ${hover}`}>{title}</a>
      <div className="gap-4 flex text-xl">
        {repo && <a href={repo}>
          <FaCode className={hover} />
        </a>}
        {link && <a href={link}>
          <FaWindowMaximize className={hover} />
        </a>}
      </div>
    </div>
    <p className="font-sm text-black/50 dark:text-white/50">{description}</p>
  </div>
}

export default ProjectCard