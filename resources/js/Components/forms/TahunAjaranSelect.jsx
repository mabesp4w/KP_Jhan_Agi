import { useMemo } from 'react';

/**
 * Komponen Select untuk memilih Tahun Ajaran
 * 
 * @param {string} value - Nilai yang dipilih (format: 2024/2025)
 * @param {function} onChange - Callback saat nilai berubah
 * @param {string} className - Class tambahan
 * @param {boolean} required - Apakah field wajib diisi
 * @param {boolean} showPlaceholder - Tampilkan placeholder
 * @param {number} yearsBack - Jumlah tahun kebelakang (default: 5)
 * @param {object} errors - Error object dari form validation
 * @param {string} name - Nama field untuk error display
 */
export default function TahunAjaranSelect({
    value,
    onChange,
    className = '',
    required = false,
    showPlaceholder = true,
    yearsBack = 5,
    errors = null,
    name = 'thn_ajaran',
}) {
    // Generate tahun ajaran options
    const tahunAjaranOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const options = [];

        // Generate dari tahun sekarang sampai 5 tahun kebelakang
        // Format: 2024/2025 (tahun sekarang/tahun berikutnya)
        for (let i = 0; i <= yearsBack; i++) {
            const year = currentYear - i;
            const nextYear = year + 1;
            const thnAjaran = `${year}/${nextYear}`;
            options.push({
                value: thnAjaran,
                label: thnAjaran,
            });
        }

        return options;
    }, [yearsBack]);

    const hasError = errors && errors[name];

    return (
        <div className={`form-control w-full ${className}`.trim()}>
            <select
                className={`select select-bordered w-full ${hasError ? 'select-error' : ''}`.trim()}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            >
                {showPlaceholder && (
                    <option value="">
                        {required ? 'Pilih Tahun Ajaran' : 'Semua Tahun Ajaran'}
                    </option>
                )}
                {tahunAjaranOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {hasError && (
                <label className="label">
                    <span className="label-text-alt text-error">{errors[name]}</span>
                </label>
            )}
        </div>
    );
}

