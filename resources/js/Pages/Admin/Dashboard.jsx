import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { Users, School, UserCog, GraduationCap, TrendingUp, MapPin, Building2, Images, Plus } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';

export default function AdminDashboard({ auth, stats = {}, sekolahTerbaru = [], statistikKecamatan = [] }) {
    useEffect(() => {
        AOS.refresh();
    }, []);

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

    return (
        <AdminLayout title="Dashboard Admin">
            <Head title="Dashboard Admin" />

            <div className="mx-auto max-w-7xl">
                {/* Welcome Alert */}
                <div className="mb-6" data-aos="fade-down">
                    <div className="alert alert-info">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-6 w-6 shrink-0 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                        <span>Selamat datang, {auth.user.name}! Anda login sebagai Admin.</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card data-aos="fade-up" data-aos-delay="0">
                        <CardBody>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-base-content/70">Total Sekolah</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.total_sekolah || 0}</p>
                                    <p className="text-xs text-base-content/60 mt-1">
                                        {stats.total_sekolah_aktif || 0} aktif
                                    </p>
                                </div>
                                <div className="rounded-full bg-success/10 p-3">
                                    <School className="h-6 w-6 text-success" />
                                </div>
                            </div>
                            <Badge variant="success" className="mt-4">
                                Terdaftar
                            </Badge>
                        </CardBody>
                    </Card>

                    <Card data-aos="fade-up" data-aos-delay="100">
                        <CardBody>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-base-content/70">Total GTK</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.total_gtk || 0}</p>
                                </div>
                                <div className="rounded-full bg-accent/10 p-3">
                                    <GraduationCap className="h-6 w-6 text-accent" />
                                </div>
                            </div>
                            <Badge variant="info" className="mt-4">
                                Terdaftar
                            </Badge>
                        </CardBody>
                    </Card>

                    <Card data-aos="fade-up" data-aos-delay="200">
                        <CardBody>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-base-content/70">Total Siswa</p>
                                    <p className="mt-2 text-3xl font-bold">{stats.total_siswa || 0}</p>
                                </div>
                                <div className="rounded-full bg-primary/10 p-3">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            <Badge variant="primary" className="mt-4">
                                Terdaftar
                            </Badge>
                        </CardBody>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card data-aos="fade-right" data-aos-delay="400">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-2 gap-4">
                                <Link
                                    href={getRouteUrl('admin.kecamatan.index', '/admin/kecamatan')}
                                    className="w-full"
                                >
                                    <Button variant="primary" className="w-full">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        Kecamatan
                                    </Button>
                                </Link>
                                <Link
                                    href={getRouteUrl('admin.sekolah.index', '/admin/sekolah')}
                                    className="w-full"
                                >
                                    <Button variant="secondary" className="w-full">
                                        <School className="mr-2 h-4 w-4" />
                                        Sekolah
                                    </Button>
                                </Link>
                                <Link
                                    href={getRouteUrl('admin.data-siswa.index', '/admin/data-siswa')}
                                    className="w-full"
                                >
                                    <Button variant="accent" className="w-full">
                                        <Users className="mr-2 h-4 w-4" />
                                        Data Siswa
                                    </Button>
                                </Link>
                                <Link
                                    href={getRouteUrl('admin.galeri.index', '/admin/galeri')}
                                    className="w-full"
                                >
                                    <Button variant="outline" className="w-full">
                                        <Images className="mr-2 h-4 w-4" />
                                        Galeri
                                    </Button>
                                </Link>
                            </div>
                            <div className="mt-4">
                                <Link
                                    href={getRouteUrl('admin.kecamatan.create', '/admin/kecamatan/create')}
                                    className="w-full"
                                >
                                    <Button variant="primary" className="w-full" size="sm">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Data Baru
                                    </Button>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>

                    <Card data-aos="fade-left" data-aos-delay="400">
                        <CardHeader>
                            <CardTitle>Statistik</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between" data-aos="fade-in" data-aos-delay="500">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-base-content/50" />
                                        <span className="text-sm text-base-content/70">Kecamatan</span>
                                    </div>
                                    <span className="font-semibold">{stats.total_kecamatan || 0}</span>
                                </div>
                                <div className="flex items-center justify-between" data-aos="fade-in" data-aos-delay="600">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-base-content/50" />
                                        <span className="text-sm text-base-content/70">Kelurahan</span>
                                    </div>
                                    <span className="font-semibold">{stats.total_kelurahan || 0}</span>
                                </div>
                                <div className="flex items-center justify-between" data-aos="fade-in" data-aos-delay="700">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-base-content/50" />
                                        <span className="text-sm text-base-content/70">Data Siswa</span>
                                    </div>
                                    <span className="font-semibold">{stats.total_data_siswa || 0}</span>
                                </div>
                                <div className="flex items-center justify-between" data-aos="fade-in" data-aos-delay="800">
                                    <div className="flex items-center gap-2">
                                        <Images className="h-4 w-4 text-base-content/50" />
                                        <span className="text-sm text-base-content/70">Galeri Foto</span>
                                    </div>
                                    <span className="font-semibold">{stats.total_galeri || 0}</span>
                                </div>
                                <div className="flex items-center justify-between" data-aos="fade-in" data-aos-delay="900">
                                    <div className="flex items-center gap-2">
                                        <UserCog className="h-4 w-4 text-base-content/50" />
                                        <span className="text-sm text-base-content/70">Kepala Sekolah</span>
                                    </div>
                                    <span className="font-semibold">{stats.total_kepsek || 0}</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Sekolah Terbaru */}
                {sekolahTerbaru && sekolahTerbaru.length > 0 && (
                    <div className="mt-6" data-aos="fade-up" data-aos-delay="900">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Sekolah Terbaru</CardTitle>
                                    <Link
                                        href={getRouteUrl('admin.sekolah.index', '/admin/sekolah')}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-3">
                                    {sekolahTerbaru.map((sekolah, index) => (
                                        <div
                                            key={sekolah.id}
                                            className="flex items-center justify-between rounded-lg border border-base-300 p-3 hover:bg-base-200"
                                            data-aos="fade-in"
                                            data-aos-delay={900 + index * 50}
                                        >
                                            <div className="flex-1">
                                                <div className="font-semibold">{sekolah.nm_sekolah}</div>
                                                <div className="text-sm text-base-content/70">
                                                    {sekolah.kelurahan?.nm_kelurahan}
                                                    {sekolah.kelurahan?.kecamatan && `, ${sekolah.kelurahan.kecamatan.nm_kecamatan}`}
                                                </div>
                                            </div>
                                            <Link
                                                href={getRouteUrl('admin.sekolah.edit', `/admin/sekolah/${sekolah.id}/edit`)}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                Lihat
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}

                {/* Statistik Per Kecamatan */}
                {statistikKecamatan && statistikKecamatan.length > 0 && (
                    <div className="mt-6" data-aos="fade-up" data-aos-delay="1000">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Per Kecamatan</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-3">
                                    {statistikKecamatan.map((kecamatan, index) => (
                                        <div
                                            key={kecamatan.id}
                                            className="flex items-center justify-between rounded-lg border border-base-300 p-3"
                                            data-aos="fade-in"
                                            data-aos-delay={1000 + index * 50}
                                        >
                                            <div className="flex-1">
                                                <div className="font-semibold">{kecamatan.nm_kecamatan}</div>
                                                <div className="mt-1 flex gap-4 text-sm text-base-content/70">
                                                    <span>{kecamatan.kelurahan_count || 0} Kelurahan</span>
                                                    <span>{kecamatan.jumlah_sekolah || 0} Sekolah</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

