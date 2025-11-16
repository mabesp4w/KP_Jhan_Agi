import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import { SearchBox } from '@/Components/ui';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import useFlashToast from '@/hooks/useFlashToast';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Building2, Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function KelurahanIndex({ kelurahans, kecamatans, filters }) {
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
            let deleteUrl = `/admin/kelurahan/${deleteId}`;
            if (typeof route === 'function') {
                const url = route('admin.kelurahan.destroy', deleteId);
                if (url && typeof url === 'string' && url !== '#') {
                    deleteUrl = url;
                }
            }
            router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus kelurahan');
                },
            });
        }
    };

    return (
        <AdminLayout title="Kelola Kelurahan">
            <Head title="Kelola Kelurahan" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-aos="fade-down">
                    <div>
                        <h2 className="text-2xl font-bold">Data Kelurahan</h2>
                        <p className="text-sm text-base-content/70">Kelola data kelurahan</p>
                    </div>
                    <Link
                        href={
                            (() => {
                                if (typeof route === 'function') {
                                    const url = route('admin.kelurahan.create');
                                    if (url && typeof url === 'string' && url !== '#') {
                                        return url;
                                    }
                                }
                                return '/admin/kelurahan/create';
                            })()
                        }
                    >
                        <Button variant="primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Kelurahan
                        </Button>
                    </Link>
                </div>

                {/* Search and Filter */}
                <div data-aos="fade-up" data-aos-delay="100">
                    <SearchBox
                    placeholder="Cari kelurahan..."
                    searchUrl={
                        (() => {
                            if (typeof route === 'function') {
                                const url = route('admin.kelurahan.index');
                                if (url && typeof url === 'string' && url !== '#') {
                                    return url;
                                }
                            }
                            return '/admin/kelurahan';
                        })()
                    }
                    resetUrl={
                        (() => {
                            if (typeof route === 'function') {
                                const url = route('admin.kelurahan.index');
                                if (url && typeof url === 'string' && url !== '#') {
                                    return url;
                                }
                            }
                            return '/admin/kelurahan';
                        })()
                    }
                    defaultValue={filters?.search || ''}
                    />
                </div>

                {/* Filter by Kecamatan */}
                {kecamatans && kecamatans.length > 0 && (
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="150">
                        <CardBody>
                            <div className="flex items-center gap-2">
                                <label className="label-text">Filter Kecamatan:</label>
                                <select
                                    className="select select-bordered"
                                    value={filters?.kecamatan || ''}
                                    onChange={(e) => {
                                        let indexUrl = '/admin/kelurahan';
                                        if (typeof route === 'function') {
                                            const url = route('admin.kelurahan.index');
                                            if (url && typeof url === 'string' && url !== '#') {
                                                indexUrl = url;
                                            }
                                        }
                                        router.get(indexUrl, { ...filters, kecamatan: e.target.value || null }, { preserveState: true });
                                    }}
                                >
                                    <option value="">Semua Kecamatan</option>
                                    {kecamatans.map((kecamatan) => (
                                        <option key={kecamatan.id} value={kecamatan.id}>
                                            {kecamatan.nm_kecamatan}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </CardBody>
                    </Card>
                )}

                {/* Table */}
                <Card data-aos="fade-up" data-aos-delay="200">
                    <CardHeader>
                        <CardTitle>Daftar Kelurahan</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {kelurahans.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <Building2 className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.kecamatan ? 'Tidak ada kelurahan yang ditemukan.' : 'Belum ada data kelurahan.'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Kelurahan</th>
                                            <th>Kecamatan</th>
                                            <th>Kode Pos</th>
                                            <th>Keterangan</th>
                                            <th>Tanggal Dibuat</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kelurahans.data.map((kelurahan, index) => (
                                            <tr key={kelurahan.id} data-aos="fade-in" data-aos-delay={300 + index * 50}>
                                                <td>{kelurahans.from + index}</td>
                                                <td>
                                                    <div className="font-semibold">{kelurahan.nm_kelurahan}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">{kelurahan.kecamatan?.nm_kecamatan || '-'}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm">{kelurahan.kode_pos || '-'}</div>
                                                </td>
                                                <td>
                                                    <div className="max-w-xs truncate text-sm text-base-content/70">{kelurahan.ket || '-'}</div>
                                                </td>
                                                <td>
                                                    <div className="text-sm text-base-content/70">
                                                        {new Date(kelurahan.created_at).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={
                                                                (() => {
                                                                    if (typeof route === 'function') {
                                                                        const url = route('admin.kelurahan.edit', kelurahan.id);
                                                                        if (url && typeof url === 'string' && url !== '#') {
                                                                            return url;
                                                                        }
                                                                    }
                                                                    return `/admin/kelurahan/${kelurahan.id}/edit`;
                                                                })()
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
                                                            onClick={() => handleDelete(kelurahan.id)}
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
                        {kelurahans.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <div className="join">
                                    {kelurahans.links.map((link, index) => (
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
                title="Hapus Kelurahan"
                message="Apakah Anda yakin ingin menghapus kelurahan ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                variant="error"
            />
        </AdminLayout>
    );
}

