import { useFiles } from '../../context/FileContext';
import { FileCard } from './FileCard';

export const FileGrid = () => {
  // Nos traemos la lista de archivos de nuestro estado global
  const { files } = useFiles();

  // Si no hay archivos, mostramos un mensaje vacío elegante
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <p className="text-gray-500 dark:text-gray-400 font-medium">Esta carpeta está vacía</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Sube archivos para empezar</p>
      </div>
    );
  }

  // Si hay archivos, dibujamos la cuadrícula responsive
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
};