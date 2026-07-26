import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut,
  Menu,
  X,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  Bell
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const mockUsers = [
  { id: 1, name: 'Jean Dupont', email: 'jean@example.com', role: 'Admin', status: 'Actif', date: '2023-10-12' },
  { id: 2, name: 'Alice Martin', email: 'alice@example.com', role: 'Utilisateur', status: 'Inactif', date: '2023-10-15' },
  { id: 3, name: 'Marie Curie', email: 'marie@example.com', role: 'Éditeur', status: 'Actif', date: '2023-10-20' },
  { id: 4, name: 'Paul Bernard', email: 'paul@example.com', role: 'Utilisateur', status: 'Actif', date: '2023-10-21' },
];

const mockTransactions = [
  { id: 'TRX-001', client: 'Acme Corp', amount: '$1,200', date: '2023-10-21', status: 'Complété' },
  { id: 'TRX-002', client: 'Global Tech', amount: '$3,450', date: '2023-10-22', status: 'En attente' },
  { id: 'TRX-003', client: 'Stark Industries', amount: '$850', date: '2023-10-23', status: 'Complété' },
  { id: 'TRX-004', client: 'Wayne Enterprises', amount: '$5,000', date: '2023-10-24', status: 'Échoué' },
];

const mockNotifications = [
  { id: 1, title: 'Nouveau message', message: 'Jean Dupont a envoyé un message', time: 'Il y a 5 min', unread: true },
  { id: 2, title: 'Alerte système', message: 'Mise à jour planifiée à 02:00', time: 'Il y a 1 heure', unread: true },
  { id: 3, title: 'Transaction réussie', message: 'Le paiement de Acme Corp a été validé', time: 'Il y a 2 heures', unread: false },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Vue d\'ensemble');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    // Fetch stats from Express backend
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard stats:", err);
        setLoading(false);
      });
  }, []);

  const navigation = [
    { name: 'Vue d\'ensemble', icon: LayoutDashboard },
    { name: 'Utilisateurs', icon: Users },
    { name: 'Transactions', icon: DollarSign },
    { name: 'Paramètres', icon: Settings },
  ];

  const handleExportData = () => {
    if (!stats) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Rapport d'activite\n\n";
    
    csvContent += "Resume\n";
    csvContent += `Revenus Totaux,"${stats.revenue?.total}"\n`;
    csvContent += `Utilisateurs Actifs,"${stats.users?.active}"\n`;
    csvContent += `Nouveaux Projets,"${stats.projects?.new}"\n`;
    csvContent += `Taux de Conversion,"${stats.conversionRate}"\n\n`;

    csvContent += "Evolution des Revenus\n";
    csvContent += "Mois,Revenus\n";
    stats.revenueData?.forEach((row: any) => {
      csvContent += `${row.name},${row.value}\n`;
    });
    csvContent += "\n";

    csvContent += "Acquisition Utilisateurs\n";
    csvContent += "Jour,Utilisateurs\n";
    stats.usersData?.forEach((row: any) => {
      csvContent += `${row.name},${row.value}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rapport_activite.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTransactions = mockTransactions.filter(t => 
    t.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRevenueData = stats?.revenueData?.filter((d: any) => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredUsersData = stats?.usersData?.filter((d: any) => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
            HardSoft Admin
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === item.name
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors">
            <LogOut size={20} />
            Retour au site
          </a>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-col bg-white dark:bg-slate-950">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="text-white" size={24} />
              </button>
            </div>
            
            <div className="p-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                HardSoft Admin
              </span>
            </div>
            
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    activeTab === item.name
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors">
                <LogOut size={20} />
                Retour au site
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 flex-1">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-200 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                className="bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 block w-full pl-10 p-2.5"
                placeholder="Rechercher (Utilisateurs, Transactions, Mois)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                        {unreadCount > 0 && (
                          <button 
                            onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            Tout marquer comme lu
                          </button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div 
                              key={notification.id} 
                              className={`p-4 border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${notification.unread ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                              onClick={() => setNotifications(notifications.map(n => n.id === notification.id ? { ...n, unread: false } : n))}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className={`text-sm font-medium ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                  {notification.title}
                                </h4>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap">{notification.time}</span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{notification.message}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-slate-500 text-sm">
                            Aucune notification
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold">
                AD
              </div>
              <span className="text-sm font-medium hidden sm:block">Administrateur</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tableau de bord</h1>
              <p className="text-slate-500 dark:text-slate-400">Voici un aperçu de l'activité de vos services.</p>
            </div>
            <button 
              onClick={handleExportData}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download size={18} />
              Exporter les données
            </button>
          </div>

          {activeTab === 'Vue d\'ensemble' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenus Totaux</h3>
                    <DollarSign className="text-emerald-500" size={20} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats?.revenue?.total || '$12,450'}</span>
                    <span className="flex items-center text-sm font-medium text-emerald-500">
                      <ArrowUpRight size={16} />
                      12.5%
                    </span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Utilisateurs Actifs</h3>
                    <Users className="text-indigo-500" size={20} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats?.users?.active || '1,245'}</span>
                    <span className="flex items-center text-sm font-medium text-emerald-500">
                      <ArrowUpRight size={16} />
                      8.2%
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Nouveaux Projets</h3>
                    <LayoutDashboard className="text-cyan-500" size={20} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats?.projects?.new || '45'}</span>
                    <span className="flex items-center text-sm font-medium text-rose-500">
                      <ArrowDownRight size={16} />
                      2.4%
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Taux de Conversion</h3>
                    <Activity className="text-amber-500" size={20} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{stats?.conversionRate || '4.6%'}</span>
                    <span className="flex items-center text-sm font-medium text-emerald-500">
                      <ArrowUpRight size={16} />
                      1.2%
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <h3 className="text-lg font-bold mb-6">Évolution des Revenus</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filteredRevenueData.length > 0 ? filteredRevenueData : (stats?.revenueData || [])} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                          itemStyle={{ color: '#818cf8' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <h3 className="text-lg font-bold mb-6">Acquisition Utilisateurs</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={filteredUsersData.length > 0 ? filteredUsersData : (stats?.usersData || [])} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                          cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                        />
                        <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {activeTab === 'Utilisateurs' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold">Gestion des Utilisateurs</h3>
                <div className="sm:hidden relative w-48">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search size={14} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white text-xs rounded-lg focus:ring-2 focus:ring-indigo-500 block w-full pl-8 p-1.5"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50 uppercase border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Nom</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Rôle</th>
                      <th className="px-6 py-4">Statut</th>
                      <th className="px-6 py-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                      <tr key={user.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="px-6 py-4 font-medium">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Actif' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.date}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Aucun résultat pour "{searchQuery}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'Transactions' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold">Historique des Transactions</h3>
                <div className="sm:hidden relative w-48">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search size={14} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white text-xs rounded-lg focus:ring-2 focus:ring-indigo-500 block w-full pl-8 p-1.5"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-900/50 uppercase border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Montant</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length > 0 ? filteredTransactions.map(trx => (
                      <tr key={trx.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                        <td className="px-6 py-4 font-medium">{trx.id}</td>
                        <td className="px-6 py-4">{trx.client}</td>
                        <td className="px-6 py-4 font-bold">{trx.amount}</td>
                        <td className="px-6 py-4">{trx.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            trx.status === 'Complété' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            trx.status === 'En attente' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                            'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                          }`}>
                            {trx.status}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">Aucun résultat pour "{searchQuery}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'Paramètres' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold">Paramètres du compte</h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Profil</h4>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xl">
                      AD
                    </div>
                    <div>
                      <div className="font-bold">Administrateur</div>
                      <div className="text-sm text-slate-500">admin@hardsoft.com</div>
                    </div>
                    <button className="ml-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                      Modifier
                    </button>
                  </div>
                </div>
                <hr className="border-slate-200 dark:border-slate-800" />
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Préférences</h4>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700" defaultChecked />
                      <span className="text-sm">Recevoir les notifications par email</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700" defaultChecked />
                      <span className="text-sm">Activer le mode sombre automatique</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
