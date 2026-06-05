import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DriveFile, ViewMode, SortField, SortOrder } from '../types/file.types';
import { INITIAL_FILES } from '../utils/mockData';
import { ConfirmModal } from '../components/ui/ConfirmModal';

interface FileContextType {
  files: DriveFile[];
  viewMode: ViewMode;
  searchQuery: string;
  sortBy: SortField;
  sortOrder: SortOrder;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  deleteFile: (id: string) => void;
  uploadFile: (file: Omit<DriveFile, 'id' | 'createdAt'>) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<DriveFile[]>(INITIAL_FILES);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // NUEVO: Estado para saber qué archivo está pendiente de borrarse
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  // NUEVO: Ahora deleteFile solo pausa la acción y abre el modal
  const deleteFile = (id: string) => {
    setFileToDelete(id);
  };

  // NUEVO: Esta es la función que realmente borra el archivo
  const confirmDelete = () => {
    if (fileToDelete) {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileToDelete));
      setFileToDelete(null); // Cierra el modal
    }
  };

  // NUEVO: Función para cancelar
  const cancelDelete = () => {
    setFileToDelete(null); // Cierra el modal sin hacer nada
  };

  const uploadFile = (newFileData: Omit<DriveFile, 'id' | 'createdAt'>) => {
    const newFile: DriveFile = {
      ...newFileData,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
    };
    setFiles(prevFiles => [newFile, ...prevFiles]);
  };

  return (
    <FileContext.Provider value={{
      files, viewMode, searchQuery, sortBy, sortOrder,
      setViewMode, setSearchQuery, setSortBy, setSortOrder,
      deleteFile, uploadFile
    }}>
      {children}
      
      {/* Inyectamos el modal a nivel global */}
      <ConfirmModal 
        isOpen={fileToDelete !== null}
        title="Eliminar archivo"
        message="¿Estás seguro de que quieres eliminar este archivo? Esta acción no se puede deshacer y se perderá de forma permanente."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles debe usarse dentro de un FileProvider');
  }
  return context;
};