import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import { SearchBox } from '@/Components/ui';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import { TahunAjaranSelect } from '@/Components/forms';
import useFlashToast from '@/hooks/useFlashToast';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DataSiswaIndex({ dataSiswas, sekolahs, filters }) {
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
                (typeof route === 'function' && route('admin.data-siswa.destroy', deleteId) && route('admin.data-siswa.destroy', deleteId) !== '#') ||
                `/admin/data-siswa/${deleteId}`;
            router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus data siswa');
                },
            });
        }
    };

    const calculateTotal = (data) => {
        const totalKelas = data.jml_kelas_7 + data.jml_kelas_8 + data.jml_kelas_9;
        const totalL = data.jml_siswa_l_7 + data.jml_siswa_l_8 + data.jml_siswa_l_9;
        const totalP = data.jml_siswa_p_7 + data.jml_siswa_p_8 + data.jml_siswa_p_9;
        const totalSiswa = totalL + totalP;
        return { totalKelas, totalL, totalP, totalSiswa };
    };

    return (
        <AdminLayout title="Kelola Data Siswa">
            <Head title="Kelola Data Siswa" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Data Siswa</h2>
                        <p className="text-sm text-base-content/70">Kelola data siswa per sekolah dan tahun ajaran</p>
                    </div>
                    <Link
                        href={
                            (typeof route === 'function' && route('admin.data-siswa.create') && route('admin.data-siswa.create') !== '#') ||
                            '/admin/data-siswa/create'
                        }
                    >
                        <Button variant="primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Data Siswa
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <SearchBox
                    placeholder="Cari data siswa (sekolah, tahun ajaran)..."
                    searchUrl={
                        (typeof route === 'function' &&
                            route('admin.data-siswa.index') &&
                            route('admin.data-siswa.index') !== '#') ||
                        '/admin/data-siswa'
                    }
                    resetUrl={
                        (typeof route === 'function' &&
                            route('admin.data-siswa.index') &&
                            route('admin.data-siswa.index') !== '#') ||
                        '/admin/data-siswa'
                    }
                    defaultValue={filters?.search || ''}
                />

                {/* Filters */}
                <Card className="mb-6">
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
                                                    route('admin.data-siswa.index') &&
                                                    route('admin.data-siswa.index') !== '#') ||
                                                '/admin/data-siswa';
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

                            {/* Filter Tahun Ajaran */}
                            <div>
                                <label className="label-text mb-2 block">Filter Tahun Ajaran:</label>
                                <TahunAjaranSelect
                                    value={filters?.thn_ajaran || ''}
                                    onChange={(value) => {
                                        const indexUrl =
                                            (typeof route === 'function' &&
                                                route('admin.data-siswa.index') &&
                                                route('admin.data-siswa.index') !== '#') ||
                                            '/admin/data-siswa';
                                        router.get(
                                            indexUrl,
                                            { ...filters, thn_ajaran: value || null },
                                            { preserveState: true }
                                        );
                                    }}
                                    required={false}
                                    showPlaceholder={true}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Data Siswa</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {dataSiswas.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <Users className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.sekolah || filters?.thn_ajaran
                                        ? 'Tidak ada data siswa yang ditemukan.'
                                        : 'Belum ada data siswa.'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Sekolah</th>
                                            <th>Tahun Ajaran</th>
                                            <th>Kelas 7</th>
                                            <th>Kelas 8</th>
                                            <th>Kelas 9</th>
                                            <th>Total</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSiswas.data.map((data, index) => {
                                            const totals = calculateTotal(data);
                                            return (
                                                <tr key={data.id}>
                                                    <td>{dataSiswas.from + index}</td>
                                                    <td>
                                                        <div className="font-semibold">{data.sekolah?.nm_sekolah || '-'}</div>
                                                        {data.sekolah?.npsn && (
                                                            <div className="text-xs text-base-content/70">NPSN: {data.sekolah.npsn}</div>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div className="font-semibold">{data.thn_ajaran}</div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm">
                                                            <div>Kelas: {data.jml_kelas_7}</div>
                                                            <div className="text-xs">
                                                                L: {data.jml_siswa_l_7} | P: {data.jml_siswa_p_7}
                                                            </div>
                                                            <div className="text-xs font-semibold">
                                                                Total: {data.jml_siswa_l_7 + data.jml_siswa_p_7}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm">
                                                            <div>Kelas: {data.jml_kelas_8}</div>
                                                            <div className="text-xs">
                                                                L: {data.jml_siswa_l_8} | P: {data.jml_siswa_p_8}
                                                            </div>
                                                            <div className="text-xs font-semibold">
                                                                Total: {data.jml_siswa_l_8 + data.jml_siswa_p_8}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm">
                                                            <div>Kelas: {data.jml_kelas_9}</div>
                                                            <div className="text-xs">
                                                                L: {data.jml_siswa_l_9} | P: {data.jml_siswa_p_9}
                                                            </div>
                                                            <div className="text-xs font-semibold">
                                                                Total: {data.jml_siswa_l_9 + data.jml_siswa_p_9}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm font-semibold">
                                                            <div>Kelas: {totals.totalKelas}</div>
                                                            <div className="text-xs">
                                                                L: {totals.totalL} | P: {totals.totalP}
                                                            </div>
                                                            <div className="text-base">Total: {totals.totalSiswa}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <Link
                                                                href={
                                                                    (typeof route === 'function' &&
                                                                        route('admin.data-siswa.edit', data.id) &&
                                                                        route('admin.data-siswa.edit', data.id) !== '#') ||
                                                                    `/admin/data-siswa/${data.id}/edit`
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
                                                                onClick={() => handleDelete(data.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {dataSiswas.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <div className="join">
                                    {dataSiswas.links.map((link, index) => (
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
                title="Hapus Data Siswa"
                message="Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                variant="error"
            />
        </AdminLayout>
    );
}

