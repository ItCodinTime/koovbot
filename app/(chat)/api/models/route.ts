import { chatModels, getCapabilities } from "@/lib/ai/models";

export async function GET() {
  const headers = {
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  };

  return Response.json(
    { capabilities: await getCapabilities(), models: chatModels },
    { headers }
  );
}
