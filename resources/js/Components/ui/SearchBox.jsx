import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import Card, { CardBody } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';

/**
 * Helper function untuk mendapatkan URL dari route name atau URL langsung
 */
const getUrl = (routeNameOrUrl) => {
    if (!routeNameOrUrl) return null;

    // Jika sudah berupa URL (string yang dimulai dengan /), langsung return
    if (typeof routeNameOrUrl === 'string' && routeNameOrUrl.startsWith('/')) {
        return routeNameOrUrl;
    }

    // Jika route helper tersedia dan route name valid, coba gunakan route helper
    if (typeof route === 'function' && typeof routeNameOrUrl === 'string') {
        try {
            const url = route(routeNameOrUrl);
            // Pastikan url adalah string yang valid
            if (url && typeof url === 'string' && url !== '#') {
                return url;
            }
        } catch (e) {
            // Route helper gagal, return null
            console.warn('Route helper failed for:', routeNameOrUrl, e);
        }
    }

    // Jika bukan string, mungkin sudah di-resolve sebelumnya, return as-is
    if (typeof routeNameOrUrl !== 'string') {
        return routeNameOrUrl;
    }

    return null;
};

/**
 * Komponen SearchBox yang reusable
 *
 * @param {string} placeholder - Placeholder untuk input search
 * @param {string|function} searchUrl - URL atau route name untuk melakukan search, atau callback function
 * @param {string} resetUrl - URL atau route name untuk reset search (optional, default: sama dengan searchUrl)
 * @param {string} defaultValue - Nilai default untuk search input
 * @param {function} onSearch - Callback function yang dipanggil saat search (optional, akan override searchUrl)
 * @param {boolean} showReset - Tampilkan tombol reset jika ada search value (default: true)
 * @param {string} className - Class tambahan untuk Card wrapper
 * @param {string} searchParam - Nama parameter untuk search query (default: 'search')
 */
export default function SearchBox({
    placeholder = 'Cari...',
    searchUrl,
    resetUrl,
    defaultValue = '',
    onSearch,
    showReset = true,
    className = '',
    searchParam = 'search',
}) {
    const [search, setSearch] = useState(defaultValue);

    // Update search value jika defaultValue berubah (misalnya dari props)
    useEffect(() => {
        setSearch(defaultValue);
    }, [defaultValue]);

    const handleSearch = (e) => {
        e.preventDefault();

        // Jika ada callback onSearch, gunakan itu
        if (onSearch) {
            onSearch(search);
            return;
        }

        // Jika searchUrl adalah function, panggil sebagai callback
        if (typeof searchUrl === 'function') {
            searchUrl(search);
            return;
        }

        // Default behavior: gunakan router.get
        // Jika searchUrl sudah berupa URL string, gunakan langsung
        // Jika searchUrl adalah route name, resolve dulu
        let url = searchUrl;

        if (typeof searchUrl === 'string') {
            url = getUrl(searchUrl);
        }

        if (url) {
            router.get(url, { [searchParam]: search }, { preserveState: true });
        } else {
            console.error('SearchBox: Invalid searchUrl provided:', searchUrl);
        }
    };

    const handleReset = () => {
        setSearch('');

        // Jika ada callback onSearch, panggil dengan empty string
        if (onSearch) {
            onSearch('');
            return;
        }

        // Jika searchUrl adalah function, panggil dengan empty string
        if (typeof searchUrl === 'function') {
            searchUrl('');
            return;
        }

        // Default behavior: gunakan router.get
        let url = resetUrl || searchUrl;

        if (typeof url === 'string') {
            url = getUrl(url);
        }

        if (url) {
            router.get(url, {}, { preserveState: true });
        }
    };

    const hasSearchValue = search && search.trim() !== '';

    return (
        <Card className={`mb-6 ${className}`}>
            <CardBody>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="input input-bordered w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="primary">
                        <Search className="h-4 w-4" />
                    </Button>
                    {showReset && hasSearchValue && (
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    )}
                </form>
            </CardBody>
        </Card>
    );
}

