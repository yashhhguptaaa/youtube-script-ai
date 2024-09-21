"use client";

import { Script as ScriptType } from "@/types/stories";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

type ScriptProps = {
  script: ScriptType;
};

const Script = ({ script }: ScriptProps) => {
  const [api, setApi] = useState<CarouselApi>();
  return (
    <div>
      <div className="px-20">
        <Carousel setApi={setApi} className="w-full lg:w-4/5 h-56 mx-auto">
          <CarouselContent>
            {script.pages.map((page, index) => (
              <CarouselItem key={index}>
                <Card>
                  <h2>{script.script}</h2>
                  <CardContent>
                    <Image
                      src={page.png}
                      alt={`Page ${index + 1} image`}
                      width={500}
                      height={500}
                      className="w-80 h-80 xl:w-[500px] xl:h-[500px] rounded-3xl mx-auto float-right p-5 xl:order-last"
                    />
                    <p>{page.txt}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Script;
