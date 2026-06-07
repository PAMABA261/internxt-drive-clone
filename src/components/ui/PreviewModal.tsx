import { X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import type { DriveFile } from '../../types/file.types';
import { useFiles } from '../../context/FileContext';

interface PreviewModalProps {
  file: DriveFile | null;
  onClose: () => void;
}

export const PreviewModal = ({ file, onClose }: PreviewModalProps) => {
  const { files, previewFile } = useFiles();

  if (!file) return null;

  const currentIndex = files.findIndex(f => f.id === file.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < files.length - 1;

  const handlePrevious = (e: React.MouseEvent) => {
    // Previene que el clic se propague al fondo y cierre el modal accidentalmente
    e.stopPropagation();
    if (hasPrevious) previewFile(files[currentIndex - 1]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) previewFile(files[currentIndex + 1]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center truncate pr-4">
            <ImageIcon className="w-5 h-5 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{file.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 flex items-center justify-center bg-gray-100 dark:bg-black/50 min-h-[50vh] relative group">
          {hasPrevious && (
            <button 
              onClick={handlePrevious}
              className="absolute left-2 sm:left-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 outline-none z-10"
              title="Archivo anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {file.type === 'image' ? (
            <img 
              src={`https://picsum.photos/seed/${file.id}/800/600`} 
              alt={file.name} 
              className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-sm animate-in fade-in duration-300"
            />
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 px-12">
              <p>La vista previa solo está disponible para imágenes en esta demo.</p>
            </div>
          )}

          {hasNext && (
            <button 
              onClick={handleNext}
              className="absolute right-2 sm:right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-lg transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 outline-none z-10"
              title="Siguiente archivo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};