import Image from "next/image";
import BellLogo from "@/images/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScriptWriter from "@/components/ScriptWriter";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-400 to-green-500 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 py-10">
          <Image src={BellLogo} height={250} alt="Logo" />

          <Button
            asChild
            className="px-20 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-10 text-2xl font-bold"
          >
            <Link href="/scripts">Explore Scripts Library</Link>
          </Button>
        </div>

        <ScriptWriter />
      </section>
    </main>
  );
}
