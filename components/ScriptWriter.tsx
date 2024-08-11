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

// https://www.youtube.com/watch?v=8_usygEhn4k&t=356s
// 46:30
const ScriptWriter = () => {
  const [script, setScript] = useState("");
  const [pages, setPages] = useState<number>();

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

        <Button disabled={!script || !pages} className="w-full" size={"lg"}>
          Generate Script
        </Button>
      </section>

      <section className="flex-1 pb-5 mt-5"></section>
    </div>
  );
};

export default ScriptWriter;
