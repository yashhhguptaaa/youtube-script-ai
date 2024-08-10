import { BookOpen, FilePen } from "lucide-react";
import Link from "next/link";

// https://www.youtube.com/watch?v=8_usygEhn4k&t=356s
// 38:30
const Header = () => {
  return (
    <header className="relative p-16 text-center">
      <Link href="/">
        <h1 className="text-6xl font-black">ScriptWriter AI</h1>
        <div className="flex space-x-1 lg:space-x-5 text-3xl lg:text-5xl justify-center whitespace-nowrap">
          <h2>Bringing your best script for your </h2>
          <div className="relative">
            <div className="absolute bg-purple-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1" />

            <p className="relative text-white">next video.</p>
          </div>
        </div>
      </Link>

      {/* Nav Icons */}
      <div className="absolute -top-5 right-5 flex space-x-2">
        <Link href={"/"}>
          <FilePen className="h-8 w-8 lg:w-10 lg:h-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer" />
        </Link>
        <Link href={"/scripts"}>
          <BookOpen className="h-8 w-8 lg:w-10 lg:h-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
