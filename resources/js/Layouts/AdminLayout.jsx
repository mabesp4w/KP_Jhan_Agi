import { Link, router, usePage } from '@inertiajs/react';
import { Building2, GraduationCap, Images, LayoutDashboard, LogOut, MapPin, Menu, School, UserCog, Users, X } from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ children, title = 'Admin Dashboard' }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    // Get current pathname for active state checking
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    // Helper to safely get route URL
    const getRouteUrl = (routeName, fallbackUrl) => {
        try {
            if (typeof route === 'function') {
                const url = route(routeName);
                // If route returns '#' or empty, use fallback URL
                if (url && url !== '#') {
                    return url;
                }
            }
            // Always use fallback URL if route helper fails
            return fallbackUrl || '#';
        } catch (error) {
            console.warn(`Route helper failed for: ${routeName}`, error);
            // Always use fallback URL on error
            return fallbackUrl || '#';
        }
    };

    const menuItems = [
        {
            name: 'Dashboard',
            href: getRouteUrl('admin.dashboard', '/admin/dashboard'),
            icon: LayoutDashboard,
            active: currentPath === '/admin/dashboard',
        },
        {
            name: 'Kecamatan',
            href: getRouteUrl('admin.kecamatan.index', '/admin/kecamatan'),
            icon: MapPin,
            active: currentPath.startsWith('/admin/kecamatan'),
        },
        {
            name: 'Kelurahan',
            href: getRouteUrl('admin.kelurahan.index', '/admin/kelurahan'),
            icon: Building2,
            active: currentPath.startsWith('/admin/kelurahan'),
        },
        {
            name: 'Sekolah',
            href: getRouteUrl('admin.sekolah.index', '/admin/sekolah'),
            icon: School,
            active: currentPath.startsWith('/admin/sekolah'),
        },
        {
            name: 'Kepala Sekolah',
            href: getRouteUrl('admin.kepsek.index', '/admin/kepsek'),
            icon: UserCog,
            active: currentPath.startsWith('/admin/kepsek'),
        },
        {
            name: 'Data Siswa',
            href: getRouteUrl('admin.data-siswa.index', '/admin/data-siswa'),
            icon: Users,
            active: currentPath.startsWith('/admin/data-siswa'),
        },
        {
            name: 'Data GTK',
            href: getRouteUrl('admin.data-gtk.index', '/admin/data-gtk'),
            icon: GraduationCap,
            active: currentPath.startsWith('/admin/data-gtk'),
        },
        {
            name: 'Galeri',
            href: getRouteUrl('admin.galeri.index', '/admin/galeri'),
            icon: Images,
            active: currentPath.startsWith('/admin/galeri'),
        },
    ];

    return (
        <div className="min-h-screen bg-base-200">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-base-100 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Sidebar Header */}
                    <div className="flex h-16 items-center justify-between border-b border-base-300 px-4">
                        <Link
                            href={getRouteUrl('admin.dashboard', '/admin/dashboard')}
                            className="flex items-center gap-2 text-lg font-bold text-primary"
                        >
                            <img 
                                src="/images/logo.png" 
                                alt="Logo SIG SMP YPK Jayapura" 
                                className="h-8 w-8 object-contain"
                            />
                            <span className="hidden lg:inline">Admin Panel</span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="btn btn-ghost btn-sm lg:hidden">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="menu space-y-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isPlaceholder = item.href === '#';

                                return (
                                    <li key={item.name}>
                                        {isPlaceholder ? (
                                            <span
                                                className={`flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 opacity-50 transition-colors ${
                                                    item.active ? 'bg-primary text-primary-content' : ''
                                                }`}
                                                title="Fitur akan segera tersedia"
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                                                    item.active ? 'bg-primary text-primary-content' : 'hover:bg-base-300'
                                                }`}
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span>{item.name}</span>
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Navbar */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-base-300 bg-base-100 px-4 shadow-sm">
                    <button onClick={() => setSidebarOpen(true)} className="btn btn-ghost btn-sm lg:hidden">
                        <Menu className="h-5 w-5" />
                    </button>
                    <h1 className="text-xl font-semibold lg:text-2xl">{title}</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={handleLogout} className="btn text-error btn-ghost btn-sm hover:bg-error/10">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-6">{children}</main>
            </div>
        </div>
    );
}
