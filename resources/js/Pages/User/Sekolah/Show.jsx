import MapView from '@/Components/maps/MapView';
import Badge from '@/Components/ui/Badge';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import useAOS from '@/hooks/useAOS';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Globe, GraduationCap, Mail, MapPin, Phone, School, UserCheck } from 'lucide-react';
import { useState } from 'react';
import 'yet-another-react-lightbox/styles.css';

export default function SekolahShow({ sekolah, kepsek, galeris, sekolahsForMap = [], dataSiswa = [], dataGtk = [] }) {
    useAOS();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

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

    const getAkreditasiBadge = (akreditasi) => {
        const colors = {
            A: 'success',
            B: 'info',
            C: 'warning',
            Belum: 'error',
        };
        return <Badge variant={colors[akreditasi] || 'error'}>{akreditasi || 'Belum'}</Badge>;
    };

    return (
        <UserLayout title={sekolah.nm_sekolah}>
            <Head title={`${sekolah.nm_sekolah} - SIG SMP YPK Jayapura`} />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-6" data-aos="fade-down">
                    <Link
                        href={getRouteUrl('user.sekolah.index', '/sekolah')}
                        className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Daftar Sekolah
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8" data-aos="fade-down" data-aos-delay="100">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                        {sekolah.foto_utama && (
                            <div className="h-48 w-full overflow-hidden rounded-lg md:h-64 md:w-96">
                                <img src={`/storage/${sekolah.foto_utama}`} alt={sekolah.nm_sekolah} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                                <h1 className="text-3xl font-bold">{sekolah.nm_sekolah}</h1>
                                {getAkreditasiBadge(sekolah.akreditasi)}
                            </div>
                            <div className="space-y-2 text-base-content/70">
                                <div className="flex items-center gap-2">
                                    <School className="h-5 w-5" />
                                    <span className="font-mono text-lg">{sekolah.npsn}</span>
                                </div>
                                {sekolah.kelurahan && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        <span>
                                            {sekolah.kelurahan.nm_kelurahan}
                                            {sekolah.kelurahan.kecamatan && `, ${sekolah.kelurahan.kecamatan.nm_kecamatan}`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Informasi Sekolah */}
                        <Card data-aos="fade-up" data-aos-delay="200">
                            <CardHeader>
                                <CardTitle>Informasi Sekolah</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold">Alamat</h3>
                                        <p className="text-base-content/70">{sekolah.alamat || '-'}</p>
                                    </div>
                                    {/* Peta Lokasi */}
                                    {sekolah.latitude && sekolah.longitude && (
                                        <div>
                                            <h3 className="mb-2 font-semibold">Lokasi</h3>
                                            <MapView
                                                sekolahs={sekolahsForMap}
                                                height="400px"
                                                centerLat={sekolah.latitude}
                                                centerLng={sekolah.longitude}
                                                zoom={15}
                                                highlightedSekolahId={sekolah.id}
                                                isActive={sekolah.status_sekolah === 'aktif'}
                                            />
                                            <p className="mt-2 text-xs text-base-content/60">
                                                <span className="mr-1 inline-block h-3 w-3 animate-pulse rounded-full bg-red-500"></span>
                                                Marker merah berkedip menunjukkan lokasi sekolah ini.
                                                <span className="mr-1 ml-2 inline-block h-3 w-3 rounded-full bg-blue-500"></span>
                                                Marker biru menunjukkan lokasi sekolah lain.
                                            </p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {sekolah.no_telp && (
                                            <div>
                                                <div className="flex items-center gap-2 font-semibold">
                                                    <Phone className="h-4 w-4" />
                                                    <span>Telepon</span>
                                                </div>
                                                <p className="text-base-content/70">{sekolah.no_telp}</p>
                                            </div>
                                        )}
                                        {sekolah.email && (
                                            <div>
                                                <div className="flex items-center gap-2 font-semibold">
                                                    <Mail className="h-4 w-4" />
                                                    <span>Email</span>
                                                </div>
                                                <p className="text-base-content/70">{sekolah.email}</p>
                                            </div>
                                        )}
                                        {sekolah.website && (
                                            <div>
                                                <div className="flex items-center gap-2 font-semibold">
                                                    <Globe className="h-4 w-4" />
                                                    <span>Website</span>
                                                </div>
                                                <a
                                                    href={sekolah.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    {sekolah.website}
                                                </a>
                                            </div>
                                        )}
                                        {sekolah.thn_berdiri && (
                                            <div>
                                                <div className="flex items-center gap-2 font-semibold">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>Tahun Berdiri</span>
                                                </div>
                                                <p className="text-base-content/70">{sekolah.thn_berdiri}</p>
                                            </div>
                                        )}
                                    </div>
                                    {sekolah.ket && (
                                        <div>
                                            <h3 className="font-semibold">Keterangan</h3>
                                            <p className="whitespace-pre-line text-base-content/70">{sekolah.ket}</p>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Data Siswa */}
                        {dataSiswa && dataSiswa.length > 0 && (
                            <Card data-aos="fade-up" data-aos-delay="300">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5" />
                                        Data Siswa
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="space-y-4">
                                        {dataSiswa.map((siswa, index) => {
                                            const totalSiswa7 = (siswa.jml_siswa_l_7 || 0) + (siswa.jml_siswa_p_7 || 0);
                                            const totalSiswa8 = (siswa.jml_siswa_l_8 || 0) + (siswa.jml_siswa_p_8 || 0);
                                            const totalSiswa9 = (siswa.jml_siswa_l_9 || 0) + (siswa.jml_siswa_p_9 || 0);
                                            const totalSiswa = totalSiswa7 + totalSiswa8 + totalSiswa9;
                                            const totalKelas = (siswa.jml_kelas_7 || 0) + (siswa.jml_kelas_8 || 0) + (siswa.jml_kelas_9 || 0);

                                            return (
                                                <div key={siswa.id} className={index > 0 ? 'border-t border-base-300 pt-4' : ''}>
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <h4 className="font-semibold">Tahun Ajaran: {siswa.thn_ajaran}</h4>
                                                        {index === 0 && <Badge variant="info">Terbaru</Badge>}
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                        {/* Kelas 7 */}
                                                        <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                            <div className="mb-2 text-sm font-semibold">Kelas 7</div>
                                                            <div className="space-y-1 text-sm">
                                                                <div>Kelas: {siswa.jml_kelas_7 || 0}</div>
                                                                <div className="text-base-content/70">
                                                                    Siswa: {totalSiswa7} ({siswa.jml_siswa_l_7 || 0}L / {siswa.jml_siswa_p_7 || 0}P)
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Kelas 8 */}
                                                        <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                            <div className="mb-2 text-sm font-semibold">Kelas 8</div>
                                                            <div className="space-y-1 text-sm">
                                                                <div>Kelas: {siswa.jml_kelas_8 || 0}</div>
                                                                <div className="text-base-content/70">
                                                                    Siswa: {totalSiswa8} ({siswa.jml_siswa_l_8 || 0}L / {siswa.jml_siswa_p_8 || 0}P)
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Kelas 9 */}
                                                        <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                            <div className="mb-2 text-sm font-semibold">Kelas 9</div>
                                                            <div className="space-y-1 text-sm">
                                                                <div>Kelas: {siswa.jml_kelas_9 || 0}</div>
                                                                <div className="text-base-content/70">
                                                                    Siswa: {totalSiswa9} ({siswa.jml_siswa_l_9 || 0}L / {siswa.jml_siswa_p_9 || 0}P)
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 flex items-center justify-between rounded-lg bg-primary/10 p-3">
                                                        <span className="font-semibold">Total</span>
                                                        <span className="text-lg font-bold text-primary">
                                                            {totalKelas} Kelas • {totalSiswa} Siswa
                                                        </span>
                                                    </div>
                                                    {siswa.ket && (
                                                        <div className="mt-2 text-sm text-base-content/70">
                                                            <strong>Keterangan:</strong> {siswa.ket}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Data GTK */}
                        {dataGtk && dataGtk.length > 0 && (
                            <Card data-aos="fade-up" data-aos-delay="400">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <UserCheck className="h-5 w-5" />
                                        Data GTK (Guru dan Tenaga Kependidikan)
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="space-y-4">
                                        {dataGtk.map((gtk, index) => {
                                            const totalGuru = (gtk.jml_guru_pns || 0) + (gtk.jml_guru_honor || 0) + (gtk.jml_guru_kontrak || 0);
                                            const totalTendik =
                                                (gtk.jml_tendik_pns || 0) + (gtk.jml_tendik_honor || 0) + (gtk.jml_tendik_kontrak || 0);
                                            const totalGTK = totalGuru + totalTendik;

                                            return (
                                                <div key={gtk.id} className={index > 0 ? 'border-t border-base-300 pt-4' : ''}>
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <h4 className="font-semibold">Tahun Ajaran: {gtk.thn_ajaran}</h4>
                                                        {index === 0 && <Badge variant="info">Terbaru</Badge>}
                                                    </div>

                                                    {/* Guru */}
                                                    <div className="mb-4">
                                                        <h5 className="mb-2 font-semibold text-primary">Guru</h5>
                                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">PNS</div>
                                                                <div className="text-lg font-bold">{gtk.jml_guru_pns || 0}</div>
                                                            </div>
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">Honor</div>
                                                                <div className="text-lg font-bold">{gtk.jml_guru_honor || 0}</div>
                                                            </div>
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">Kontrak</div>
                                                                <div className="text-lg font-bold">{gtk.jml_guru_kontrak || 0}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">S1</div>
                                                                <div className="text-lg font-bold">{gtk.jml_guru_s1 || 0}</div>
                                                            </div>
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">S2</div>
                                                                <div className="text-lg font-bold">{gtk.jml_guru_s2 || 0}</div>
                                                            </div>
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">Bersertifikasi</div>
                                                                <div className="text-lg font-bold">{gtk.jml_guru_sertifikasi || 0}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 rounded-lg bg-primary/10 p-3">
                                                            <span className="font-semibold">Total Guru: </span>
                                                            <span className="text-lg font-bold text-primary">{totalGuru}</span>
                                                        </div>
                                                    </div>

                                                    {/* Tenaga Kependidikan */}
                                                    <div>
                                                        <h5 className="mb-2 font-semibold text-primary">Tenaga Kependidikan</h5>
                                                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">PNS</div>
                                                                <div className="text-lg font-bold">{gtk.jml_tendik_pns || 0}</div>
                                                            </div>
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">Honor</div>
                                                                <div className="text-lg font-bold">{gtk.jml_tendik_honor || 0}</div>
                                                            </div>
                                                            <div className="rounded-lg border border-base-300 bg-base-100 p-3">
                                                                <div className="text-xs text-base-content/70">Kontrak</div>
                                                                <div className="text-lg font-bold">{gtk.jml_tendik_kontrak || 0}</div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 rounded-lg bg-primary/10 p-3">
                                                            <span className="font-semibold">Total Tendik: </span>
                                                            <span className="text-lg font-bold text-primary">{totalTendik}</span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between rounded-lg bg-success/10 p-3">
                                                        <span className="font-semibold">Total GTK</span>
                                                        <span className="text-lg font-bold text-success">{totalGTK}</span>
                                                    </div>

                                                    {gtk.ket && (
                                                        <div className="mt-2 text-sm text-base-content/70">
                                                            <strong>Keterangan:</strong> {gtk.ket}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Kepala Sekolah */}
                        {kepsek && (
                            <Card data-aos="fade-up" data-aos-delay="400">
                                <CardHeader>
                                    <CardTitle>Kepala Sekolah</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="text-center">
                                        {kepsek.foto && (
                                            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                                                <img src={`/storage/${kepsek.foto}`} alt={kepsek.nm_kepsek} className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        <h3 className="font-bold">{kepsek.nm_kepsek}</h3>
                                        {kepsek.nip && <p className="text-sm text-base-content/70">NIP: {kepsek.nip}</p>}
                                        {kepsek.pendidikan_terakhir && <p className="text-sm text-base-content/70">{kepsek.pendidikan_terakhir}</p>}
                                    </div>
                                </CardBody>
                            </Card>
                        )}

                        {/* Info Tambahan */}
                        <Card data-aos="fade-up" data-aos-delay="500">
                            <CardHeader>
                                <CardTitle>Informasi Tambahan</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="space-y-3">
                                    <div>
                                        <div className="text-sm font-semibold">Status</div>
                                        <Badge variant={sekolah.status_sekolah === 'aktif' ? 'success' : 'error'}>
                                            {sekolah.status_sekolah === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                        </Badge>
                                    </div>
                                    {sekolah.akreditasi && sekolah.akreditasi !== 'Belum' && (
                                        <div>
                                            <div className="text-sm font-semibold">Akreditasi</div>
                                            {getAkreditasiBadge(sekolah.akreditasi)}
                                            {sekolah.tgl_akreditasi && (
                                                <div className="mt-1 text-xs text-base-content/70">
                                                    {new Date(sekolah.tgl_akreditasi).toLocaleDateString('id-ID')}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {sekolah.latitude && sekolah.longitude && (
                                        <div>
                                            <div className="text-sm font-semibold">Koordinat</div>
                                            <div className="text-xs text-base-content/70">
                                                {sekolah.latitude}, {sekolah.longitude}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
