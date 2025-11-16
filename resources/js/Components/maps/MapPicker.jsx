import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';

// Fix untuk default marker icon di Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export default function MapPicker({ latitude, longitude, onLocationChange, height = '400px', sekolahs = [] }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);
    const sekolahMarkersRef = useRef([]);
    const [isMapReady, setIsMapReady] = useState(false);

    // Koordinat default untuk Kota Jayapura
    const defaultLat = -2.5333;
    const defaultLng = 140.7167;

    // Tentukan koordinat awal
    const initialLat = latitude && parseFloat(latitude) ? parseFloat(latitude) : defaultLat;
    const initialLng = longitude && parseFloat(longitude) ? parseFloat(longitude) : defaultLng;

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Inisialisasi peta
        const map = L.map(mapRef.current, {
            zoomControl: true,
        }).setView([initialLat, initialLng], 13);

        // Tambahkan tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);

        // Buat marker yang bisa digeser
        const marker = L.marker([initialLat, initialLng], {
            draggable: true,
            autoPan: true,
        }).addTo(map);

        // Popup untuk menampilkan koordinat
        marker.bindPopup(`Koordinat: ${initialLat.toFixed(6)}, ${initialLng.toFixed(6)}`).openPopup();

        // Event saat marker digeser
        marker.on('dragend', function (e) {
            const position = marker.getLatLng();
            marker.setPopupContent(`Koordinat: ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`).openPopup();
            if (onLocationChange) {
                onLocationChange(position.lat, position.lng);
            }
        });

        // Event saat peta diklik
        map.on('click', function (e) {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            marker.setPopupContent(`Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`).openPopup();
            if (onLocationChange) {
                onLocationChange(lat, lng);
            }
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;
        setIsMapReady(true);

        // Cleanup
        return () => {
            // Hapus semua marker sekolah
            if (mapInstanceRef.current) {
                sekolahMarkersRef.current.forEach((m) => {
                    if (m) mapInstanceRef.current.removeLayer(m);
                });
            }
            sekolahMarkersRef.current = [];

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerRef.current = null;
            }
        };
    }, []); // Hanya run sekali saat mount

    // Tambahkan marker untuk sekolah lain
    useEffect(() => {
        if (!isMapReady || !mapInstanceRef.current || !sekolahs || sekolahs.length === 0) return;

        // Hapus marker sekolah yang sudah ada
        sekolahMarkersRef.current.forEach((marker) => {
            if (marker) {
                mapInstanceRef.current.removeLayer(marker);
            }
        });
        sekolahMarkersRef.current = [];

        // Buat marker untuk setiap sekolah
        sekolahs.forEach((sekolah) => {
            const lat = parseFloat(sekolah.latitude);
            const lng = parseFloat(sekolah.longitude);

            if (isNaN(lat) || isNaN(lng)) return;

            // Buat custom icon untuk marker sekolah (warna biru, bentuk bulat)
            const sekolahIcon = L.divIcon({
                className: 'custom-marker-sekolah',
                html: `<div style="
                    background-color: #3b82f6;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                    position: relative;
                "></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10],
            });

            const sekolahMarker = L.marker([lat, lng], {
                icon: sekolahIcon,
                zIndexOffset: -100, // Agar marker sekolah berada di bawah marker utama
            }).addTo(mapInstanceRef.current);

            // Popup dengan informasi sekolah
            const popupContent = `
                <div style="min-width: 150px;">
                    <strong>${sekolah.nm_sekolah || 'Sekolah'}</strong>
                    ${sekolah.alamat ? `<br><small>${sekolah.alamat}</small>` : ''}
                </div>
            `;
            sekolahMarker.bindPopup(popupContent);

            sekolahMarkersRef.current.push(sekolahMarker);
        });
    }, [sekolahs, isMapReady]);

    // Update marker position saat latitude/longitude berubah dari luar
    useEffect(() => {
        if (isMapReady && markerRef.current && mapInstanceRef.current) {
            const lat = latitude && parseFloat(latitude) ? parseFloat(latitude) : null;
            const lng = longitude && parseFloat(longitude) ? parseFloat(longitude) : null;

            if (lat !== null && lng !== null) {
                const currentPos = markerRef.current.getLatLng();
                // Hanya update jika berbeda (untuk menghindari loop)
                if (Math.abs(currentPos.lat - lat) > 0.0001 || Math.abs(currentPos.lng - lng) > 0.0001) {
                    markerRef.current.setLatLng([lat, lng]);
                    markerRef.current.setPopupContent(`Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
                    mapInstanceRef.current.setView([lat, lng], mapInstanceRef.current.getZoom());
                }
            }
        }
    }, [latitude, longitude, isMapReady]);

    return (
        <>
            <style>{`
                .custom-marker-sekolah {
                    background: transparent !important;
                    border: none !important;
                }
            `}</style>
            <div className="w-full overflow-hidden rounded-lg border border-base-300" style={{ height }}>
                <div ref={mapRef} className="z-0 h-full w-full" style={{ height }} />
            </div>
        </>
    );
}
