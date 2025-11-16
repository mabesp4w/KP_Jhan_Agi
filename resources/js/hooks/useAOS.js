import { useEffect } from 'react';
import AOS from 'aos';

/**
 * Hook untuk refresh AOS saat komponen mount atau update
 * Berguna untuk Inertia.js yang tidak reload halaman penuh
 */
export default function useAOS() {
    useEffect(() => {
        AOS.refresh();
    }, []);
}

