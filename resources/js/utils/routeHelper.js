/**
 * Helper function untuk mendapatkan URL dari route name dengan fallback
 * 
 * @param {string} routeName - Nama route (e.g., 'admin.kecamatan.create')
 * @param {object|string|number} params - Parameter untuk route (optional)
 * @param {string} fallbackUrl - URL fallback jika route tidak ditemukan
 * @returns {string} URL yang valid
 */
export const getRouteUrl = (routeName, params = null, fallbackUrl = '#') => {
    if (typeof route === 'function') {
        try {
            const url = params !== null ? route(routeName, params) : route(routeName);
            if (url && typeof url === 'string' && url !== '#') {
                return url;
            }
        } catch (error) {
            console.warn(`Route helper failed for: ${routeName}`, error);
        }
    }
    return fallbackUrl;
};

