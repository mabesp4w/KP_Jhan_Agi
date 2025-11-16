import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import useAOS from '@/hooks/useAOS';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function GaleriForm({ galeri = null, sekolahs = [] }) {
    useAOS();
    const isEdit = !!galeri;
    const galeriId = galeri?.id;
    const [preview, setPreview] = useState(galeri?.file_foto ? `/storage/${galeri.file_foto}` : null);

    const { data, setData, post, put, processing, errors } = useForm({
        id_sekolah: galeri?.id_sekolah || '',
        judul: galeri?.judul || '',
        deskripsi: galeri?.deskripsi || '',
        file_foto: null,
        kategori: galeri?.kategori || 'lainnya',
        urutan: galeri?.urutan || 0,
        tampilkan: galeri?.tampilkan !== undefined ? galeri.tampilkan : true,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file_foto', file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePreview = () => {
        setData('file_foto', null);
        setPreview(galeri?.file_foto ? `/storage/${galeri.file_foto}` : null);
    };

    const submit = (e) => {
        e.preventDefault();

        // Create FormData manually
        const formData = new FormData();
        formData.append('id_sekolah', String(data.id_sekolah || ''));
        formData.append('judul', String(data.judul || ''));
        if (data.deskripsi) {
            formData.append('deskripsi', String(data.deskripsi));
        }
        formData.append('kategori', String(data.kategori || 'lainnya'));
        formData.append('urutan', String(data.urutan || 0));
        formData.append('tampilkan', data.tampilkan ? '1' : '0');

        // Only append file if it exists
        if (data.file_foto) {
            formData.append('file_foto', data.file_foto);
        }

        if (isEdit) {
            formData.append('_method', 'put'); // For PUT request with FormData

            const updateUrl =
                (typeof route === 'function' &&
                    route('admin.galeri.update', galeriId) &&
                    route('admin.galeri.update', galeriId) !== '#') ||
                `/admin/galeri/${galeriId}`;
            const toastId = toast.loading('Memperbarui galeri...', {
                duration: Infinity,
            });
            router.post(updateUrl, formData, {
                preserveScroll: false,
                onSuccess: () => {
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    const errorMsg =
                        errors && Object.keys(errors).length > 0
                            ? 'Gagal memperbarui galeri. Periksa form Anda.'
                            : 'Gagal memperbarui galeri';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            const storeUrl =
                (typeof route === 'function' &&
                    route('admin.galeri.store') &&
                    route('admin.galeri.store') !== '#') ||
                '/admin/galeri';
            const toastId = toast.loading('Menyimpan galeri...', {
                duration: Infinity,
            });
            router.post(storeUrl, formData, {
                preserveScroll: false,
                onSuccess: () => {
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    const errorMsg =
                        errors && Object.keys(errors).length > 0
                            ? 'Gagal menambahkan galeri. Periksa form Anda.'
                            : 'Gagal menambahkan galeri';
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
            route('admin.galeri.index') &&
            route('admin.galeri.index') !== '#') ||
        '/admin/galeri';

    return (
        <AdminLayout title={isEdit ? 'Edit Galeri' : 'Tambah Galeri'}>
            <Head title={isEdit ? 'Edit Galeri' : 'Tambah Galeri'} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={indexUrl}
                        className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Galeri
                    </Link>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Galeri' : 'Tambah Galeri Baru'}
                    </h2>
                    <p className="text-sm text-base-content/70">
                        {isEdit
                            ? 'Perbarui data galeri'
                            : 'Masukkan data galeri yang akan ditambahkan'}
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

                                {/* Judul */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Judul <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan judul galeri"
                                        className={`input input-bordered w-full ${errors.judul ? 'input-error' : ''}`}
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        required
                                    />
                                    {errors.judul && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.judul}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Deskripsi */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Deskripsi</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Masukkan deskripsi galeri (opsional)"
                                        className={`textarea textarea-bordered w-full ${errors.deskripsi ? 'textarea-error' : ''}`}
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                    ></textarea>
                                    {errors.deskripsi && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.deskripsi}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Upload Foto */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Foto</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-4">
                                {/* File Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            File Foto {!isEdit && <span className="text-error">*</span>}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className={`file-input file-input-bordered w-full ${errors.file_foto ? 'file-input-error' : ''}`}
                                        onChange={handleFileChange}
                                        required={!isEdit}
                                    />
                                    {errors.file_foto && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.file_foto}</span>
                                        </label>
                                    )}
                                    <label className="label">
                                        <span className="label-text-alt">Format: JPEG, JPG, PNG, GIF, WebP (Max: 5MB)</span>
                                    </label>
                                </div>

                                {/* Preview */}
                                {preview && (
                                    <div className="relative">
                                        <div className="relative inline-block">
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="h-64 w-full rounded-lg object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removePreview}
                                                className="absolute right-2 top-2 btn btn-circle btn-sm btn-error"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {!preview && (
                                    <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-base-300">
                                        <div className="text-center">
                                            <ImageIcon className="mx-auto h-12 w-12 text-base-content/30" />
                                            <p className="mt-2 text-sm text-base-content/70">Preview akan muncul di sini</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Pengaturan */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Pengaturan</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Kategori */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Kategori <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${errors.kategori ? 'select-error' : ''}`}
                                        value={data.kategori}
                                        onChange={(e) => setData('kategori', e.target.value)}
                                        required
                                    >
                                        <option value="gedung">Gedung</option>
                                        <option value="kegiatan">Kegiatan</option>
                                        <option value="prestasi">Prestasi</option>
                                        <option value="lainnya">Lainnya</option>
                                    </select>
                                    {errors.kategori && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.kategori}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Urutan */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Urutan</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className={`input input-bordered w-full ${errors.urutan ? 'input-error' : ''}`}
                                        value={data.urutan}
                                        onChange={(e) => setData('urutan', parseInt(e.target.value) || 0)}
                                    />
                                    {errors.urutan && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.urutan}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Tampilkan */}
                                <div className="form-control sm:col-span-2">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Tampilkan di Galeri</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={data.tampilkan}
                                            onChange={(e) => setData('tampilkan', e.target.checked)}
                                        />
                                    </label>
                                </div>
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

