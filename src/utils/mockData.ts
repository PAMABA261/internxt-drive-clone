import type { DriveFile } from '../types/file.types';

export const INITIAL_FILES: DriveFile[] = [
  {
    id: '1',
    name: 'Proyectos 2026',
    type: 'folder',
    size: 0,
    createdAt: '2026-06-01T10:30:00Z',
  },
  {
    id: '2',
    name: 'Documentos Personales',
    type: 'folder',
    size: 0,
    createdAt: '2026-05-15T08:20:00Z',
  },
  {
    id: '3',
    name: 'Factura_Internxt_Mayo.pdf',
    type: 'pdf',
    size: 1024 * 450, // 450 KB
    createdAt: '2026-06-05T09:00:00Z',
  },
  {
    id: '4',
    name: 'Diseño_Dashboard_Final.jpg',
    type: 'image',
    size: 1024 * 1024 * 2.5, // 2.5 MB
    createdAt: '2026-06-04T16:45:00Z',
  },
  {
    id: '5',
    name: 'Contrato_Laboral_Firmado.pdf',
    type: 'pdf',
    size: 1024 * 850, // 850 KB
    createdAt: '2026-05-20T11:15:00Z',
  },
  {
    id: '6',
    name: 'Video_Demo_Producto.mp4',
    type: 'video',
    size: 1024 * 1024 * 45.2, // 45.2 MB
    createdAt: '2026-05-28T14:30:00Z',
  },
  {
    id: '7',
    name: 'Presupuesto_Q3.docx',
    type: 'document',
    size: 1024 * 120, // 120 KB
    createdAt: '2026-06-02T10:00:00Z',
  },
  {
    id: '8',
    name: 'Entrevista_Usuario_1.mp3',
    type: 'audio',
    size: 1024 * 1024 * 5.8, // 5.8 MB
    createdAt: '2026-05-25T17:20:00Z',
  },
  {
    id: '9',
    name: 'Backup_Base_Datos_Prod.zip',
    type: 'other',
    size: 1024 * 1024 * 128, // 128 MB
    createdAt: '2026-06-06T01:00:00Z',
  },
  {
    id: '10',
    name: 'Avatar_Perfil_Nuevo.png',
    type: 'image',
    size: 1024 * 512, // 512 KB
    createdAt: '2026-06-03T12:10:00Z',
  },
  {
    id: '11',
    name: 'Notas_Reunion_Kickoff.txt',
    type: 'document',
    size: 1024 * 15, // 15 KB
    createdAt: '2026-05-18T09:45:00Z',
  },
  {
    id: '12',
    name: 'Manual_Estilo_Marca.pdf',
    type: 'pdf',
    size: 1024 * 1024 * 8.4, // 8.4 MB
    createdAt: '2026-04-10T08:30:00Z',
  },
  {
    id: '13',
    name: 'Guia_Onboarding.docx',
    type: 'document',
    size: 1024 * 340, // 340 KB
    createdAt: '2026-05-05T15:20:00Z',
  },
  {
    id: '14',
    name: 'Logo_Vectorial.svg',
    type: 'image',
    size: 1024 * 85, // 85 KB
    createdAt: '2026-03-22T11:00:00Z',
  },
  {
    id: '15',
    name: 'Podcast_Episodio_4.mp3',
    type: 'audio',
    size: 1024 * 1024 * 42, // 42 MB
    createdAt: '2026-04-28T18:00:00Z',
  },
  {
    id: '16',
    name: 'Animacion_Carga.gif',
    type: 'image',
    size: 1024 * 1024 * 1.2, // 1.2 MB
    createdAt: '2026-05-12T13:45:00Z',
  },
  {
    id: '17',
    name: 'Fotos Vacaciones 2025',
    type: 'folder',
    size: 0,
    createdAt: '2025-08-15T10:00:00Z',
  },
  {
    id: '18',
    name: 'Certificado_Ingles_C1.pdf',
    type: 'pdf',
    size: 1024 * 600, // 600 KB
    createdAt: '2026-01-20T09:15:00Z',
  },
  {
    id: '19',
    name: 'Borrador_Tesis_Final.docx',
    type: 'document',
    size: 1024 * 1024 * 4.5, // 4.5 MB
    createdAt: '2026-03-10T16:30:00Z',
  },
  {
    id: '20',
    name: 'node_modules_backup.zip',
    type: 'other',
    size: 1024 * 1024 * 256, // 256 MB
    createdAt: '2026-05-30T22:00:00Z',
  },
  {
    id: '21',
    name: 'Captura_Pantalla_Error_Login.png',
    type: 'image',
    size: 1024 * 210, // 210 KB
    createdAt: '2026-06-06T00:15:00Z',
  },
  {
    id: '22',
    name: 'Reunion_Q2_Grabada.mp4',
    type: 'video',
    size: 1024 * 1024 * 315, // 315 MB
    createdAt: '2026-04-05T11:00:00Z',
  },
  {
    id: '23',
    name: 'Nota_de_Voz_Idea_App.m4a',
    type: 'audio',
    size: 1024 * 1024 * 1.5, // 1.5 MB
    createdAt: '2026-05-29T19:45:00Z',
  },
  {
    id: '24',
    name: 'Gastos_Mensuales.xlsx',
    type: 'document',
    size: 1024 * 45, // 45 KB
    createdAt: '2026-06-01T08:00:00Z',
  },
  {
    id: '25',
    name: 'Billetes_Avion_Londres.pdf',
    type: 'pdf',
    size: 1024 * 150, // 150 KB
    createdAt: '2026-05-10T14:20:00Z',
  },
  {
    id: '26',
    name: 'Mockup_App_v2.png',
    type: 'image',
    size: 1024 * 1024 * 3.8, // 3.8 MB
    createdAt: '2026-06-02T16:10:00Z',
  },
  {
    id: '27',
    name: 'Código_Fuente.zip',
    type: 'other',
    size: 1024 * 1024 * 15, // 15 MB
    createdAt: '2025-06-02T16:10:00Z',
  }
];