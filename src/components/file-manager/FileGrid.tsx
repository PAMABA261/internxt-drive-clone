import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { FileCard } from './FileCard';

export const FileGrid = () => {
  const { files, searchQuery } = useFiles();
  
  // NUEVO: Estado para saber cuántos archivos mostramos (empezamos con 12)
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // NUEVO: Cortamos la lista de archivos para mostrar solo los visibles
  const displayedFiles = filteredFiles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFiles.length;

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <p className="text-gray-500 dark:text-gray-400 font-medium">Esta carpeta está vacía</p>
      </div>
    );
  }

  if (filteredFiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400 font-medium">No se encontraron archivos que coincidan con "{searchQuery}"</p>
      </div>
    );
  }

  return (
    <div className="pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedFiles.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
      
      {/* NUEVO: Botón Cargar Más */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            Cargar más archivos
          </button>
        </div>
      )}
    </div>
  );
};