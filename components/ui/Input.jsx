export default function Input({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input className="w-full border px-3 py-2 rounded" {...props} />
    </div>
  );
}
