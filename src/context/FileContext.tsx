import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DriveFile, ViewMode, SortField, SortOrder } from '../types/file.types';
import { INITIAL_FILES } from '../utils/mockData';

// 1. Definimos qué datos e instrucciones va a guardar nuestro estado global
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

// 2. Creamos el contexto vacío
const FileContext = createContext<FileContextType | undefined>(undefined);

// 3. Creamos el Proveedor (El componente que abrazará a nuestra app y le dará los datos)
export const FileProvider = ({ children }: { children: ReactNode }) => {
  // Cargamos nuestros archivos de mentira al principio
  const [files, setFiles] = useState<DriveFile[]>(INITIAL_FILES);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Función para borrar (filtra el array quitando el id que le pasamos)
  const deleteFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  // Función para simular la subida (crea un ID y fecha falsos y lo mete el primero)
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
    </FileContext.Provider>
  );
};

// 4. Creamos un Hook personalizado para usar estos datos fácilmente en cualquier parte
export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles debe usarse dentro de un FileProvider');
  }
  return context;
};