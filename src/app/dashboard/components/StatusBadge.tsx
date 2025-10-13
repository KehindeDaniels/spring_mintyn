interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status?.toUpperCase();

  const color =
    normalized === "APPROVED"
      ? "bg-green-100 text-green-700"
      : normalized === "PENDING"
      ? "bg-orange-100 text-orange-700"
      : "bg-gray-100 text-gray-600";

  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full tracking-wide ${color}`}
    >
      {normalized}
    </span>
  );
}
