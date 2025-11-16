import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import { TahunAjaranSelect } from '@/Components/forms';
import useAOS from '@/hooks/useAOS';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DataSiswaForm({ dataSiswa = null, sekolahs = [] }) {
    useAOS();
    const isEdit = !!dataSiswa;
    const dataSiswaId = dataSiswa?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        id_sekolah: dataSiswa?.id_sekolah || '',
        thn_ajaran: dataSiswa?.thn_ajaran || '',
        jml_kelas_7: dataSiswa?.jml_kelas_7 || 0,
        jml_siswa_l_7: dataSiswa?.jml_siswa_l_7 || 0,
        jml_siswa_p_7: dataSiswa?.jml_siswa_p_7 || 0,
        jml_kelas_8: dataSiswa?.jml_kelas_8 || 0,
        jml_siswa_l_8: dataSiswa?.jml_siswa_l_8 || 0,
        jml_siswa_p_8: dataSiswa?.jml_siswa_p_8 || 0,
        jml_kelas_9: dataSiswa?.jml_kelas_9 || 0,
        jml_siswa_l_9: dataSiswa?.jml_siswa_l_9 || 0,
        jml_siswa_p_9: dataSiswa?.jml_siswa_p_9 || 0,
        ket: dataSiswa?.ket || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            const updateUrl =
                (typeof route === 'function' &&
                    route('admin.data-siswa.update', dataSiswaId) &&
                    route('admin.data-siswa.update', dataSiswaId) !== '#') ||
                `/admin/data-siswa/${dataSiswaId}`;
            const toastId = toast.loading('Memperbarui data siswa...', {
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
                            ? 'Gagal memperbarui data siswa. Periksa form Anda.'
                            : 'Gagal memperbarui data siswa';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            const storeUrl =
                (typeof route === 'function' &&
                    route('admin.data-siswa.store') &&
                    route('admin.data-siswa.store') !== '#') ||
                '/admin/data-siswa';
            const toastId = toast.loading('Menyimpan data siswa...', {
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
                            ? 'Gagal menambahkan data siswa. Periksa form Anda.'
                            : 'Gagal menambahkan data siswa';
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
            route('admin.data-siswa.index') &&
            route('admin.data-siswa.index') !== '#') ||
        '/admin/data-siswa';

    const renderKelasForm = (kelas, prefix) => (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Kelas {kelas}</CardTitle>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Jumlah Kelas <span className="text-error">*</span>
                            </span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            className={`input input-bordered w-full ${errors[`jml_kelas_${prefix}`] ? 'input-error' : ''}`}
                            value={data[`jml_kelas_${prefix}`]}
                            onChange={(e) => setData(`jml_kelas_${prefix}`, parseInt(e.target.value) || 0)}
                            required
                        />
                        {errors[`jml_kelas_${prefix}`] && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors[`jml_kelas_${prefix}`]}</span>
                            </label>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Siswa Laki-laki <span className="text-error">*</span>
                            </span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            className={`input input-bordered w-full ${errors[`jml_siswa_l_${prefix}`] ? 'input-error' : ''}`}
                            value={data[`jml_siswa_l_${prefix}`]}
                            onChange={(e) => setData(`jml_siswa_l_${prefix}`, parseInt(e.target.value) || 0)}
                            required
                        />
                        {errors[`jml_siswa_l_${prefix}`] && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors[`jml_siswa_l_${prefix}`]}</span>
                            </label>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Siswa Perempuan <span className="text-error">*</span>
                            </span>
                        </label>
                        <input
                            type="number"
                            min="0"
                            className={`input input-bordered w-full ${errors[`jml_siswa_p_${prefix}`] ? 'input-error' : ''}`}
                            value={data[`jml_siswa_p_${prefix}`]}
                            onChange={(e) => setData(`jml_siswa_p_${prefix}`, parseInt(e.target.value) || 0)}
                            required
                        />
                        {errors[`jml_siswa_p_${prefix}`] && (
                            <label className="label">
                                <span className="label-text-alt text-error">{errors[`jml_siswa_p_${prefix}`]}</span>
                            </label>
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );

    return (
        <AdminLayout title={isEdit ? 'Edit Data Siswa' : 'Tambah Data Siswa'}>
            <Head title={isEdit ? 'Edit Data Siswa' : 'Tambah Data Siswa'} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={indexUrl}
                        className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Data Siswa
                    </Link>
                    <h2 className="text-2xl font-bold">
                        {isEdit ? 'Edit Data Siswa' : 'Tambah Data Siswa Baru'}
                    </h2>
                    <p className="text-sm text-base-content/70">
                        {isEdit
                            ? 'Perbarui data siswa'
                            : 'Masukkan data siswa yang akan ditambahkan'}
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

                    {/* Kelas 7 */}
                    {renderKelasForm(7, '7')}

                    {/* Kelas 8 */}
                    {renderKelasForm(8, '8')}

                    {/* Kelas 9 */}
                    {renderKelasForm(9, '9')}

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

