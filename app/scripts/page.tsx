import React from "react";
import { Script } from "@/types/stories";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getAllScripts } from "@/lib/scripts";

const Scripts = () => {
  const scripts: Script[] = getAllScripts();

  console.log("scripts:", scripts);

  return <div>Scripts</div>;
};

export default Scripts;

// https://youtu.be/8_usygEhn4k?t=7122f
