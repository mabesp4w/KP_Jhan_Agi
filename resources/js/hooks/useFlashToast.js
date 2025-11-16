import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

/**
 * Hook untuk menampilkan flash messages sebagai toast
 * Gunakan di setiap halaman yang membutuhkan notifikasi
 */
export default function useFlashToast() {
    const { flash } = usePage().props;
    // Track flash object secara keseluruhan untuk mendeteksi perubahan
    const lastFlashRef = useRef(null);
    const hasShownRef = useRef(false);

    useEffect(() => {
        // Buat string representation dari flash object untuk perbandingan
        const currentFlashStr = JSON.stringify(flash || {});

        // Jika flash object berubah (berbeda dari yang terakhir), reset tracking
        if (currentFlashStr !== lastFlashRef.current) {
            hasShownRef.current = false;
            lastFlashRef.current = currentFlashStr;
        }

        // Check success message - tampilkan hanya jika belum pernah ditampilkan untuk flash object ini
        if (flash?.success && !hasShownRef.current) {
            toast.success(flash.success);
            hasShownRef.current = true;
        }

        // Check error message
        if (flash?.error && !hasShownRef.current) {
            toast.error(flash.error);
            hasShownRef.current = true;
        }

        // Check general message
        if (flash?.message && !hasShownRef.current) {
            toast(flash.message);
            hasShownRef.current = true;
        }
    }, [flash]);
}

