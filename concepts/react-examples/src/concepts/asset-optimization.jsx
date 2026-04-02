const checklist = [
  'Serve responsive images with `srcset`/`sizes` and next-gen formats (AVIF/WebP).',
  'Inline critical SVG icons or use sprite sheets to reduce requests.',
  'Defer non-critical fonts and use font-display: swap for better FOUT handling.'
];

export default function AssetOptimization() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Image & Asset Optimization</h2>
      <p className="text-sm text-slate-300">
        Use the sample transformations in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-200">asset-optimization/example/</code> to
        compare original and optimized image payloads.
      </p>
      <ul className="space-y-2">
        {checklist.map((item) => (
          <li key={item} className="rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
            {item}
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500">
        Tools: Squoosh CLI, Sharp, Cloudinary, Imgix. Run WebPageTest visual comparisons to quantify improvements.
      </p>
    </div>
  );
}
