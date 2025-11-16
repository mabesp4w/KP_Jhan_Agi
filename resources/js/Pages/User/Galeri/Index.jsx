import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import Card, { CardBody } from '@/Components/ui/Card';
import { SearchBox } from '@/Components/ui';
import Badge from '@/Components/ui/Badge';
import { Images, School } from 'lucide-react';
import useAOS from '@/hooks/useAOS';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useState } from 'react';

export default function GaleriIndex({ galeris, sekolahs, filters }) {
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

    // Prepare images for lightbox (only valid images)
    const lightboxImages = galeris.data
        .filter((galeri) => galeri.file_foto)
        .map((galeri) => ({
            src: `/storage/${galeri.file_foto}`,
            alt: galeri.judul,
            title: galeri.judul,
            description: galeri.deskripsi || '',
        }));

    // Create map of galeri index to lightbox index
    const getLightboxIndex = (galeriIndex) => {
        let lightboxIdx = 0;
        for (let i = 0; i <= galeriIndex; i++) {
            if (galeris.data[i]?.file_foto) {
                if (i === galeriIndex) {
                    return lightboxIdx;
                }
                lightboxIdx++;
            }
        }
        return 0;
    };

    const openLightbox = (index) => {
        const lightboxIdx = getLightboxIndex(index);
        setLightboxIndex(lightboxIdx);
        setLightboxOpen(true);
    };

    const kategoriOptions = [
        { value: 'kegiatan', label: 'Kegiatan' },
        { value: 'fasilitas', label: 'Fasilitas' },
        { value: 'prestasi', label: 'Prestasi' },
        { value: 'lainnya', label: 'Lainnya' },
    ];

    return (
        <UserLayout title="Galeri Foto">
            <Head title="Galeri Foto - SIG SMP YPK Jayapura" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 text-center" data-aos="fade-down">
                    <h1 className="text-3xl font-bold text-base-content">Galeri Foto</h1>
                    <p className="mt-2 text-base-content/70">Koleksi foto kegiatan dan aktivitas sekolah</p>
                </div>

                {/* Search */}
                <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
                    <SearchBox
                        placeholder="Cari galeri (judul, sekolah, dll)..."
                        searchUrl={getRouteUrl('user.galeri.index', '/galeri')}
                        resetUrl={getRouteUrl('user.galeri.index', '/galeri')}
                        defaultValue={filters?.search || ''}
                    />
                </div>

                {/* Filters */}
                <Card className="mb-6" data-aos="fade-up" data-aos-delay="150">
                    <CardBody>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Filter Sekolah */}
                            {sekolahs && sekolahs.length > 0 && (
                                <div>
                                    <label className="label-text mb-2 block">Filter Sekolah:</label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={filters?.sekolah || ''}
                                        onChange={(e) => {
                                            router.get(
                                                getRouteUrl('user.galeri.index', '/galeri'),
                                                { ...filters, sekolah: e.target.value || null },
                                                { preserveState: true }
                                            );
                                        }}
                                    >
                                        <option value="">Semua Sekolah</option>
                                        {sekolahs.map((sekolah) => (
                                            <option key={sekolah.id} value={sekolah.id}>
                                                {sekolah.nm_sekolah}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Filter Kategori */}
                            <div>
                                <label className="label-text mb-2 block">Filter Kategori:</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters?.kategori || ''}
                                    onChange={(e) => {
                                        router.get(
                                            getRouteUrl('user.galeri.index', '/galeri'),
                                            { ...filters, kategori: e.target.value || null },
                                            { preserveState: true }
                                        );
                                    }}
                                >
                                    <option value="">Semua Kategori</option>
                                    {kategoriOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Galeri Grid */}
                {galeris.data.length === 0 ? (
                    <Card data-aos="fade-up" data-aos-delay="200">
                        <CardBody>
                            <div className="py-12 text-center">
                                <Images className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.sekolah || filters?.kategori
                                        ? 'Tidak ada galeri yang ditemukan.'
                                        : 'Belum ada galeri foto.'}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {galeris.data.map((galeri, index) => {
                            if (!galeri.file_foto) return null;
                            return (
                                <Card key={galeri.id} data-aos="fade-up" data-aos-delay={200 + index * 50}>
                                    <CardBody className="p-0">
                                        <div
                                            className="group relative cursor-pointer overflow-hidden rounded-t-lg"
                                            onClick={() => openLightbox(index)}
                                        >
                                            <img
                                                src={`/storage/${galeri.file_foto}`}
                                                alt={galeri.judul}
                                                className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex h-full items-center justify-center">
                                                    <Images className="h-12 w-12 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="mb-2 flex items-start justify-between">
                                                <h3 className="font-bold">{galeri.judul}</h3>
                                                {galeri.kategori && (
                                                    <Badge variant="info" className="ml-2">
                                                        {kategoriOptions.find((opt) => opt.value === galeri.kategori)?.label ||
                                                            galeri.kategori}
                                                    </Badge>
                                                )}
                                            </div>
                                            {galeri.deskripsi && (
                                                <p className="mb-2 line-clamp-2 text-sm text-base-content/70">{galeri.deskripsi}</p>
                                            )}
                                            {galeri.sekolah && (
                                                <div className="flex items-center gap-2 text-sm text-base-content/70">
                                                    <School className="h-4 w-4" />
                                                    <Link
                                                        href={getRouteUrl('user.sekolah.show', `/sekolah/${galeri.sekolah.id}`)}
                                                        className="hover:text-primary hover:underline"
                                                    >
                                                        {galeri.sekolah.nm_sekolah}
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {galeris.links.length > 3 && (
                    <div className="mt-6 flex justify-center" data-aos="fade-up">
                        <div className="join">
                            {galeris.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`btn join-item btn-sm ${link.active ? 'btn-active' : link.url ? '' : 'btn-disabled'}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={lightboxImages}
            />
        </UserLayout>
    );
}

