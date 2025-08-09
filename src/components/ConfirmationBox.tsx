import { createPortal } from "react-dom";

interface ConfirmationBoxProps {
  open: boolean;
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationBox({
  open,
  label,
  onConfirm,
  onCancel,
}: ConfirmationBoxProps) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-md shadow-lg p-6 w-120">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-lg font-semibold ">{label}</span>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border cursor-pointer rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
