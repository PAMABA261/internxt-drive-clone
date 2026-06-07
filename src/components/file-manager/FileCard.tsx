import { File, Image as ImageIcon, FileText, Folder, Film, Music, Archive, Trash2 } from 'lucide-react';
import type { DriveFile } from '../../types/file.types';
import { formatFileSize, formatFileDate } from '../../utils/fileHelpers';
import { useFiles } from '../../context/FileContext';

interface FileCardProps {
  file: DriveFile;
}

export const FileCard = ({ file }: FileCardProps) => {
  const { deleteFile, previewFile } = useFiles();

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'document': return <FileText className="w-8 h-8 text-blue-600" />;
      case 'folder': return <Folder className="w-8 h-8 text-yellow-500 fill-current" />;
      case 'video': return <Film className="w-8 h-8 text-purple-500" />;
      case 'audio': return <Music className="w-8 h-8 text-green-500" />;
      case 'other': return <Archive className="w-8 h-8 text-gray-500" />;
      default: return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div 
      onClick={() => previewFile(file)}
      className="group relative flex flex-col p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          {getFileIcon(file.type)}
        </div>
        
        <button
          onClick={(e) => {
            // Previene la propagación del evento hacia el contenedor padre para evitar abrir la vista previa
            e.stopPropagation();
            deleteFile(file.id);
          }}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all focus:opacity-100"
          title="Eliminar archivo"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="mt-auto">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate mb-1" title={file.name}>
          {file.name}
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {formatFileDate(file.createdAt)} &bull; {formatFileSize(file.size)}
        </div>
      </div>
    </div>
  );
};