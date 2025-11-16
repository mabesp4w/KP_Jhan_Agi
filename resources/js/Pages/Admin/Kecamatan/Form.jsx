import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import useAOS from '@/hooks/useAOS';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function KecamatanForm({ kecamatan = null }) {
    useAOS(); // Initialize AOS animations
    // Tidak perlu useFlashToast di Form karena kita akan redirect ke Index
    // Flash message akan ditampilkan di Index.jsx
    // Tentukan apakah ini mode create atau edit
    const isEdit = !!kecamatan;
    const kecamatanId = kecamatan?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        nm_kecamatan: kecamatan?.nm_kecamatan || '',
        ket: kecamatan?.ket || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            // Update mode
            const updateUrl =
                (typeof route === 'function' &&
                    route('admin.kecamatan.update', kecamatanId) &&
                    route('admin.kecamatan.update', kecamatanId) !== '#') ||
                `/admin/kecamatan/${kecamatanId}`;
            const toastId = toast.loading('Memperbarui kecamatan...', {
                duration: Infinity, // Jangan auto-close
            });
            put(updateUrl, {
                preserveScroll: false,
                onSuccess: (page) => {
                    // Dismiss loading toast, flash message akan menampilkan success toast
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    console.log('Form update error:', errors);
                    const errorMsg =
                        errors && Object.keys(errors).length > 0
                            ? 'Gagal memperbarui kecamatan. Periksa form Anda.'
                            : 'Gagal memperbarui kecamatan';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            // Create mode
            const storeUrl =
                (typeof route === 'function' &&
                    route('admin.kecamatan.store') &&
                    route('admin.kecamatan.store') !== '#') ||
                '/admin/kecamatan';
            const toastId = toast.loading('Menyimpan kecamatan...', {
                duration: Infinity, // Jangan auto-close
            });
            post(storeUrl, {
                preserveScroll: false,
                onSuccess: (page) => {
                    // Dismiss loading toast, flash message akan menampilkan success toast
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    console.log('Form submit error:', errors);
                    const errorMsg =
                        errors && Object.keys(errors).length > 0
                            ? 'Gagal menambahkan kecamatan. Periksa form Anda.'
                            : 'Gagal menambahkan kecamatan';
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
            route('admin.kecamatan.index') &&
            route('admin.kecamatan.index') !== '#') ||
        '/admin/kecamatan';

    return (
        <AdminLayout title={isEdit ? 'Edit Kecamatan' : 'Tambah Kecamatan'}>
            <Head title={isEdit ? 'Edit Kecamatan' : 'Tambah Kecamatan'} />

            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-6" data-aos="fade-down">
                    <Link
                        href={indexUrl}
                        className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Kecamatan
                    </Link>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Kecamatan' : 'Tambah Kecamatan Baru'}
                    </h2>
                    <p className="text-sm text-base-content/70">
                        {isEdit
                            ? 'Perbarui data kecamatan'
                            : 'Masukkan data kecamatan yang akan ditambahkan'}
                    </p>
                </div>

                {/* Form */}
                <Card data-aos="fade-up" data-aos-delay="100">
                    <CardHeader>
                        <CardTitle>Form Kecamatan</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={submit}>
                            <div className="space-y-4">
                                {/* Nama Kecamatan */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Nama Kecamatan <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama kecamatan"
                                        className={`input input-bordered w-full ${
                                            errors.nm_kecamatan ? 'input-error' : ''
                                        }`}
                                        value={data.nm_kecamatan}
                                        onChange={(e) => setData('nm_kecamatan', e.target.value)}
                                        required
                                    />
                                    {errors.nm_kecamatan && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">
                                                {errors.nm_kecamatan}
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

