import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import { SearchBox } from '@/Components/ui';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import useFlashToast from '@/hooks/useFlashToast';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2, UserCog } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function KepsekIndex({ kepseks, sekolahs, filters }) {
    useFlashToast();
    useAOS();
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            const deleteUrl =
                (typeof route === 'function' && route('admin.kepsek.destroy', deleteId) && route('admin.kepsek.destroy', deleteId) !== '#') ||
                `/admin/kepsek/${deleteId}`;
            router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus kepala sekolah');
                },
            });
        }
    };

    const getAktifBadge = (aktif) => {
        return aktif ? (
            <span className="badge badge-success badge-sm">Aktif</span>
        ) : (
            <span className="badge badge-error badge-sm">Tidak Aktif</span>
        );
    };

    const getJenisKelamin = (jk) => {
        return jk === 'L' ? 'Laki-laki' : jk === 'P' ? 'Perempuan' : '-';
    };

    return (
        <AdminLayout title="Kelola Kepala Sekolah">
            <Head title="Kelola Kepala Sekolah" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-aos="fade-down">
                    <div>
                        <h2 className="text-2xl font-bold">Data Kepala Sekolah</h2>
                        <p className="text-sm text-base-content/70">Kelola data kepala sekolah</p>
                    </div>
                    <Link
                        href={
                            (typeof route === 'function' && route('admin.kepsek.create') && route('admin.kepsek.create') !== '#') ||
                            '/admin/kepsek/create'
                        }
                    >
                        <Button variant="primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kepala Sekolah
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <SearchBox
                    placeholder="Cari kepala sekolah (nama, NIP, sekolah, dll)..."
                    searchUrl={
                        (typeof route === 'function' &&
                            route('admin.kepsek.index') &&
                            route('admin.kepsek.index') !== '#') ||
                        '/admin/kepsek'
                    }
                    resetUrl={
                        (typeof route === 'function' &&
                            route('admin.kepsek.index') &&
                            route('admin.kepsek.index') !== '#') ||
                        '/admin/kepsek'
                    }
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
                                            const indexUrl =
                                                (typeof route === 'function' &&
                                                    route('admin.kepsek.index') &&
                                                    route('admin.kepsek.index') !== '#') ||
                                                '/admin/kepsek';
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

                            {/* Filter Aktif */}
                            <div>
                                <label className="label-text mb-2 block">Filter Status:</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters?.aktif !== undefined ? String(filters.aktif) : ''}
                                    onChange={(e) => {
                                        const indexUrl =
                                            (typeof route === 'function' &&
                                                route('admin.kepsek.index') &&
                                                route('admin.kepsek.index') !== '#') ||
                                            '/admin/kepsek';
                                        router.get(
                                            indexUrl,
                                            { ...filters, aktif: e.target.value !== '' ? e.target.value : null },
                                            { preserveState: true }
                                        );
                                    }}
                                >
                                    <option value="">Semua Status</option>
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Table */}
                <Card data-aos="fade-up" data-aos-delay="200">
                    <CardHeader>
                        <CardTitle>Daftar Kepala Sekolah</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {kepseks.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <UserCog className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.sekolah || filters?.aktif !== undefined
                                        ? 'Tidak ada kepala sekolah yang ditemukan.'
                                        : 'Belum ada data kepala sekolah.'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>NIP</th>
                                            <th>Sekolah</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Tanggal Mulai</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kepseks.data.map((kepsek, index) => (
                                            <tr key={kepsek.id} data-aos="fade-in" data-aos-delay={300 + index * 50}>
                                                <td>{kepseks.from + index}</td>
                                                <td>
                                                    <div className="font-semibold">{kepsek.nm_kepsek}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">{kepsek.nip || '-'}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">
                                                        {kepsek.sekolah?.nm_sekolah || '-'}
                                                        {kepsek.sekolah?.npsn && (
                                                            <div className="text-xs text-base-content/70">
                                                                NPSN: {kepsek.sekolah.npsn}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">{getJenisKelamin(kepsek.jenis_kelamin)}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">
                                                        {kepsek.tgl_mulai
                                                            ? new Date(kepsek.tgl_mulai).toLocaleDateString('id-ID')
                                                            : '-'}
                                                    </div>
                                                </td>
                                                <td>{getAktifBadge(kepsek.aktif)}</td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={
                                                                (typeof route === 'function' &&
                                                                    route('admin.kepsek.edit', kepsek.id) &&
                                                                    route('admin.kepsek.edit', kepsek.id) !== '#') ||
                                                                `/admin/kepsek/${kepsek.id}/edit`
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
                                                            onClick={() => handleDelete(kepsek.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {kepseks.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <div className="join">
                                    {kepseks.links.map((link, index) => (
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

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                onClose={() => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                }}
                onConfirm={confirmDelete}
                title="Hapus Kepala Sekolah"
                message="Apakah Anda yakin ingin menghapus kepala sekolah ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                variant="error"
            />
        </AdminLayout>
    );
}

