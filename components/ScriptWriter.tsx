"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Frame } from "@gptscript-ai/gptscript";
import renderEventMessage from "@/lib/renderEventMessage";
import path from "path";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const scriptsPath = "public/stories";

// https://www.youtube.com/watch?v=8_usygEhn4k&t=356s
// 1:43:41
const ScriptWriter = () => {
  const [script, setScript] = useState("");
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState("");
  const [runStarted, setRunStarted] = useState(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState<string>("");
  const [events, setEvents] = useState<Frame[]>([]);
  const router = useRouter();

  const runScript = async () => {
    setRunStarted(true);
    setRunFinished(false);

    const response = await fetch("/api/run-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story: script,
        pages,
        path: scriptsPath,
      }),
    });
    console.log("response:", response);
    if (response.ok && response.body) {
      console.log("Streaming Started");
      const reader = response.body.getReader();

      handleStream(reader);
    } else {
      setRunStarted(false);
      setRunFinished(true);
      console.log("Failed to start streaming...");
    }
  };

  async function handleStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
    const decoder = new TextDecoder();

    // Manage the stream from the API...
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // breaks out of the infinity loop

      // The decoder is used to decode the Uint8Array into string.
      const chunk = decoder.decode(value, { stream: true });

      // We split the chunk into events by splitting it by the "event: " keyword.
      const eventData = chunk
        .split("\n\n")
        .filter((line) => line.startsWith("event: "))
        .map((line) => line.replace(/^event: /, ""));

      // We parse the JSON data and update the state accordingly.
      eventData.forEach((data) => {
        try {
          const parsedData = JSON.parse(data);

          if (parsedData.type === "callProgress") {
            setProgress(
              parsedData.output[parsedData.output.length - 1].content,
            );
            setCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type === "callStart") {
            setCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type === "runFinish") {
            setRunFinished(true);
            setRunStarted(false);
          } else {
            setEvents((prevEvents) => [...prevEvents, parsedData]);
          }
        } catch (error) {
          console.log("data: ", data);
          // console.log("Failed to parse JSON", error);
        }
      });
    }
  }

  useEffect(() => {
    if (runFinished) {
      toast.success("Script generation finished successfully!", {
        action: (
          <Button
            onClick={() => {
              router.push("/scripts");
            }}
            className="bg-purple-500 ml-auto"
          >
            View Stories
          </Button>
        ),
      });
    }
  }, [router, runFinished]);

  return (
    <div className="flex flex-col container">
      <section className="flex-1 flex flex-col border border-blue-300 rounded-md p-10 space-y-2">
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

          {/* Render Events... */}
          <div className="space-y-5">
            {events.map((event, index) => (
              <div key={index}>
                <span className="mr-5">{">>"}</span>
                {renderEventMessage(event)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScriptWriter;
