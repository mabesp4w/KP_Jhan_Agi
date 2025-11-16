import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import { SearchBox } from '@/Components/ui';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import useFlashToast from '@/hooks/useFlashToast';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Images, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export default function GaleriIndex({ galeris, sekolahs, filters }) {
    useFlashToast();
    useAOS();
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            const deleteUrl =
                (typeof route === 'function' && route('admin.galeri.destroy', deleteId) && route('admin.galeri.destroy', deleteId) !== '#') ||
                `/admin/galeri/${deleteId}`;
            router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus galeri');
                },
            });
        }
    };

    const getKategoriBadge = (kategori) => {
        const colors = {
            gedung: 'badge-primary',
            kegiatan: 'badge-info',
            prestasi: 'badge-success',
            lainnya: 'badge-ghost',
        };
        const labels = {
            gedung: 'Gedung',
            kegiatan: 'Kegiatan',
            prestasi: 'Prestasi',
            lainnya: 'Lainnya',
        };
        return <span className={`badge ${colors[kategori] || 'badge-ghost'} badge-sm`}>{labels[kategori] || kategori}</span>;
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

    return (
        <AdminLayout title="Kelola Galeri">
            <Head title="Kelola Galeri" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Galeri</h2>
                        <p className="text-sm text-base-content/70">Kelola galeri foto sekolah</p>
                    </div>
                    <Link
                        href={
                            (typeof route === 'function' && route('admin.galeri.create') && route('admin.galeri.create') !== '#') ||
                            '/admin/galeri/create'
                        }
                    >
                        <Button variant="primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Galeri
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <SearchBox
                    placeholder="Cari galeri (judul, sekolah, dll)..."
                    searchUrl={
                        (typeof route === 'function' &&
                            route('admin.galeri.index') &&
                            route('admin.galeri.index') !== '#') ||
                        '/admin/galeri'
                    }
                    resetUrl={
                        (typeof route === 'function' &&
                            route('admin.galeri.index') &&
                            route('admin.galeri.index') !== '#') ||
                        '/admin/galeri'
                    }
                    defaultValue={filters?.search || ''}
                />

                {/* Filters */}
                <Card className="mb-6">
                    <CardBody>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {/* Filter Sekolah */}
                            {sekolahs && sekolahs.length > 0 && (
                                <div>
                                    <label className="label-text mb-2 block">Filter Sekolah:</label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={filters?.sekolah || ''}
                                        onChange={(e) => {
                                            const indexUrl =
                                                (typeof route === 'function' &&
                                                    route('admin.galeri.index') &&
                                                    route('admin.galeri.index') !== '#') ||
                                                '/admin/galeri';
                                            router.get(
                                                indexUrl,
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
                                        const indexUrl =
                                            (typeof route === 'function' &&
                                                route('admin.galeri.index') &&
                                                route('admin.galeri.index') !== '#') ||
                                            '/admin/galeri';
                                        router.get(
                                            indexUrl,
                                            { ...filters, kategori: e.target.value || null },
                                            { preserveState: true }
                                        );
                                    }}
                                >
                                    <option value="">Semua Kategori</option>
                                    <option value="gedung">Gedung</option>
                                    <option value="kegiatan">Kegiatan</option>
                                    <option value="prestasi">Prestasi</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                            </div>

                            {/* Filter Tampilkan */}
                            <div>
                                <label className="label-text mb-2 block">Filter Status:</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters?.tampilkan !== undefined ? String(filters.tampilkan) : ''}
                                    onChange={(e) => {
                                        const indexUrl =
                                            (typeof route === 'function' &&
                                                route('admin.galeri.index') &&
                                                route('admin.galeri.index') !== '#') ||
                                            '/admin/galeri';
                                        router.get(
                                            indexUrl,
                                            { ...filters, tampilkan: e.target.value !== '' ? e.target.value : null },
                                            { preserveState: true }
                                        );
                                    }}
                                >
                                    <option value="">Semua Status</option>
                                    <option value="1">Tampilkan</option>
                                    <option value="0">Tidak Tampilkan</option>
                                </select>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Gallery Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Galeri</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {galeris.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <Images className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.sekolah || filters?.kategori || filters?.tampilkan !== undefined
                                        ? 'Tidak ada galeri yang ditemukan.'
                                        : 'Belum ada data galeri.'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {galeris.data.map((galeri, index) => (
                                    <div key={galeri.id} className="card card-compact bg-base-100 shadow">
                                        <figure className="relative h-48 overflow-hidden">
                                            <img
                                                src={galeri.file_foto ? `/storage/${galeri.file_foto}` : '/placeholder-image.jpg'}
                                                alt={galeri.judul}
                                                className="h-full w-full cursor-pointer object-cover transition-transform hover:scale-105"
                                                onClick={() => openLightbox(index)}
                                            />
                                            {!galeri.tampilkan && (
                                                <div className="absolute right-2 top-2">
                                                    <span className="badge badge-error badge-sm">Tidak Tampil</span>
                                                </div>
                                            )}
                                        </figure>
                                        <div className="card-body">
                                            <div className="flex items-start justify-between">
                                                <h3 className="card-title text-sm line-clamp-2">{galeri.judul}</h3>
                                                {getKategoriBadge(galeri.kategori)}
                                            </div>
                                            <p className="text-xs text-base-content/70 line-clamp-2">{galeri.deskripsi || '-'}</p>
                                            <div className="text-xs text-base-content/70">
                                                {galeri.sekolah?.nm_sekolah || '-'}
                                            </div>
                                            <div className="card-actions mt-2 justify-end">
                                                <Link
                                                    href={
                                                        (typeof route === 'function' &&
                                                            route('admin.galeri.edit', galeri.id) &&
                                                            route('admin.galeri.edit', galeri.id) !== '#') ||
                                                        `/admin/galeri/${galeri.id}/edit`
                                                    }
                                                >
                                                    <Button variant="ghost" size="sm" className="btn-sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-error btn-sm hover:bg-error/10"
                                                    onClick={() => handleDelete(galeri.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {galeris.links.length > 3 && (
                            <div className="mt-6 flex justify-center">
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
                    </CardBody>
                </Card>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                index={lightboxIndex}
                slides={lightboxImages}
                render={{ buttonPrev: () => null, buttonNext: () => null }}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                }}
                onConfirm={confirmDelete}
                title="Hapus Galeri"
                message="Apakah Anda yakin ingin menghapus galeri ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                variant="error"
            />
        </AdminLayout>
    );
}

