import { ArrowDown, ArrowUp } from 'lucide-react';
import { useFiles } from '../../context/FileContext';
import type { SortField } from '../../types/file.types';

export const SortControl = () => {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useFiles();

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-1 h-10">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortField)}
        className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 border-none focus:ring-0 cursor-pointer outline-none pl-3 pr-2"
      >
        <option value="name" className="bg-white dark:bg-gray-800">Nombre</option>
        <option value="date" className="bg-white dark:bg-gray-800">Fecha</option>
        <option value="size" className="bg-white dark:bg-gray-800">Tamaño</option>
      </select>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1"></div>

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title={sortOrder === 'asc' ? 'Orden ascendente' : 'Orden descendente'}
      >
        {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
      </button>
    </div>
  );
};