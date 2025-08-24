import { ReactNode, useEffect } from 'react';
import { X, Download, Eye, Clock } from 'lucide-react';

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

interface PdfModalProps {
  title: string;
  description: string;
  icon: string;
  previewUrl?: string;
  downloadUrl?: string;
  isAvailable: boolean;
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

export function PdfModal({ title, description, icon, previewUrl, downloadUrl, isAvailable, onClose }: PdfModalProps) {
  if (!isAvailable) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-xl p-4 mb-6">
          <p className="text-yellow-600 text-sm font-medium">🕐 Liberado em 24 horas</p>
        </div>
        <button
          onClick={onClose}
          className="block w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors duration-200"
          data-testid="button-close-modal"
        >
          Fechar
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {previewUrl && (
          <button
            onClick={() => window.open(previewUrl, '_blank')}
            className="flex items-center justify-center py-3 px-4 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300"
            data-testid="button-preview-pdf"
          >
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </button>
        )}
        {downloadUrl && (
          <button
            onClick={() => window.open(downloadUrl, '_blank')}
            className="flex items-center justify-center py-3 px-4 gradient-btn text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="button-download-pdf"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </button>
        )}
      </div>
      
      <button
        onClick={onClose}
        className="block w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors duration-200"
        data-testid="button-close-modal"
      >
        Fechar
      </button>
    </div>
  );
}
