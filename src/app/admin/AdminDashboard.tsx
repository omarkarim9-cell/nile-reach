"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, RotateCcw, LogOut, CheckCircle2, Loader2 } from "lucide-react";

type Item = {
  slug: string;
  category: string;
  name: string;
  image: string;
  hasOverride: boolean;
};

type Props = { items: Item[] };

export function AdminDashboard({ items }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Group by category for nicer display
  const grouped = items.reduce<Record<string, Item[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    livestock: "Livestock",
    crops: "Crops & Grains",
    processed: "Processed Goods",
  };

  return (
    <div className="min-h-screen">
      {/* === Top bar === */}
      <header className="bg-nile-900 text-sand-50">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-sand-300/80">
              Admin
            </p>
            <h1 className="font-display text-lg font-medium">
              Nile Reach · Product Images
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/en"
              className="text-xs text-sand-200/80 hover:text-sand-50 transition-colors hidden sm:inline"
            >
              View site →
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-sand-200/80 hover:text-sand-50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={2} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* === Help text === */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 pb-2">
        <p className="text-sm text-nile-700/80 leading-relaxed max-w-2xl">
          Click any product to replace its image. New images appear on the live
          site within seconds. To restore the original, click <em>Reset</em>.
        </p>
      </div>

      {/* === Product grid === */}
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 space-y-12">
        {Object.entries(grouped).map(([cat, list]) => (
          <section key={cat}>
            <h2 className="text-xs uppercase tracking-[0.2em] text-nile-600 font-semibold mb-4">
              {categoryLabels[cat] || cat}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((item) => (
                <ProductCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

function ProductCard({ item }: { item: Item }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);

    const fd = new FormData();
    fd.append("slug", item.slug);
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
        setUploading(false);
        return;
      }
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2500);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setUploading(false);
    }
  };

  const handleReset = async () => {
    if (!confirm(`Reset ${item.name} to the default image?`)) return;
    setResetting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: item.slug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Reset failed");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setResetting(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ""; // allow re-uploading the same file
  };

  const busy = uploading || resetting;

  return (
    <div className="bg-white rounded-2xl border border-nile-100 overflow-hidden">
      <div className="relative aspect-[4/3] bg-sand-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
          unoptimized={item.image.startsWith("http")}
        />
        {item.hasOverride && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold bg-earth-500 text-sand-50 px-2 py-1 rounded-full">
            Custom
          </span>
        )}
        {justSaved && (
          <div className="absolute inset-0 bg-earth-500/85 flex items-center justify-center text-sand-50">
            <div className="text-center">
              <CheckCircle2 className="h-10 w-10 mx-auto mb-2" strokeWidth={2} />
              <p className="text-sm font-semibold">Saved</p>
            </div>
          </div>
        )}
        {busy && !justSaved && (
          <div className="absolute inset-0 bg-nile-900/80 flex items-center justify-center text-sand-50">
            <Loader2 className="h-8 w-8 animate-spin" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-display text-base text-nile-900 font-medium mb-3">
          {item.name}
        </h3>

        <div className="flex gap-2">
          <label
            className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-nile-800 text-sand-50 px-3 py-2 text-xs font-semibold cursor-pointer transition-all hover:bg-nile-900 ${
              busy ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Upload className="h-3.5 w-3.5" strokeWidth={2} />
            Replace
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={onChange}
              className="hidden"
              disabled={busy}
            />
          </label>
          {item.hasOverride && (
            <button
              onClick={handleReset}
              disabled={busy}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-nile-200 px-3 py-2 text-xs font-medium text-nile-700 transition-all hover:bg-nile-50 disabled:opacity-50"
              title="Restore default"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
              Reset
            </button>
          )}
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
