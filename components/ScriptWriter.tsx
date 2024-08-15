"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const scriptsPath = "public/scripts/";

// https://www.youtube.com/watch?v=8_usygEhn4k&t=356s
// 1:06:28
const ScriptWriter = () => {
  const [script, setScript] = useState("");
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState("");
  const [runStarted, setRunStarted] = useState(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState<string>("");

  const runScript = async () => {
    setRunStarted(true);
    setRunFinished(false);

    const response = await fetch("/api/run-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ script, pages, path: scriptsPath }),
    });

    if (response.ok && response.body) {
    } else {
      setRunStarted(false);
      setRunFinished(true);
      console.log("Failed to start streaming...");
    }
  };

  return (
    <div className="flex flex-col container">
      <section className="flex-1 flex flex-col border border-purple-300 rounded-md p-10 space-y-2">
        <Textarea
          className="flex-1"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Write a script about a robot and a human who became friends..."
        />

        <Select onValueChange={(value: string) => setPages(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="How many pages should the script be?" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          disabled={!script || !pages || runStarted}
          className="w-full"
          size={"lg"}
          onClick={runScript}
        >
          Generate Script
        </Button>
      </section>

      <section className="flex-1 pb-5 mt-5">
        <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
          <div>
            {runFinished === null && (
              <>
                <p className="animate-pulse mr-5">
                  Im waiting for you to start the script generation...
                </p>
              </>
            )}
            <span className="mr-5">{">>"}</span>
            {progress}
          </div>

          {/* Current Tool */}
          {currentTool && (
            <div className="py-10">
              <span className="mr-5">{"--- [Current Tool] ---"}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ScriptWriter;
