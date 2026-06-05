import { X, Image as ImageIcon } from 'lucide-react';
import type { DriveFile } from '../../types/file.types';

interface PreviewModalProps {
  file: DriveFile | null;
  onClose: () => void;
}

export const PreviewModal = ({ file, onClose }: PreviewModalProps) => {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      
      {/* Contenedor principal: detiene el clic para que no se cierre si pulsas dentro de la imagen */}
      <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Cabecera */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center truncate pr-4">
            <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{file.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Contenido (La imagen generada dinámicamente) */}
        <div className="p-4 flex items-center justify-center bg-gray-100 dark:bg-black/50 min-h-[50vh]">
          {file.type === 'image' ? (
            <img 
              // Usamos picsum para generar una imagen falsa basada en el ID
              src={`https://picsum.photos/seed/${file.id}/800/600`} 
              alt={file.name} 
              className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-sm"
            />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>La vista previa solo está disponible para imágenes en esta demo.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};