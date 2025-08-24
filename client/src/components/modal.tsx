import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="glass-card-light rounded-2xl w-full max-w-md p-6 animate-slide-up text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface ContentModalProps {
  title: string;
  description: string;
  icon: string;
  onDownload: () => void;
  onClose: () => void;
}

export function ContentModal({ title, description, icon, onDownload, onClose }: ContentModalProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <div className="space-y-3">
        <button
          onClick={onDownload}
          className="block w-full gradient-btn text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          data-testid="button-access-content"
        >
          Acessar Conteúdo
        </button>
        <button
          onClick={onClose}
          className="block w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors duration-200"
          data-testid="button-close-modal"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
