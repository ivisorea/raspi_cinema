import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface ContentPlayerProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

const ContentPlayer: React.FC<ContentPlayerProps> = ({ url, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
      >
        <IoMdClose size={24} />
      </button>
      <iframe
        src={url}
        className="h-full w-full border-none"
        allow="fullscreen"
        title="content"
      />
    </div>
  );
};

export default ContentPlayer;
