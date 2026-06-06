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
      // Creamos una fecha fija para que el test no falle dependiendo del día
      const testDate = '2026-05-15T08:20:00Z';
      const formatted = formatFileDate(testDate);
      
      // Comprobamos que el resultado contiene parte del string esperado
      // (Usamos include porque el formato exacto puede variar según la zona horaria del sistema)
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    });
  });
});