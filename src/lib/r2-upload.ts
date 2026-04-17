import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToR2(file: File, folder: string): Promise<string> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME || "ayanco-media";
  const endpoint = process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`;

  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error("R2 configuration missing. Check R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_ENDPOINT.");
  }

  const s3Client = new S3Client({
    region: "auto",
    endpoint: endpoint,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  const ext = file.name.split(".").pop();
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Return the public URL
    const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
    return `${publicUrl}/${key}`;
  } catch (error: any) {
    console.error("R2 S3 Upload Error:", error);
    throw new Error(`R2 upload failed: ${error.message}`);
  }
}