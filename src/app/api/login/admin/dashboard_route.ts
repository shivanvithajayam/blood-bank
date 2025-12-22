import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
export async function GET(request: Request) {
  const session = await getIronSession(request, new Response(), sessionOptions) as any;

  if (!session.admin) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      message: `Welcome Admin ${session.admin.username}`,
      role: session.admin.role,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}