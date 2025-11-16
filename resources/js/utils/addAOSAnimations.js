/**
 * Helper function untuk menambahkan animasi AOS ke elemen
 * Digunakan untuk konsistensi animasi di seluruh aplikasi
 */

export const aosAnimations = {
    header: { animation: 'fade-down', delay: 0 },
    search: { animation: 'fade-up', delay: 100 },
    card: { animation: 'fade-up', delay: 200 },
    tableRow: (index) => ({ animation: 'fade-in', delay: 300 + index * 50 }),
    formCard: { animation: 'fade-up', delay: 100 },
};

