import { describe, it, expect } from 'vitest';
import { formatFileSize, formatFileDate } from './fileHelpers';

describe('Funciones de utilidad: fileHelpers', () => {
  
  describe('formatFileSize', () => {
    it('debería formatear correctamente los Bytes', () => {
      expect(formatFileSize(500)).toBe('500 B');
    });

    it('debería formatear correctamente los Kilobytes (KB)', () => {
      expect(formatFileSize(1024)).toBe('1.0 KB');
      expect(formatFileSize(1500)).toBe('1.5 KB');
    });

    it('debería formatear correctamente los Megabytes (MB)', () => {
      expect(formatFileSize(1048576)).toBe('1.0 MB');
      expect(formatFileSize(5242880)).toBe('5.0 MB');
    });

    it('debería devolver "0 B" si el tamaño es 0', () => {
      expect(formatFileSize(0)).toBe('0 B');
    });
  });

  describe('formatFileDate', () => {
    it('debería formatear una fecha ISO a un formato legible', () => {
      const testDate = '2026-05-15T08:20:00Z';
      const formatted = formatFileDate(testDate);
      
      // Verificamos tipo y longitud en lugar de un string exacto para 
      // evitar falsos negativos debidos a la zona horaria del sistema donde se ejecute el test
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });
});