import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { School, Images, Users, TrendingUp, MapPin, Building2 } from 'lucide-react';
import useAOS from '@/hooks/useAOS';

export default function UserDashboard({ auth, stats }) {
    useAOS();

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

    const statsData = [
        {
            title: 'Total Sekolah',
            value: stats?.total_sekolah || 0,
            icon: School,
            color: 'primary',
            href: getRouteUrl('user.sekolah.index', '/sekolah'),
        },
        {
            title: 'Total Galeri',
            value: stats?.total_galeri || 0,
            icon: Images,
            color: 'success',
            href: getRouteUrl('user.galeri.index', '/galeri'),
        },
        {
            title: 'Total Kecamatan',
            value: stats?.total_kecamatan || 0,
            icon: MapPin,
            color: 'info',
        },
        {
            title: 'Total Kelurahan',
            value: stats?.total_kelurahan || 0,
            icon: Building2,
            color: 'warning',
        },
    ];

    return (
        <UserLayout title="Beranda">
            <Head title="Beranda - SIG SMP YPK Jayapura" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8" data-aos="fade-down">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-base-content">Selamat Datang</h1>
                        <p className="mt-2 text-lg text-base-content/70">
                            Sistem Informasi Geografis Berbasis Web untuk Pemetaan dan Pengelolaan Data Sekolah Menengah Pertama (SMP) Yayasan Pendidikan Kristen (YPK) Kota Jayapura
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {statsData.map((stat, index) => {
                        const Icon = stat.icon;
                        const colorClasses = {
                            primary: 'bg-primary/10 text-primary',
                            success: 'bg-success/10 text-success',
                            info: 'bg-info/10 text-info',
                            warning: 'bg-warning/10 text-warning',
                        };

                        return (
                            <Card key={stat.title} data-aos="fade-up" data-aos-delay={index * 100}>
                                <CardBody>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-base-content/70">{stat.title}</p>
                                            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                                        </div>
                                        <div className={`rounded-full p-3 ${colorClasses[stat.color]}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    {stat.href && (
                                        <Link href={stat.href} className="mt-4 block">
                                            <Button variant="ghost" size="sm" className="w-full">
                                                Lihat Detail
                                            </Button>
                                        </Link>
                                    )}
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card data-aos="fade-right" data-aos-delay="400">
                        <CardHeader>
                            <CardTitle>Akses Cepat</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-3">
                                <Link
                                    href={getRouteUrl('user.sekolah.index', '/sekolah')}
                                    className="flex items-center gap-3 rounded-lg border border-base-300 p-4 transition-colors hover:bg-base-200"
                                >
                                    <School className="h-5 w-5 text-primary" />
                                    <div className="flex-1">
                                        <div className="font-semibold">Daftar Sekolah</div>
                                        <div className="text-sm text-base-content/70">Lihat semua sekolah yang terdaftar</div>
                                    </div>
                                </Link>
                                <Link
                                    href={getRouteUrl('user.galeri.index', '/galeri')}
                                    className="flex items-center gap-3 rounded-lg border border-base-300 p-4 transition-colors hover:bg-base-200"
                                >
                                    <Images className="h-5 w-5 text-success" />
                                    <div className="flex-1">
                                        <div className="font-semibold">Galeri Foto</div>
                                        <div className="text-sm text-base-content/70">Lihat galeri foto sekolah</div>
                                    </div>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>

                    <Card data-aos="fade-left" data-aos-delay="400">
                        <CardHeader>
                            <CardTitle>Informasi</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Data Terbaru</div>
                                        <div className="text-sm text-base-content/70">
                                            Informasi sekolah selalu diperbarui secara berkala
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="h-5 w-5 text-success mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Akses Publik</div>
                                        <div className="text-sm text-base-content/70">
                                            Semua informasi dapat diakses oleh publik
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </UserLayout>
    );
}

