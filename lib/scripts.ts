import { Page, Script } from "@/types/stories";
import fs from "fs";
import path from "path";
import { cleanTitle } from "./cleanTitle";

const scriptsDirectory = path.join(process.cwd(), "public/stories");

/**
 * Access the public files and read all the scripts.
 */
export function getAllScripts(): Script[] {
  if (!fs.existsSync(scriptsDirectory)) {
    return [];
  }

  const scriptsFolder = fs.readdirSync(scriptsDirectory);
  const scripts: Script[] = scriptsFolder.map((scriptFolder) => {
    const scriptPath = path.join(scriptsDirectory, scriptFolder);
    const files = fs.readdirSync(scriptPath);

    const pages: Page[] = [];
    const pageMap: { [key: string]: Partial<Page> } = {};

    files.forEach((file) => {
      const filePath = path.join(scriptPath, file);
      const fileExtension = path.extname(file).substring(1);
      const pageNumber = file.match(/page(\d+)\./)?.[1];

      if (pageNumber) {
        if (!pageMap[pageNumber]) {
          pageMap[pageNumber] = {};
        }

        if (fileExtension === "txt") {
          pageMap[pageNumber].txt = fs.readFileSync(filePath, "utf8");
        } else if (fileExtension === "png") {
          pageMap[pageNumber].png = `/stories/${scriptFolder}/${file}`;
        }
      }

      Object.keys(pageMap).forEach((pageNumber) => {
        if (pageMap[pageNumber].txt && pageMap[pageNumber].png) {
          pages.push(pageMap[pageNumber] as Page);
        }
      });
    });

    return {
      script: cleanTitle(scriptFolder),
      pages,
    };
  });

  return scripts;
}

export function getScript(script: string): Script | undefined {}
