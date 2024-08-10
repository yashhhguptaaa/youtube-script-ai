import Link from "next/link";

// https://www.youtube.com/watch?v=8_usygEhn4k&t=356s
// 33:10
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
      <div></div>
    </header>
  );
};

export default Header;
