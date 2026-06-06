import { Home, HardDrive, Users, Trash2, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: 'Inicio' },
    { icon: HardDrive, label: 'Mi Drive' },
    { icon: Users, label: 'Compartidos' },
    { icon: Trash2, label: 'Papelera' },
    { icon: Settings, label: 'Configuración' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleSidebar} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Internxt</span>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <a key={item.label} href="#" className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <item.icon className="w-5 h-5 mr-3 text-gray-500" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};