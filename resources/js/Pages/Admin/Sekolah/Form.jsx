import MapPicker from '@/Components/maps/MapPicker';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import useAOS from '@/hooks/useAOS';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SekolahForm({ sekolah = null, kelurahans = [], sekolahs = [] }) {
    useAOS();
    const isEdit = !!sekolah;
    const sekolahId = sekolah?.id;

    const { data, setData, post, put, processing, errors } = useForm({
        npsn: sekolah?.npsn || '',
        nm_sekolah: sekolah?.nm_sekolah || '',
        id_kelurahan: sekolah?.id_kelurahan || '',
        alamat: sekolah?.alamat || '',
        no_telp: sekolah?.no_telp || '',
        email: sekolah?.email || '',
        website: sekolah?.website || '',
        latitude: sekolah?.latitude || '',
        longitude: sekolah?.longitude || '',
        thn_berdiri: sekolah?.thn_berdiri || '',
        status_sekolah: sekolah?.status_sekolah || 'aktif',
        akreditasi: sekolah?.akreditasi || 'Belum',
        tgl_akreditasi: sekolah?.tgl_akreditasi || '',
        ket: sekolah?.ket || '',
        foto_utama: sekolah?.foto_utama || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            const updateUrl =
                (typeof route === 'function' && route('admin.sekolah.update', sekolahId) && route('admin.sekolah.update', sekolahId) !== '#') ||
                `/admin/sekolah/${sekolahId}`;
            const toastId = toast.loading('Memperbarui sekolah...', {
                duration: Infinity,
            });
            put(updateUrl, {
                preserveScroll: false,
                onSuccess: () => {
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    const errorMsg =
                        errors && Object.keys(errors).length > 0 ? 'Gagal memperbarui sekolah. Periksa form Anda.' : 'Gagal memperbarui sekolah';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        } else {
            const storeUrl =
                (typeof route === 'function' && route('admin.sekolah.store') && route('admin.sekolah.store') !== '#') || '/admin/sekolah';
            const toastId = toast.loading('Menyimpan sekolah...', {
                duration: Infinity,
            });
            post(storeUrl, {
                preserveScroll: false,
                onSuccess: () => {
                    toast.dismiss(toastId);
                },
                onError: (errors) => {
                    const errorMsg =
                        errors && Object.keys(errors).length > 0 ? 'Gagal menambahkan sekolah. Periksa form Anda.' : 'Gagal menambahkan sekolah';
                    toast.error(errorMsg, {
                        id: toastId,
                        duration: 5000,
                    });
                },
            });
        }
    };

    const indexUrl = (typeof route === 'function' && route('admin.sekolah.index') && route('admin.sekolah.index') !== '#') || '/admin/sekolah';

    return (
        <AdminLayout title={isEdit ? 'Edit Sekolah' : 'Tambah Sekolah'}>
            <Head title={isEdit ? 'Edit Sekolah' : 'Tambah Sekolah'} />

            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6" data-aos="fade-down">
                    <Link href={indexUrl} className="mb-4 inline-flex items-center text-sm text-base-content/70 hover:text-base-content">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Sekolah
                    </Link>
                    <h2 className="text-2xl font-bold">{isEdit ? 'Edit Sekolah' : 'Tambah Sekolah Baru'}</h2>
                    <p className="text-sm text-base-content/70">{isEdit ? 'Perbarui data sekolah' : 'Masukkan data sekolah yang akan ditambahkan'}</p>
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
                                {/* NPSN */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            NPSN <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan NPSN"
                                        className={`input-bordered input w-full ${errors.npsn ? 'input-error' : ''}`}
                                        value={data.npsn}
                                        onChange={(e) => setData('npsn', e.target.value)}
                                        required
                                    />
                                    {errors.npsn && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.npsn}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Nama Sekolah */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Nama Sekolah <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama sekolah"
                                        className={`input-bordered input w-full ${errors.nm_sekolah ? 'input-error' : ''}`}
                                        value={data.nm_sekolah}
                                        onChange={(e) => setData('nm_sekolah', e.target.value)}
                                        required
                                    />
                                    {errors.nm_sekolah && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.nm_sekolah}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Kelurahan */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Kelurahan <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <select
                                        className={`select-bordered select w-full ${errors.id_kelurahan ? 'select-error' : ''}`}
                                        value={data.id_kelurahan}
                                        onChange={(e) => setData('id_kelurahan', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kelurahan</option>
                                        {kelurahans.map((kelurahan) => (
                                            <option key={kelurahan.id} value={kelurahan.id}>
                                                {kelurahan.nm_kelurahan} - {kelurahan.kecamatan?.nm_kecamatan}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_kelurahan && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.id_kelurahan}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Alamat <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Masukkan alamat lengkap"
                                        className={`textarea-bordered textarea w-full ${errors.alamat ? 'textarea-error' : ''}`}
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        required
                                    ></textarea>
                                    {errors.alamat && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.alamat}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Kontak */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="200">
                        <CardHeader>
                            <CardTitle>Kontak</CardTitle>
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
                                        className={`input-bordered input w-full ${errors.no_telp ? 'input-error' : ''}`}
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
                                        className={`input-bordered input w-full ${errors.email ? 'input-error' : ''}`}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.email}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Website */}
                                <div className="form-control sm:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Website</span>
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com"
                                        className={`input-bordered input w-full ${errors.website ? 'input-error' : ''}`}
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                    />
                                    {errors.website && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.website}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Koordinat Geografis */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Koordinat Geografis
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="mb-4">
                                <p className="mb-2 text-sm text-base-content/70">
                                    Pilih lokasi sekolah di peta dengan menggeser marker atau klik pada peta. Koordinat akan otomatis terisi.
                                </p>
                            </div>

                            {/* Peta */}
                            <div className="mb-4">
                                <MapPicker
                                    latitude={data.latitude}
                                    longitude={data.longitude}
                                    onLocationChange={(lat, lng) => {
                                        setData('latitude', lat.toString());
                                        setData('longitude', lng.toString());
                                    }}
                                    height="400px"
                                    sekolahs={sekolahs}
                                />
                            </div>
                            {sekolahs && sekolahs.length > 0 && (
                                <p className="mb-2 text-xs text-base-content/60">
                                    <span className="mr-1 inline-block h-3 w-3 rounded-full bg-blue-500"></span>
                                    Marker biru menunjukkan lokasi sekolah lain yang sudah terdaftar
                                </p>
                            )}

                            {/* Input Koordinat (Read-only atau bisa diedit manual) */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Latitude */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Latitude <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="-2.5333"
                                        className={`input-bordered input w-full ${errors.latitude ? 'input-error' : ''}`}
                                        value={data.latitude}
                                        onChange={(e) => {
                                            setData('latitude', e.target.value);
                                            // Update marker jika koordinat diubah manual
                                            if (e.target.value && parseFloat(e.target.value) && data.longitude && parseFloat(data.longitude)) {
                                                // Marker akan diupdate oleh useEffect di MapPicker
                                            }
                                        }}
                                        required
                                    />
                                    {errors.latitude && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.latitude}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Longitude */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Longitude <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="140.7167"
                                        className={`input-bordered input w-full ${errors.longitude ? 'input-error' : ''}`}
                                        value={data.longitude}
                                        onChange={(e) => {
                                            setData('longitude', e.target.value);
                                            // Update marker jika koordinat diubah manual
                                            if (e.target.value && parseFloat(e.target.value) && data.latitude && parseFloat(data.latitude)) {
                                                // Marker akan diupdate oleh useEffect di MapPicker
                                            }
                                        }}
                                        required
                                    />
                                    {errors.longitude && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.longitude}</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Informasi Sekolah */}
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="400">
                        <CardHeader>
                            <CardTitle>Informasi Sekolah</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Tahun Berdiri */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Tahun Berdiri</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="2000"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        className={`input-bordered input w-full ${errors.thn_berdiri ? 'input-error' : ''}`}
                                        value={data.thn_berdiri}
                                        onChange={(e) => setData('thn_berdiri', e.target.value)}
                                    />
                                    {errors.thn_berdiri && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.thn_berdiri}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Status Sekolah */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Status Sekolah <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <select
                                        className={`select-bordered select w-full ${errors.status_sekolah ? 'select-error' : ''}`}
                                        value={data.status_sekolah}
                                        onChange={(e) => setData('status_sekolah', e.target.value)}
                                        required
                                    >
                                        <option value="aktif">Aktif</option>
                                        <option value="tidak_aktif">Tidak Aktif</option>
                                    </select>
                                    {errors.status_sekolah && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.status_sekolah}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Akreditasi */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Akreditasi <span className="text-error">*</span>
                                        </span>
                                    </label>
                                    <select
                                        className={`select-bordered select w-full ${errors.akreditasi ? 'select-error' : ''}`}
                                        value={data.akreditasi}
                                        onChange={(e) => setData('akreditasi', e.target.value)}
                                        required
                                    >
                                        <option value="Belum">Belum</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                    {errors.akreditasi && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.akreditasi}</span>
                                        </label>
                                    )}
                                </div>

                                {/* Tanggal Akreditasi */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Tanggal Akreditasi</span>
                                    </label>
                                    <input
                                        type="date"
                                        className={`input-bordered input w-full ${errors.tgl_akreditasi ? 'input-error' : ''}`}
                                        value={data.tgl_akreditasi}
                                        onChange={(e) => setData('tgl_akreditasi', e.target.value)}
                                    />
                                    {errors.tgl_akreditasi && (
                                        <label className="label">
                                            <span className="label-text-alt text-error">{errors.tgl_akreditasi}</span>
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Keterangan */}
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Keterangan</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Masukkan keterangan tambahan (opsional)"
                                    className={`textarea-bordered textarea w-full ${errors.ket ? 'textarea-error' : ''}`}
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
                    <div className="bg-base flex justify-end gap-2" data-aos="fade-up" data-aos-delay="100">
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
