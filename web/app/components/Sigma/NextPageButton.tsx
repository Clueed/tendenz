import classNames from "classnames";
import { motion } from "framer-motion";

export function NextPageButton({
  handleNextPage,
  isLoading,
}: {
  handleNextPage: () => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      whileInView={{
        y: [0, 15, 0],
        transition: {
          delay: 10,
          repeat: Infinity,
          repeatDelay: 10,
        },
      }}
      key={"nextPageButton"}
      className="flex items-center justify-center"
    >
      <button
        onClick={handleNextPage}
        className={classNames(
          "p-3 transition-all rounded-md bg-slate-a2 text-slate-12",
          {
            "hover:bg-slate-a5 hover:shadow-md": !isLoading,
          },
          { "bg-indigo-a5 text-indigo-12": isLoading }
        )}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-b-2 rounded-full border-indigo-a11 animate-spin"></div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            fill="currentColor"
          >
            Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com
            License - https://fontawesome.com/license (Commercial License)
            Copyright 2023 Fonticons, Inc.{" "}
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}