import { useFiles } from '../../context/FileContext';
import { FileCard } from './FileCard';

export const FileGrid = () => {
  // Ahora nos traemos también el searchQuery (lo que escribe el usuario)
  const { files, searchQuery } = useFiles();

  // Filtramos los archivos: pasamos el nombre y la búsqueda a minúsculas para que no haya problemas con mayúsculas
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <p className="text-gray-500 dark:text-gray-400 font-medium">Esta carpeta está vacía</p>
      </div>
    );
  }

  // Si hay archivos pero ninguno coincide con la búsqueda
  if (filteredFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No se encontraron archivos que coincidan con "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {/* ¡Ojo aquí! Ahora mapeamos 'filteredFiles' en lugar de 'files' */}
      {filteredFiles.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
};