import React from "react";
import { Script } from "@/types/stories";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getAllScripts } from "@/lib/scripts";

// server side rendered this page
export const revalidate = 0;

const Scripts = () => {
  const scripts: Script[] = getAllScripts();

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {scripts.length === 0 && <p>No scripts found...</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {scripts.map((script, index) => (
          <Link
            key={script.script + index}
            href={`/scripts/${script.script}`}
            className="border rounded-lg cursor-pointer hover:shadow-lg hover:border-purple-500 transition-all duration-300 ease-in-out"
          >
            <div className="relative">
              <p className="absolute flex items-center top-0 right-0 bg-white text-purple-500 font-bold p-3 rounded-lg m-2 text-sm">
                <BookOpen className="h-4 w-4 mr-1" />
                {script.pages.length === 1
                  ? "1 Page"
                  : `${script.pages.length} Pages`}
              </p>
              <Image
                alt={script.script}
                src={script.pages[0].png}
                width={500}
                height={500}
                className="w-full object-contain rounded-t-lg"
              />
            </div>
            <h2 className="text-lg first-letter:text-3xl font-light p-5 text-center">
              {script.script}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Scripts;

// https://youtu.be/8_usygEhn4k?t=7122f
