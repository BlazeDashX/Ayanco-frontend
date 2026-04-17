import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToR2 } from "@/lib/r2-upload";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ error: "Invalid file type" }, { status: 400 });
    }

    const url = await uploadToR2(file, folder);
    return Response.json({ url });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
