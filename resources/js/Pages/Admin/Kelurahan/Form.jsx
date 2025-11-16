import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import useAOS from '@/hooks/useAOS';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function KelurahanForm({ kelurahan = null, kecamatans = [] }) {
    useAOS();
    const isEdit = !!kelurahan;
    const kelurahanId = kelurahan?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        id_kecamatan: kelurahan?.id_kecamatan || '',
        nm_kelurahan: kelurahan?.nm_kelurahan || '',
        kode_pos: kelurahan?.kode_pos || '',
        ket: kelurahan?.ket || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            const updateUrl =
                (typeof route === 'function' &&
                    route('admin.kelurahan.update', kelurahanId) &&
                    route('admin.kelurahan.update', kelurahanId) !== '#') ||
                `/admin/kelurahan/${kelurahanId}`;
            const toastId = toast.loading('Memperbarui kelurahan...', {
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
                            ? 'Gagal memperbarui kelurahan. Periksa form Anda.'
                            : 'Gagal memperbarui kelurahan';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            const storeUrl =
                (typeof route === 'function' &&
                    route('admin.kelurahan.store') &&
                    route('admin.kelurahan.store') !== '#') ||
                '/admin/kelurahan';
            const toastId = toast.loading('Menyimpan kelurahan...', {
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
                            ? 'Gagal menambahkan kelurahan. Periksa form Anda.'
                            : 'Gagal menambahkan kelurahan';
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
            route('admin.kelurahan.index') &&
            route('admin.kelurahan.index') !== '#') ||
        '/admin/kelurahan';

    return (
        <AdminLayout title={isEdit ? 'Edit Kelurahan' : 'Tambah Kelurahan'}>
            <Head title={isEdit ? 'Edit Kelurahan' : 'Tambah Kelurahan'} />

            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-6" data-aos="fade-down">
                    <Link
                        href={indexUrl}
                        className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Kelurahan
                    </Link>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Kelurahan' : 'Tambah Kelurahan Baru'}
                    </h2>
                    <p className="text-sm text-base-content/70">
                        {isEdit
                            ? 'Perbarui data kelurahan'
                            : 'Masukkan data kelurahan yang akan ditambahkan'}
                    </p>
                </div>

                {/* Form */}
                <Card data-aos="fade-up" data-aos-delay="100">
                    <CardHeader>
                        <CardTitle>Form Kelurahan</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={submit}>
                            <div className="space-y-4">
                                {/* Kecamatan */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Kecamatan <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${
                                            errors.id_kecamatan ? 'select-error' : ''
                                        }`}
                                        value={data.id_kecamatan}
                                        onChange={(e) => setData('id_kecamatan', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kecamatan</option>
                                        {kecamatans.map((kecamatan) => (
                                            <option key={kecamatan.id} value={kecamatan.id}>
                                                {kecamatan.nm_kecamatan}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_kecamatan && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.id_kecamatan}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                {/* Nama Kelurahan */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Nama Kelurahan <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama kelurahan"
                                        className={`input input-bordered w-full ${
                                            errors.nm_kelurahan ? 'input-error' : ''
                                        }`}
                                        value={data.nm_kelurahan}
                                        onChange={(e) => setData('nm_kelurahan', e.target.value)}
                                        required
                                    />
                                    {errors.nm_kelurahan && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.nm_kelurahan}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                {/* Kode Pos */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Kode Pos</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan kode pos (opsional)"
                                        className={`input input-bordered w-full ${
                                            errors.kode_pos ? 'input-error' : ''
                                        }`}
                                        value={data.kode_pos}
                                        onChange={(e) => setData('kode_pos', e.target.value)}
                                        maxLength={10}
                                    />
                                    {errors.kode_pos && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.kode_pos}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                {/* Keterangan */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Keterangan</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Masukkan keterangan (opsional)"
                                        className={`textarea textarea-bordered w-full ${
                                            errors.ket ? 'textarea-error' : ''
                                        }`}
                                        value={data.ket}
                                        onChange={(e) => setData('ket', e.target.value)}
                                    ></textarea>
                                    {errors.ket && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.ket}
                                            </span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-2">
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
                    </CardBody>
                </Card>
            </div>
        </AdminLayout>
    );
}

