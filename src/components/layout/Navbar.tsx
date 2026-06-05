import { Menu, Search, Upload, User, Moon } from 'lucide-react';
import { useRef } from 'react';
import { useFiles } from '../../context/FileContext';
import type { FileType } from '../../types/file.types';

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar = ({ toggleSidebar }: NavbarProps) => {
  // Nos traemos las funciones de nuestro contexto
  const { searchQuery, setSearchQuery, uploadFile } = useFiles();
  
  // Referencia invisible para el input de archivo
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función que se ejecuta al pulsar el botón azul
  const handleUploadClick = () => {
    fileInputRef.current?.click(); // Simula un clic en el input oculto 
  };

  // Función que procesa el archivo cuando el usuario lo selecciona en su ordenador
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Intentamos adivinar el tipo de archivo para ponerle el icono correcto
      let fileType: FileType = 'other';
      if (file.type.startsWith('image/')) fileType = 'image';
      else if (file.type === 'application/pdf') fileType = 'pdf';
      else if (file.type.startsWith('video/')) fileType = 'video';
      else if (file.type.startsWith('audio/')) fileType = 'audio';
      else if (file.name.includes('.doc')) fileType = 'document';

      // Lo enviamos a nuestro disco duro virtual [cite: 20, 21, 22]
      uploadFile({
        name: file.name,
        size: file.size,
        type: fileType,
      });

      // Limpiamos el input por si quiere subir el mismo archivo otra vez
      event.target.value = '';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center flex-1">
        <button onClick={toggleSidebar} className="mr-4 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400">
          <Menu size={24} />
        </button>

        <div className="max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          {/* Conectamos el buscador al estado global */}
          <input 
            type="text" 
            placeholder="Buscar archivos..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        
        {/* Input de archivo oculto */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />

        <button 
          onClick={handleUploadClick}
          className="hidden sm:flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Subir archivo
        </button>
        
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
          <Moon className="w-5 h-5" />
        </button>
        
        <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};