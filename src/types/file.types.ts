export type FileType = 'image' | 'document' | 'pdf' | 'folder' | 'video' | 'audio' | 'other';

export interface DriveFile {
  id: string;
  name: string;
  size: number; 
  type: FileType;
  createdAt: string; 
}

export type ViewMode = 'grid' | 'list';
export type SortField = 'name' | 'date' | 'size';
export type SortOrder = 'asc' | 'desc';