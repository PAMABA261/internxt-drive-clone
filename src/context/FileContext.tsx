import { createContext, useContext, useState, type ReactNode } from 'react';
import type { DriveFile, ViewMode, SortField, SortOrder } from '../types/file.types';
import { INITIAL_FILES } from '../utils/mockData';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { PreviewModal } from '../components/ui/PreviewModal';

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
  previewFile: (file: DriveFile) => void;
  uploadFile: (file: Omit<DriveFile, 'id' | 'createdAt'>) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<DriveFile[]>(INITIAL_FILES);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [fileToPreview, setFileToPreview] = useState<DriveFile | null>(null);

  const previewFile = (file: DriveFile) => setFileToPreview(file);

  const sortedFiles = [...files].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === 'size') {
      comparison = a.size - b.size;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const deleteFile = (id: string) => setFileToDelete(id);

  const confirmDelete = () => {
    if (fileToDelete) {
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileToDelete));
      setFileToDelete(null);
    }
  };

  const cancelDelete = () => setFileToDelete(null);

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
      files: sortedFiles,
      viewMode, searchQuery, sortBy, sortOrder,
      setViewMode, setSearchQuery, setSortBy, setSortOrder,
      deleteFile, previewFile, uploadFile 
    }}>
      {children}

      <ConfirmModal 
        isOpen={fileToDelete !== null}
        title="Eliminar archivo"
        message="¿Estás seguro de que quieres eliminar este archivo? Esta acción no se puede deshacer."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <PreviewModal 
        file={fileToPreview} 
        onClose={() => setFileToPreview(null)} 
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