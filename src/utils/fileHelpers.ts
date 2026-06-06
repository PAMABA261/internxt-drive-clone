export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  // Si es menor que 1 KB, mostramos solo B sin decimales
  if (bytes < k) return `${bytes} B`;

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  // Calculamos el índice para saber si son KB, MB, etc.
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Devolvemos el número con 1 decimal exacto y su unidad
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

export const formatFileDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};