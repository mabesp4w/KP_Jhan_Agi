import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import { Info, Target, Users, Award, Building2, UserCircle } from 'lucide-react';
import useAOS from '@/hooks/useAOS';

export default function Tentang() {
    useAOS();

    return (
        <UserLayout title="Tentang">
            <Head title="Tentang - SIG SMP YPK Jayapura" />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 text-center" data-aos="fade-down">
                    <h1 className="text-4xl font-bold text-base-content">
                        Sistem Informasi Geografis Berbasis Web
                    </h1>
                    <p className="mt-2 text-lg text-base-content/70">
                        Untuk Pemetaan dan Pengelolaan Data Sekolah Menengah Pertama (SMP) Yayasan Pendidikan Kristen (YPK) Kota Jayapura
                    </p>
                </div>

                {/* Visi Misi YPK */}
                <Card className="mb-6" data-aos="fade-up" data-aos-delay="100">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Visi & Misi YPK di Tanah Papua
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-6">
                            <div>
                                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary">
                                    <Target className="h-5 w-5" />
                                    Visi
                                </h3>
                                <p className="rounded-lg bg-primary/5 p-4 text-base font-medium text-base-content">
                                    YPK Bangkit dan Bergerak menuju Pendidikan Berkarakter Kristen dan Unggul di Tanah Papua.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary">
                                    <Target className="h-5 w-5" />
                                    Misi
                                </h3>
                                <ol className="space-y-3">
                                    <li className="flex gap-3">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-content">
                                            1
                                        </span>
                                        <p className="text-base-content/80">
                                            Menjadikan YPK di Tanah Papua mampu bersaing dalam ilmu pengetahuan, teknologi, dan seni baik di tingkat nasional maupun internasional pada tahun 2036.
                                        </p>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-content">
                                            2
                                        </span>
                                        <p className="text-base-content/80">
                                            Menjadikan YPK sebagai penghasil cendekiawan berkarakter Kristen dan unggul.
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Struktur Organisasi */}
                <Card className="mb-6" data-aos="fade-up" data-aos-delay="150">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Struktur Organisasi YPK di Tanah Papua
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4">
                            <p className="text-base-content/70">
                                Struktur organisasi Yayasan Pendidikan Kristen (YPK) di Tanah Papua terdiri dari berbagai komponen yang bekerja sama untuk mencapai visi dan misi yayasan.
                            </p>
                            <div className="rounded-lg border border-base-300 bg-base-100 p-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <UserCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                                        <div>
                                            <h4 className="font-semibold">Dewan Pengurus</h4>
                                            <p className="text-sm text-base-content/70">
                                                Bertanggung jawab atas pengelolaan dan pengembangan yayasan secara keseluruhan.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <UserCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                                        <div>
                                            <h4 className="font-semibold">Kepala Sekolah</h4>
                                            <p className="text-sm text-base-content/70">
                                                Memimpin dan mengelola operasional sekolah di masing-masing unit pendidikan.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <UserCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                                        <div>
                                            <h4 className="font-semibold">Guru dan Tenaga Kependidikan</h4>
                                            <p className="text-sm text-base-content/70">
                                                Melaksanakan proses pembelajaran dan administrasi pendidikan.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <UserCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                                        <div>
                                            <h4 className="font-semibold">Staf Administrasi</h4>
                                            <p className="text-sm text-base-content/70">
                                                Menangani administrasi dan manajemen yayasan serta sekolah.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-info/10 p-4">
                                <p className="text-sm text-base-content/80">
                                    <strong>Catatan:</strong> Untuk informasi lebih detail mengenai struktur organisasi dan susunan pengurus YPK di Tanah Papua, silakan hubungi kantor pusat YPK di Jl. Argapura No. 22, Kecamatan Abepura, Kota Jayapura, Provinsi Papua atau melalui email: ypkditanahpapua@gmail.com
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Tujuan Sistem */}
                <Card className="mb-6" data-aos="fade-up" data-aos-delay="200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Tujuan Sistem
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 font-semibold">Tujuan</h3>
                                <p className="text-base-content/70">
                                    Sistem ini dikembangkan untuk memudahkan pemetaan dan pengelolaan data sekolah SMP YPK di Kota Jayapura, 
                                    menyediakan akses informasi yang mudah dan transparan bagi masyarakat, serta mendukung pengambilan 
                                    keputusan yang tepat dalam pengelolaan pendidikan.
                                </p>
                            </div>
                            <div>
                                <h3 className="mb-2 font-semibold">Manfaat</h3>
                                <ul className="list-inside list-disc space-y-2 text-base-content/70">
                                    <li>Menyediakan informasi lengkap dan akurat tentang sekolah SMP YPK di Kota Jayapura</li>
                                    <li>Memudahkan masyarakat dalam mencari dan mengakses informasi sekolah</li>
                                    <li>Meningkatkan transparansi data pendidikan melalui sistem berbasis web</li>
                                    <li>Mendukung pengambilan keputusan yang tepat dalam pengelolaan pendidikan</li>
                                    <li>Memfasilitasi pemetaan geografis lokasi sekolah untuk perencanaan yang lebih baik</li>
                                </ul>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Fitur */}
                <Card className="mb-6" data-aos="fade-up" data-aos-delay="250">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Fitur Utama
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Data Sekolah Lengkap</h3>
                                    <p className="text-sm text-base-content/70">
                                        Informasi lengkap tentang sekolah termasuk profil, kontak, dan akreditasi
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-success/10 p-2">
                                    <Award className="h-5 w-5 text-success" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Galeri Foto</h3>
                                    <p className="text-sm text-base-content/70">
                                        Koleksi foto kegiatan, fasilitas, dan prestasi sekolah
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-info/10 p-2">
                                    <Target className="h-5 w-5 text-info" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Pencarian Cepat</h3>
                                    <p className="text-sm text-base-content/70">
                                        Fitur pencarian dan filter untuk menemukan sekolah dengan mudah
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-warning/10 p-2">
                                    <Info className="h-5 w-5 text-warning" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Akses Publik</h3>
                                    <p className="text-sm text-base-content/70">
                                        Semua informasi dapat diakses oleh publik tanpa perlu login
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Kontak */}
                <Card data-aos="fade-up" data-aos-delay="300">
                    <CardHeader>
                        <CardTitle>Kontak</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <p className="text-base-content/70 mb-4">
                            Untuk pertanyaan atau informasi lebih lanjut tentang sistem ini, silakan hubungi:
                        </p>
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold text-base-content">Yayasan Pendidikan Kristen (YPK) di Tanah Papua</p>
                                <p className="text-sm text-base-content/70">
                                    Sistem Informasi Geografis Berbasis Web untuk Pemetaan dan Pengelolaan Data Sekolah Menengah Pertama (SMP) YPK Kota Jayapura
                                </p>
                            </div>
                            <div className="mt-4 rounded-lg border border-base-300 bg-base-100 p-4">
                                <h4 className="mb-3 font-semibold">Kantor Pusat YPK di Tanah Papua</h4>
                                <div className="space-y-2 text-sm">
                                    <p className="text-base-content/80">
                                        <span className="font-medium">Alamat:</span> Jl. Argapura No. 22, Kecamatan Abepura, Kota Jayapura, Provinsi Papua
                                    </p>
                                    <p className="text-base-content/80">
                                        <span className="font-medium">Email:</span> ypkditanahpapua@gmail.com
                                    </p>
                                    <p className="text-base-content/80">
                                        <span className="font-medium">Website:</span>{' '}
                                        <a 
                                            href="https://www.ypkditanahpapua.org" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            www.ypkditanahpapua.org
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </UserLayout>
    );
}

