import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { TahunAjaranSelect } from '@/Components/forms';
import useAOS from '@/hooks/useAOS';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DataGtkForm({ dataGtk = null, sekolahs = [] }) {
    useAOS();
    const isEdit = !!dataGtk;
    const dataGtkId = dataGtk?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        id_sekolah: dataGtk?.id_sekolah || '',
        thn_ajaran: dataGtk?.thn_ajaran || '',
        jml_guru_pns: dataGtk?.jml_guru_pns || 0,
        jml_guru_honor: dataGtk?.jml_guru_honor || 0,
        jml_guru_kontrak: dataGtk?.jml_guru_kontrak || 0,
        jml_guru_s1: dataGtk?.jml_guru_s1 || 0,
        jml_guru_s2: dataGtk?.jml_guru_s2 || 0,
        jml_guru_sertifikasi: dataGtk?.jml_guru_sertifikasi || 0,
        jml_tendik_pns: dataGtk?.jml_tendik_pns || 0,
        jml_tendik_honor: dataGtk?.jml_tendik_honor || 0,
        jml_tendik_kontrak: dataGtk?.jml_tendik_kontrak || 0,
        ket: dataGtk?.ket || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            const updateUrl =
                (typeof route === 'function' &&
                    route('admin.data-gtk.update', dataGtkId) &&
                    route('admin.data-gtk.update', dataGtkId) !== '#') ||
                `/admin/data-gtk/${dataGtkId}`;
            const toastId = toast.loading('Memperbarui data GTK...', {
                duration: Infinity,
            });
            put(updateUrl, {
                preserveScroll: false,
                onSuccess: () => {
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    const errorMsg =
                        errors && Object.keys(errors).length > 0
                            ? 'Gagal memperbarui data GTK. Periksa form Anda.'
                            : 'Gagal memperbarui data GTK';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            const storeUrl =
                (typeof route === 'function' &&
                    route('admin.data-gtk.store') &&
                    route('admin.data-gtk.store') !== '#') ||
                '/admin/data-gtk';
            const toastId = toast.loading('Menyimpan data GTK...', {
                duration: Infinity,
            });
            post(storeUrl, {
                preserveScroll: false,
                onSuccess: () => {
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    const errorMsg =
                        errors && Object.keys(errors).length > 0
                            ? 'Gagal menambahkan data GTK. Periksa form Anda.'
                            : 'Gagal menambahkan data GTK';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        }
    };

    const indexUrl =
        (typeof route === 'function' &&
            route('admin.data-gtk.index') &&
            route('admin.data-gtk.index') !== '#') ||
        '/admin/data-gtk';

    return (
        <AdminLayout title={isEdit ? 'Edit Data GTK' : 'Tambah Data GTK'}>
            <Head title={isEdit ? 'Edit Data GTK' : 'Tambah Data GTK'} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={indexUrl}
                        className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Data GTK
                    </Link>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Data GTK' : 'Tambah Data GTK Baru'}
                    </h2>
                    <p className="text-sm text-base-content/70">
                        {isEdit
                            ? 'Perbarui data GTK'
                            : 'Masukkan data GTK yang akan ditambahkan'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit}>
                    {/* Informasi Dasar */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Informasi Dasar</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-4">
                                {/* Sekolah */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Sekolah <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.id_sekolah ? 'select-error' : ''}`}
                                        value={data.id_sekolah}
                                        onChange={(e) => setData('id_sekolah', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Sekolah</option>
                                        {sekolahs.map((sekolah) => (
                                            <option key={sekolah.id} value={sekolah.id}>
                                                {sekolah.nm_sekolah} - {sekolah.npsn}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_sekolah && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.id_sekolah}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Tahun Ajaran */}
                                <div>
                                    <label className="label">
                                        <span className="label-text">
                                            Tahun Ajaran <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <TahunAjaranSelect
                                        value={data.thn_ajaran}
                                        onChange={(value) => setData('thn_ajaran', value)}
                                        required
                                        errors={errors}
                                        name="thn_ajaran"
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Data Guru */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Data Guru</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Guru PNS <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_guru_pns ? 'input-error' : ''}`}
                                        value={data.jml_guru_pns}
                                        onChange={(e) => setData('jml_guru_pns', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_guru_pns && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_guru_pns}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Guru Honor <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_guru_honor ? 'input-error' : ''}`}
                                        value={data.jml_guru_honor}
                                        onChange={(e) => setData('jml_guru_honor', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_guru_honor && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_guru_honor}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Guru Kontrak <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_guru_kontrak ? 'input-error' : ''}`}
                                        value={data.jml_guru_kontrak}
                                        onChange={(e) => setData('jml_guru_kontrak', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_guru_kontrak && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_guru_kontrak}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Guru S1 <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_guru_s1 ? 'input-error' : ''}`}
                                        value={data.jml_guru_s1}
                                        onChange={(e) => setData('jml_guru_s1', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_guru_s1 && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_guru_s1}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Guru S2 <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_guru_s2 ? 'input-error' : ''}`}
                                        value={data.jml_guru_s2}
                                        onChange={(e) => setData('jml_guru_s2', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_guru_s2 && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_guru_s2}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Guru Sertifikasi <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_guru_sertifikasi ? 'input-error' : ''}`}
                                        value={data.jml_guru_sertifikasi}
                                        onChange={(e) => setData('jml_guru_sertifikasi', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_guru_sertifikasi && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_guru_sertifikasi}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Data Tenaga Kependidikan */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Data Tenaga Kependidikan</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Tendik PNS <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_tendik_pns ? 'input-error' : ''}`}
                                        value={data.jml_tendik_pns}
                                        onChange={(e) => setData('jml_tendik_pns', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_tendik_pns && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_tendik_pns}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Tendik Honor <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_tendik_honor ? 'input-error' : ''}`}
                                        value={data.jml_tendik_honor}
                                        onChange={(e) => setData('jml_tendik_honor', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_tendik_honor && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_tendik_honor}</span>
                                        </label>
                                    )}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Tendik Kontrak <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.jml_tendik_kontrak ? 'input-error' : ''}`}
                                        value={data.jml_tendik_kontrak}
                                        onChange={(e) => setData('jml_tendik_kontrak', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    {errors.jml_tendik_kontrak && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jml_tendik_kontrak}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Keterangan */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Keterangan</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="form-control">
                                <textarea
                                    rows={4}
                                    placeholder="Masukkan keterangan tambahan (opsional)"
                                    className={`textarea textarea-bordered w-full ${errors.ket ? 'textarea-error' : ''}`}
                                    value={data.ket}
                                    onChange={(e) => setData('ket', e.target.value)}
                                ></textarea>
                                {errors.ket && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.ket}</span>
                                    </label>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Link href={indexUrl}>
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit" variant="primary" loading={processing}>
                            {isEdit ? 'Perbarui' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

