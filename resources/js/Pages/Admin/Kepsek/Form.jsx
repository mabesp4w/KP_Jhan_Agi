import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import useAOS from '@/hooks/useAOS';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function KepsekForm({ kepsek = null, sekolahs = [] }) {
    useAOS();
    const isEdit = !!kepsek;
    const kepsekId = kepsek?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        id_sekolah: kepsek?.id_sekolah || '',
        nm_kepsek: kepsek?.nm_kepsek || '',
        nip: kepsek?.nip || '',
        no_telp: kepsek?.no_telp || '',
        email: kepsek?.email || '',
        jenis_kelamin: kepsek?.jenis_kelamin || '',
        pendidikan_terakhir: kepsek?.pendidikan_terakhir || '',
        tgl_mulai: kepsek?.tgl_mulai || '',
        tgl_selesai: kepsek?.tgl_selesai || '',
        aktif: kepsek?.aktif !== undefined ? kepsek.aktif : true,
        foto: kepsek?.foto || '',
        ket: kepsek?.ket || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            const updateUrl =
                (typeof route === 'function' &&
                    route('admin.kepsek.update', kepsekId) &&
                    route('admin.kepsek.update', kepsekId) !== '#') ||
                `/admin/kepsek/${kepsekId}`;
            const toastId = toast.loading('Memperbarui kepala sekolah...', {
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
                            ? 'Gagal memperbarui kepala sekolah. Periksa form Anda.'
                            : 'Gagal memperbarui kepala sekolah';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            const storeUrl =
                (typeof route === 'function' &&
                    route('admin.kepsek.store') &&
                    route('admin.kepsek.store') !== '#') ||
                '/admin/kepsek';
            const toastId = toast.loading('Menyimpan kepala sekolah...', {
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
                            ? 'Gagal menambahkan kepala sekolah. Periksa form Anda.'
                            : 'Gagal menambahkan kepala sekolah';
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
            route('admin.kepsek.index') &&
            route('admin.kepsek.index') !== '#') ||
        '/admin/kepsek';

    return (
        <AdminLayout title={isEdit ? 'Edit Kepala Sekolah' : 'Tambah Kepala Sekolah'}>
            <Head title={isEdit ? 'Edit Kepala Sekolah' : 'Tambah Kepala Sekolah'} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6" data-aos="fade-down">
                    <Link
                        href={indexUrl}
                        className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Kepala Sekolah
                    </Link>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Kepala Sekolah' : 'Tambah Kepala Sekolah Baru'}
                    </h2>
                    <p className="text-sm text-base-content/70">
                        {isEdit
                            ? 'Perbarui data kepala sekolah'
                            : 'Masukkan data kepala sekolah yang akan ditambahkan'}
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit}>
                    {/* Informasi Dasar */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="100">
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
                                        className={`select select-bordered w-full ${
                                            errors.id_sekolah ? 'select-error' : ''
                                        }`}
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

                                {/* Nama Kepala Sekolah */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Nama Kepala Sekolah <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama kepala sekolah"
                                        className={`input input-bordered w-full ${
                                            errors.nm_kepsek ? 'input-error' : ''
                                        }`}
                                        value={data.nm_kepsek}
                                        onChange={(e) => setData('nm_kepsek', e.target.value)}
                                        required
                                    />
                                    {errors.nm_kepsek && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.nm_kepsek}</span>
                                        </label>
                                    )}
                                </div>

                                {/* NIP */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">NIP</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan NIP (opsional)"
                                        className={`input input-bordered w-full ${
                                            errors.nip ? 'input-error' : ''
                                        }`}
                                        value={data.nip}
                                        onChange={(e) => setData('nip', e.target.value)}
                                    />
                                    {errors.nip && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.nip}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Kontak & Informasi Pribadi */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="200">
                        <CardHeader>
                            <CardTitle>Kontak & Informasi Pribadi</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* No. Telepon */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">No. Telepon</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nomor telepon"
                                        className={`input input-bordered w-full ${
                                            errors.no_telp ? 'input-error' : ''
                                        }`}
                                        value={data.no_telp}
                                        onChange={(e) => setData('no_telp', e.target.value)}
                                    />
                                    {errors.no_telp && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.no_telp}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Masukkan email"
                                        className={`input input-bordered w-full ${
                                            errors.email ? 'input-error' : ''
                                        }`}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.email}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Jenis Kelamin */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Jenis Kelamin</span>
                                    </label>
                                    <select
                                        className={`select select-bordered w-full ${
                                            errors.jenis_kelamin ? 'select-error' : ''
                                        }`}
                                        value={data.jenis_kelamin}
                                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    {errors.jenis_kelamin && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.jenis_kelamin}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Pendidikan Terakhir */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Pendidikan Terakhir</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contoh: S1, S2, dll"
                                        className={`input input-bordered w-full ${
                                            errors.pendidikan_terakhir ? 'input-error' : ''
                                        }`}
                                        value={data.pendidikan_terakhir}
                                        onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                    />
                                    {errors.pendidikan_terakhir && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.pendidikan_terakhir}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Periode Jabatan */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="300">
                        <CardHeader>
                            <CardTitle>Periode Jabatan</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Tanggal Mulai */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Tanggal Mulai <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        className={`input input-bordered w-full ${
                                            errors.tgl_mulai ? 'input-error' : ''
                                        }`}
                                        value={data.tgl_mulai}
                                        onChange={(e) => setData('tgl_mulai', e.target.value)}
                                        required
                                    />
                                    {errors.tgl_mulai && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.tgl_mulai}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Tanggal Selesai */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Tanggal Selesai</span>
                                    </label>
                                    <input
                                        type="date"
                                        className={`input input-bordered w-full ${
                                            errors.tgl_selesai ? 'input-error' : ''
                                        }`}
                                        value={data.tgl_selesai}
                                        onChange={(e) => setData('tgl_selesai', e.target.value)}
                                        min={data.tgl_mulai || undefined}
                                    />
                                    {errors.tgl_selesai && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.tgl_selesai}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Status Aktif */}
                                <div className="form-control sm:col-span-2">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Status Aktif</span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={data.aktif}
                                            onChange={(e) => setData('aktif', e.target.checked)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Keterangan */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="400">
                        <CardHeader>
                            <CardTitle>Keterangan</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="form-control">
                                <textarea
                                    rows={4}
                                    placeholder="Masukkan keterangan tambahan (opsional)"
                                    className={`textarea textarea-bordered w-full ${
                                        errors.ket ? 'textarea-error' : ''
                                    }`}
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
                    <div className="flex justify-end gap-2" data-aos="fade-up" data-aos-delay="500">
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

