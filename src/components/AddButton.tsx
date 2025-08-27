import { Plus } from "lucide-react";

interface AddButtonProps {
  label: string;
  onClick?: () => void;
  to?: string;
}

export default function AddButton({ label, onClick, to }: AddButtonProps) {
  const ButtonContent = (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-4xl shadow cursor-pointer hover:bg-blue-700 transition flex items-center gap-2"
    >
      <Plus size={16} />
      {label}
    </button>
  );

  if (to) {
    return <a href={to}>{ButtonContent}</a>;
  }

  return ButtonContent;
}
