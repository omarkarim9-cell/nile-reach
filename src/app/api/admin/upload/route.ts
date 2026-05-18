import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";
import { setImageOverride, deleteImageOverride } from "@/lib/db";
import { products } from "@/lib/products";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image storage not configured (BLOB_READ_WRITE_TOKEN missing)" },
      { status: 500 }
    );
  }

  try {
    const form = await req.formData();
    const slug = form.get("slug");
    const file = form.get("file");

    if (typeof slug !== "string" || !slug) {
      return NextResponse.json({ error: "Missing product slug" }, { status: 400 });
    }
    if (!products.find((p) => p.slug === slug)) {
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
        { status: 400 }
      );
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, or WebP." },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob with a stable, predictable filename
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const filename = `products/${slug}-${Date.now()}.${ext}`;
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: false,
    });

    await setImageOverride(slug, blob.url);

    return NextResponse.json({ success: true, url: blob.url });
  } catch (err) {
    console.error("[upload] error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

/**
 * DELETE: revert to default image (just removes the override).
 * Body: { slug: string }
 */
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await req.json();
    if (typeof slug !== "string" || !slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }
    await deleteImageOverride(slug);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[delete-override] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
