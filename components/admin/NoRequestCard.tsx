import { NoRequestCardProps } from "@/types";
import { FaList } from "react-icons/fa";


export function NoRequestCard({
    title,
    description
}: NoRequestCardProps) {
    return (
        <div className="flex flex-col justify-center items-center text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-gray-700 dark:text-gray-300">
          <FaList className="mb-4 text-5xl text-gray-400 dark:text-gray-500" />
          <span className="text-2xl font-semibold mb-2">
            {title}
          </span>
          <p className="text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
    );
}