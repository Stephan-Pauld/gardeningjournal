type PlantDetailModalProps = {
  isOpen: boolean;
  onClose: (boolean: boolean) => void;
};
export const PlantDetailsModal = ({
  isOpen,
  onClose,
}: PlantDetailModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-[56px]">
        <div className="flex flex-col m-2 w-[300px]"></div>
        <div className="flex justify-between mx-4 mt-6">
          <button
            onClick={() => onClose(false)}
            className="bg-red-500 px-6 py-2 rounded-[3px] font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
