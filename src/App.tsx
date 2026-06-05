import { DashboardLayout } from './components/layout/DashboardLayout';
import { FileProvider } from './context/FileContext';
import { FileGrid } from './components/file-manager/FileGrid'; // Importamos el grid

function App() {
  return (
    <FileProvider>
      <DashboardLayout>
        
        {/* Cabecera de la sección */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mi Drive</h1>
        </div>

        {/* Aquí inyectamos nuestro tablero de archivos real */}
        <FileGrid />

      </DashboardLayout>
    </FileProvider>
  );
}

export default App;