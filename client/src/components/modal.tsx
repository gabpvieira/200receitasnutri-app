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
        className="professional-card rounded-2xl w-full max-w-md p-6 animate-slide-up text-foreground shadow-2xl border-2 border-gray-100"
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

interface PdfViewerModalProps {
  title: string;
  previewUrl: string;
  onClose: () => void;
}

export function ContentModal({ title, description, icon, onDownload, onClose }: ContentModalProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto gradient-btn-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 mb-6 leading-relaxed font-medium">{description}</p>
      <div className="space-y-3">
        <button
          onClick={onDownload}
          className="block w-full gradient-btn-primary text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg"
          data-testid="button-access-content"
        >
          Acessar Conteúdo
        </button>
        <button
          onClick={onClose}
          className="block w-full text-gray-600 font-semibold py-2 hover:text-gray-800 transition-colors duration-200"
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
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed font-medium">{description}</p>
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl p-4 mb-6">
          <p className="text-yellow-700 text-sm font-bold">🕐 Liberado em 24 horas</p>
        </div>
        <button
          onClick={onClose}
          className="block w-full text-gray-600 font-semibold py-2 hover:text-gray-800 transition-colors duration-200"
          data-testid="button-close-modal"
        >
          Fechar
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto gradient-btn-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 mb-6 leading-relaxed font-medium">{description}</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {previewUrl && (
          <button
            onClick={() => {
              // Trigger preview modal instead of opening new tab
              const event = new CustomEvent('openPdfViewer', { 
                detail: { title, previewUrl } 
              });
              window.dispatchEvent(event);
              onClose();
            }}
            className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            data-testid="button-preview-pdf"
          >
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </button>
        )}
        {downloadUrl && (
          <button
            onClick={() => window.open(downloadUrl, '_blank')}
            className="flex items-center justify-center py-3 px-4 gradient-btn-primary text-white font-bold rounded-xl shadow-md hover:shadow-lg"
            data-testid="button-download-pdf"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </button>
        )}
      </div>
      
      <button
        onClick={onClose}
        className="block w-full text-gray-600 font-semibold py-2 hover:text-gray-800 transition-colors duration-200"
        data-testid="button-close-modal"
      >
        Fechar
      </button>
    </div>
  );
}

export function PdfViewerModal({ title, previewUrl, onClose }: PdfViewerModalProps) {
  useEffect(() => {
    if (true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 professional-card border-b">
        <h3 className="text-lg font-semibold text-foreground truncate">{title}</h3>
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-testid="button-close-viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-1">
        <iframe
          src={previewUrl}
          className="w-full h-full border-0"
          title={`Preview de ${title}`}
        />
      </div>
    </div>
  );
}
