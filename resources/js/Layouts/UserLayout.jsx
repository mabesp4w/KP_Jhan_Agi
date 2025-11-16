import { Link, router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Building2, GraduationCap, Home, Images, Info, LogIn, LogOut, Menu, School, X } from 'lucide-react';
import { useState } from 'react';
import useAOS from '@/hooks/useAOS';

export default function UserLayout({ children, title = 'SIG SMP YPK Jayapura' }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useAOS();

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
                if (url && url !== '#') {
                    return url;
                }
            }
            return fallbackUrl || '#';
        } catch (error) {
            return fallbackUrl || '#';
        }
    };

    const menuItems = [
        {
            name: 'Beranda',
            href: getRouteUrl('home', '/') || getRouteUrl('user.dashboard', '/'),
            icon: Home,
            active: currentPath === '/' || currentPath === '/dashboard' || currentPath === '/user/dashboard',
        },
        {
            name: 'Sekolah',
            href: getRouteUrl('user.sekolah.index', '/sekolah'),
            icon: School,
            active: currentPath.startsWith('/sekolah'),
        },
        {
            name: 'Galeri',
            href: getRouteUrl('user.galeri.index', '/galeri'),
            icon: Images,
            active: currentPath.startsWith('/galeri'),
        },
        {
            name: 'Tentang',
            href: getRouteUrl('user.tentang', '/tentang'),
            icon: Info,
            active: currentPath === '/tentang',
        },
    ];

    return (
        <div className="min-h-screen bg-base-200">
            <Head title={title} />

            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-base-300 bg-base-100 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={getRouteUrl('home', '/') || getRouteUrl('user.dashboard', '/')}
                                className="flex items-center gap-2 text-xl font-bold text-primary"
                            >
                                <img 
                                    src="/images/logo.png" 
                                    alt="Logo SIG SMP YPK Jayapura" 
                                    className="h-10 w-10 object-contain"
                                />
                                <span className="hidden sm:inline">SIG SMP YPK Jayapura</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex md:items-center md:gap-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                                            item.active
                                                ? 'bg-primary text-primary-content'
                                                : 'text-base-content hover:bg-base-200'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Side - User Menu & Mobile Toggle */}
                        <div className="flex items-center gap-4">
                            {/* User Info (Desktop) */}
                            {auth?.user ? (
                                <div className="hidden items-center gap-3 md:flex">
                                    <div className="text-right">
                                        <div className="text-sm font-semibold">{auth.user.name}</div>
                                        <div className="text-xs text-base-content/70">
                                            {auth.user.role === 'admin' ? 'Admin' : auth.user.role === 'petugas' ? 'Petugas' : 'User'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                                        title="Logout"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href={getRouteUrl('login', '/login')}
                                    className="hidden btn btn-primary btn-sm md:flex items-center gap-2"
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>Login</span>
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="btn btn-ghost btn-sm md:hidden"
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="border-t border-base-300 bg-base-100 md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                                            item.active
                                                ? 'bg-primary text-primary-content'
                                                : 'text-base-content hover:bg-base-200'
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                            {auth?.user ? (
                                <>
                                    <div className="my-2 border-t border-base-300"></div>
                                    <div className="px-3 py-2">
                                        <div className="text-sm font-semibold">{auth.user.name}</div>
                                        <div className="text-xs text-base-content/70">
                                            {auth.user.role === 'admin' ? 'Admin' : auth.user.role === 'petugas' ? 'Petugas' : 'User'}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            setMobileMenuOpen(false);
                                            handleLogout(e);
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-error transition-colors hover:bg-error/10"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href={getRouteUrl('login', '/login')}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-colors hover:bg-primary/10"
                                >
                                    <LogIn className="h-5 w-5" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>

            {/* Footer */}
            <footer className="border-t border-base-300 bg-base-100 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-base-content/70">
                        <p>&copy; {new Date().getFullYear()} SIG SMP YPK Jayapura. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

