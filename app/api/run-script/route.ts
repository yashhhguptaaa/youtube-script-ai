import { NextRequest } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/gptScriptInstance";
import path from "path";

const scripts = "app/api/run-script/story-book.gpt";
export async function POST(request: NextRequest) {
  const { story, pages, path: scriptPath } = await request.json();
  console.log({ story, pages, scriptPath });

  // Resolve the absolute path
  const resolvedPath = scriptPath;

  // Example CLI Command: gptscript ./story-book.gpt ---story "A robot and a human who became friends" ---pages 5 --path ./scripts
  const opts: RunOpts = {
    disableCache: true,
    input: `---story ${story} ---pages ${pages} --path ${resolvedPath}`,
  };

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const run = await g.run(scripts, opts);
          run.on(RunEventType.Event, (data) => {
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`),
            );
          });

          await run.text();
          controller.close();
        } catch (error) {
          controller.error(error);
          console.error("Error:", error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.log("route me error aaraha hai");
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
