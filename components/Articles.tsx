import { motion } from "framer-motion";
import projects from "../data/projects.json";
import { zeroPad } from "../lib/numbers";

export default function Articles() {
  return (
    <div className="flex flex-col">
      <ArticleHeader />
      {projects.map(({ description }, index) => (
        <Article
          key={index}
          description={description}
          index={zeroPad(++index, 3)}
          delay={index}
        />
      ))}
    </div>
  );
}

export function Article({ index, description, delay }) {
  return (
    <motion.div
      className="flex items-center border-b py-9"
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, delay: (delay + 4) * 0.15 }}>
      <p className="w-36 md:w-52">{index}</p>
      <p className="flex-1">{description}</p>
    </motion.div>
  );
}

export function ArticleHeader() {
  return (
    <motion.div
      className="flex items-center border-b py-9"
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 5 * 0.15 }}>
      <p className="w-36 md:w-52">#</p>
      <p className="flex-1">Name</p>
      <svg
        width="19"
        height="19"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"></path>
      </svg>
    </motion.div>
  );
}
