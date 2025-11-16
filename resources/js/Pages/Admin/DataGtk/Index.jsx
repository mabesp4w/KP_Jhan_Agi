import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import { SearchBox } from '@/Components/ui';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import { TahunAjaranSelect } from '@/Components/forms';
import useFlashToast from '@/hooks/useFlashToast';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DataGtkIndex({ dataGtks, sekolahs, filters }) {
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
                (typeof route === 'function' && route('admin.data-gtk.destroy', deleteId) && route('admin.data-gtk.destroy', deleteId) !== '#') ||
                `/admin/data-gtk/${deleteId}`;
            router.delete(deleteUrl, {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteDialog(false);
                    setDeleteId(null);
                },
                onError: () => {
                    toast.error('Gagal menghapus data GTK');
                },
            });
        }
    };

    const calculateTotal = (data) => {
        const totalGuru = data.jml_guru_pns + data.jml_guru_honor + data.jml_guru_kontrak;
        const totalTendik = data.jml_tendik_pns + data.jml_tendik_honor + data.jml_tendik_kontrak;
        const totalGTK = totalGuru + totalTendik;
        return { totalGuru, totalTendik, totalGTK };
    };

    return (
        <AdminLayout title="Kelola Data GTK">
            <Head title="Kelola Data GTK" />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Data GTK</h2>
                        <p className="text-sm text-base-content/70">Kelola data Guru dan Tenaga Kependidikan per sekolah dan tahun ajaran</p>
                    </div>
                    <Link
                        href={
                            (typeof route === 'function' && route('admin.data-gtk.create') && route('admin.data-gtk.create') !== '#') ||
                            '/admin/data-gtk/create'
                        }
                    >
                        <Button variant="primary">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Data GTK
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <SearchBox
                    placeholder="Cari data GTK (sekolah, tahun ajaran)..."
                    searchUrl={
                        (typeof route === 'function' &&
                            route('admin.data-gtk.index') &&
                            route('admin.data-gtk.index') !== '#') ||
                        '/admin/data-gtk'
                    }
                    resetUrl={
                        (typeof route === 'function' &&
                            route('admin.data-gtk.index') &&
                            route('admin.data-gtk.index') !== '#') ||
                        '/admin/data-gtk'
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
                                                    route('admin.data-gtk.index') &&
                                                    route('admin.data-gtk.index') !== '#') ||
                                                '/admin/data-gtk';
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
                                                route('admin.data-gtk.index') &&
                                                route('admin.data-gtk.index') !== '#') ||
                                            '/admin/data-gtk';
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
                        <CardTitle>Daftar Data GTK</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {dataGtks.data.length === 0 ? (
                            <div className="py-12 text-center">
                                <GraduationCap className="mx-auto h-12 w-12 text-base-content/30" />
                                <p className="mt-4 text-base-content/70">
                                    {filters?.search || filters?.sekolah || filters?.thn_ajaran
                                        ? 'Tidak ada data GTK yang ditemukan.'
                                        : 'Belum ada data GTK.'}
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
                                            <th>Guru</th>
                                            <th>Tenaga Kependidikan</th>
                                            <th>Total GTK</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataGtks.data.map((data, index) => {
                                            const totals = calculateTotal(data);
                                            return (
                                                <tr key={data.id}>
                                                    <td>{dataGtks.from + index}</td>
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
                                                            <div>PNS: {data.jml_guru_pns}</div>
                                                            <div>Honor: {data.jml_guru_honor}</div>
                                                            <div>Kontrak: {data.jml_guru_kontrak}</div>
                                                            <div className="mt-1 border-t pt-1">
                                                                <div>S1: {data.jml_guru_s1}</div>
                                                                <div>S2: {data.jml_guru_s2}</div>
                                                                <div>Sertifikasi: {data.jml_guru_sertifikasi}</div>
                                                            </div>
                                                            <div className="mt-1 font-semibold border-t pt-1">
                                                                Total: {totals.totalGuru}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-sm">
                                                            <div>PNS: {data.jml_tendik_pns}</div>
                                                            <div>Honor: {data.jml_tendik_honor}</div>
                                                            <div>Kontrak: {data.jml_tendik_kontrak}</div>
                                                            <div className="mt-1 font-semibold border-t pt-1">
                                                                Total: {totals.totalTendik}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-base font-semibold">{totals.totalGTK}</div>
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <Link
                                                                href={
                                                                    (typeof route === 'function' &&
                                                                        route('admin.data-gtk.edit', data.id) &&
                                                                        route('admin.data-gtk.edit', data.id) !== '#') ||
                                                                    `/admin/data-gtk/${data.id}/edit`
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
                        {dataGtks.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <div className="join">
                                    {dataGtks.links.map((link, index) => (
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
                title="Hapus Data GTK"
                message="Apakah Anda yakin ingin menghapus data GTK ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                variant="error"
            />
        </AdminLayout>
    );
}

