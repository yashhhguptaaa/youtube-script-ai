import Script from "@/components/Script";
import { getAllScripts, getScript } from "@/lib/scripts";
import { notFound } from "next/navigation";
import React from "react";

interface ScriptPageProps {
  params: {
    id: string;
  };
}
const ScriptPage = ({ params: { id } }: ScriptPageProps) => {
  /**
   * The id is URL endcoded, so we need to decode it before using it to get the script name.
   * This fixes the issue where the script name is not found,
   * when the id contains special characters such as %20 that represents spaces.
   */
  const decodedId = decodeURIComponent(id);

  const script = getScript(decodedId);
  if (!script) {
    return notFound();
  }

  return <Script script={script} />;
};

export default ScriptPage;

/**
 * Through this method, we can generate the static pages for each script.
 * This is the caching strategy for the scripts.
 */
export async function generateStaticParams() {
  const scripts = getAllScripts();

  /**
   * we need to return an array of objects with the id property set to script id.
   * this will generate the static pages for each script.
   */
  return scripts.map((script) => ({
    params: { id: encodeURIComponent(script.script) },
  }));
}
