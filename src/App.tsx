import { useState, useRef, type DragEvent } from 'react';
import { LayoutGrid, List, UploadCloud } from 'lucide-react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { FileProvider, useFiles } from './context/FileContext';
import { ThemeProvider } from './context/ThemeContext';
import { FileGrid } from './components/file-manager/FileGrid';
import { FileList } from './components/file-manager/FileList';
import { SortControl } from './components/file-manager/SortControl';
import type { FileType } from './types/file.types';

const DriveContent = () => {
  const { viewMode, setViewMode, uploadFile } = useFiles();
  const [isDragging, setIsDragging] = useState(false);
  
  // NUEVO: El contador inteligente para evitar el parpadeo
  const dragCounter = useRef(0);

  // NUEVO: Manejador de entrada
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current += 1;
    // Solo activamos la pantalla si lo que arrastran son archivos reales
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  // ACTUALIZADO: Solo prevenimos el comportamiento por defecto
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  // ACTUALIZADO: Manejador de salida usando el contador
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current -= 1;
    // Solo ocultamos la pantalla si hemos salido completamente de todo
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0; // Reiniciamos el contador por seguridad
    setIsDragging(false); 

    const droppedFiles = Array.from(e.dataTransfer.files);
    
    droppedFiles.forEach(file => {
      let fileType: FileType = 'other';
      if (file.type.startsWith('image/')) fileType = 'image';
      else if (file.type === 'application/pdf') fileType = 'pdf';
      else if (file.type.startsWith('video/')) fileType = 'video';
      else if (file.type.startsWith('audio/')) fileType = 'audio';
      else if (file.name.includes('.doc')) fileType = 'document';

      uploadFile({
        name: file.name,
        size: file.size,
        type: fileType,
      });
    });
  };

  return (
    <div 
      className="relative min-h-[calc(100vh-8rem)] rounded-xl transition-all"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      
      {isDragging && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-50/90 dark:bg-blue-900/90 border-4 border-dashed border-blue-500 rounded-2xl backdrop-blur-sm animate-in fade-in duration-200">
          <div className="pointer-events-none flex flex-col items-center">
            <UploadCloud className="w-16 h-16 text-blue-600 dark:text-blue-400 mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Suelta tus archivos aquí</h2>
            <p className="text-blue-600 dark:text-blue-300 mt-2">Se subirán automáticamente a tu Drive</p>
          </div>
        </div>
      )}

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 pointer-events-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Drive</h1>
        
        {/* Controles: Ordenación y Vista */}
        <div className="flex items-center space-x-3">
          
          <SortControl /> 

          {/* Botones de Vista */}
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 h-10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              title="Vista de cuadrícula"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              title="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 pointer-events-auto">
        {viewMode === 'grid' ? <FileGrid /> : <FileList />}
      </div>
      
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <FileProvider>
        <DashboardLayout>
          <DriveContent />
        </DashboardLayout>
      </FileProvider>
    </ThemeProvider>
  );
}

export default App;