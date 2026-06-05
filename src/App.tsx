import { LayoutGrid, List } from 'lucide-react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { FileProvider, useFiles } from './context/FileContext';
import { ThemeProvider } from './context/ThemeContext';
import { FileGrid } from './components/file-manager/FileGrid';
import { FileList } from './components/file-manager/FileList';

// Creamos un sub-componente interno para poder usar el hook de nuestro contexto
const DriveContent = () => {
  const { viewMode, setViewMode } = useFiles();

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Drive</h1>
        
        {/* Controles de vista */}
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
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

      {/* Aquí decidiremos qué vista mostrar */}
      {viewMode === 'grid' ? (
        <FileGrid />
      ) : (
        <FileList />
      )}
    </>
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