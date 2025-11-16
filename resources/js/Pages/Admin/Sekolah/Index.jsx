import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import { SearchBox } from '@/Components/ui';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import useFlashToast from '@/hooks/useFlashToast';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, School, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SekolahIndex({ sekolahs, kelurahans, filters }) {
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
                (typeof route === 'function' && route('admin.sekolah.destroy', deleteId) && route('admin.sekolah.destroy', deleteId) !== '#') ||
                `/admin/sekolah/${deleteId}`;
            router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus sekolah');
                },
            });
        }
    };

    const getStatusBadge = (status) => {
        return status === 'aktif' ? (
            <span className="badge badge-success badge-sm">Aktif</span>
        ) : (
            <span className="badge badge-error badge-sm">Tidak Aktif</span>
        );
    };

    const getAkreditasiBadge = (akreditasi) => {
        const colors = {
            A: 'badge-success',
            B: 'badge-info',
            C: 'badge-warning',
            Belum: 'badge-ghost',
        };
        return <span className={`badge ${colors[akreditasi] || 'badge-ghost'} badge-sm`}>{akreditasi}</span>;
    };

    return (
        <AdminLayout title="Kelola Sekolah">
            <Head title="Kelola Sekolah" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-aos="fade-down">
                    <div>
                        <h2 className="text-2xl font-bold">Data Sekolah</h2>
                        <p className="text-sm text-base-content/70">Kelola data sekolah</p>
                    </div>
                    <Link
                        href={
                            (typeof route === 'function' && route('admin.sekolah.create') && route('admin.sekolah.create') !== '#') ||
                            '/admin/sekolah/create'
                        }
                    >
                        <Button variant="primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Sekolah
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <SearchBox
                    placeholder="Cari sekolah (NPSN, nama, alamat, dll)..."
                    searchUrl={
                        (typeof route === 'function' &&
                            route('admin.sekolah.index') &&
                            route('admin.sekolah.index') !== '#') ||
                        '/admin/sekolah'
                    }
                    resetUrl={
                        (typeof route === 'function' &&
                            route('admin.sekolah.index') &&
                            route('admin.sekolah.index') !== '#') ||
                        '/admin/sekolah'
                    }
                    defaultValue={filters?.search || ''}
                    />
                </div>

                {/* Filters */}
                <Card className="mb-6" data-aos="fade-up" data-aos-delay="150">
                    <CardBody>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {/* Filter Kelurahan */}
                            {kelurahans && kelurahans.length > 0 && (
                                <div>
                                    <label className="label-text mb-2 block">Filter Kelurahan:</label>
                                    <select
                                        className="select select-bordered w-full"
                                        value={filters?.kelurahan || ''}
                                        onChange={(e) => {
                                            const indexUrl =
                                                (typeof route === 'function' &&
                                                    route('admin.sekolah.index') &&
                                                    route('admin.sekolah.index') !== '#') ||
                                                '/admin/sekolah';
                                            router.get(
                                                indexUrl,
                                                { ...filters, kelurahan: e.target.value || null },
                                                { preserveState: true }
                                            );
                                        }}
                                    >
                                        <option value="">Semua Kelurahan</option>
                                        {kelurahans.map((kelurahan) => (
                                            <option key={kelurahan.id} value={kelurahan.id}>
                                                {kelurahan.nm_kelurahan} - {kelurahan.kecamatan?.nm_kecamatan}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Filter Status */}
                            <div>
                                <label className="label-text mb-2 block">Filter Status:</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters?.status || ''}
                                    onChange={(e) => {
                                        const indexUrl =
                                            (typeof route === 'function' &&
                                                route('admin.sekolah.index') &&
                                                route('admin.sekolah.index') !== '#') ||
                                            '/admin/sekolah';
                                        router.get(
                                            indexUrl,
                                            { ...filters, status: e.target.value || null },
                                            { preserveState: true }
                                        );
                                    }}
                                >
                                    <option value="">Semua Status</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="tidak_aktif">Tidak Aktif</option>
                                </select>
                            </div>

                            {/* Filter Akreditasi */}
                            <div>
                                <label className="label-text mb-2 block">Filter Akreditasi:</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={filters?.akreditasi || ''}
                                    onChange={(e) => {
                                        const indexUrl =
                                            (typeof route === 'function' &&
                                                route('admin.sekolah.index') &&
                                                route('admin.sekolah.index') !== '#') ||
                                            '/admin/sekolah';
                                        router.get(
                                            indexUrl,
                                            { ...filters, akreditasi: e.target.value || null },
                                            { preserveState: true }
                                        );
                                    }}
                                >
                                    <option value="">Semua Akreditasi</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="Belum">Belum</option>
                                </select>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Table */}
                <Card data-aos="fade-up" data-aos-delay="200">
                    <CardHeader>
                        <CardTitle>Daftar Sekolah</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {sekolahs.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <School className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.kelurahan || filters?.status || filters?.akreditasi
                                        ? 'Tidak ada sekolah yang ditemukan.'
                                        : 'Belum ada data sekolah.'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>NPSN</th>
                                            <th>Nama Sekolah</th>
                                            <th>Kelurahan</th>
                                            <th>Alamat</th>
                                            <th>Status</th>
                                            <th>Akreditasi</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sekolahs.data.map((sekolah, index) => (
                                            <tr key={sekolah.id} data-aos="fade-in" data-aos-delay={300 + index * 50}>
                                                <td>{sekolahs.from + index}</td>
                                                <td>
                                                    <div className="font-mono text-sm">{sekolah.npsn}</div>
                                                </td>
                                                <td>
                                                    <div className="font-semibold">{sekolah.nm_sekolah}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">
                                                        {sekolah.kelurahan?.nm_kelurahan || '-'}
                                                        {sekolah.kelurahan?.kecamatan && (
                                                            <div className="text-xs text-base-content/70">
                                                                {sekolah.kelurahan.kecamatan.nm_kecamatan}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="max-w-xs truncate text-sm">{sekolah.alamat}</div>
                                                </td>
                                                <td>{getStatusBadge(sekolah.status_sekolah)}</td>
                                                <td>{getAkreditasiBadge(sekolah.akreditasi)}</td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={
                                                                (typeof route === 'function' &&
                                                                    route('admin.sekolah.edit', sekolah.id) &&
                                                                    route('admin.sekolah.edit', sekolah.id) !== '#') ||
                                                                `/admin/sekolah/${sekolah.id}/edit`
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
                                                            onClick={() => handleDelete(sekolah.id)}
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
                        {sekolahs.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <div className="join">
                                    {sekolahs.links.map((link, index) => (
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
                title="Hapus Sekolah"
                message="Apakah Anda yakin ingin menghapus sekolah ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                variant="error"
            />
        </AdminLayout>
    );
}

