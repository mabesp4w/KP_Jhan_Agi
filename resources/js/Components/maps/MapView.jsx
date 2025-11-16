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

export default function MapView({ sekolahs = [], height = '400px', centerLat = null, centerLng = null, zoom = 13, highlightedSekolahId = null, isActive = true }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const [isMapReady, setIsMapReady] = useState(false);

    // Koordinat default untuk Kota Jayapura
    const defaultLat = -2.5333;
    const defaultLng = 140.7167;

    // Tentukan center peta
    const mapCenterLat = centerLat && parseFloat(centerLat) ? parseFloat(centerLat) : defaultLat;
    const mapCenterLng = centerLng && parseFloat(centerLng) ? parseFloat(centerLng) : defaultLng;

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Inisialisasi peta
        const map = L.map(mapRef.current, {
            zoomControl: true,
        }).setView([mapCenterLat, mapCenterLng], zoom);

        // Tambahkan tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapReady(true);

        // Cleanup
        return () => {
            // Hapus semua marker
            if (mapInstanceRef.current) {
                markersRef.current.forEach((m) => {
                    if (m) mapInstanceRef.current.removeLayer(m);
                });
            }
            markersRef.current = [];

            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Hanya run sekali saat mount

    // Update center jika berubah
    useEffect(() => {
        if (isMapReady && mapInstanceRef.current && centerLat && centerLng) {
            const lat = parseFloat(centerLat);
            const lng = parseFloat(centerLng);
            if (!isNaN(lat) && !isNaN(lng)) {
                mapInstanceRef.current.setView([lat, lng], zoom);
            }
        }
    }, [centerLat, centerLng, zoom, isMapReady]);

    // Tambahkan marker untuk setiap sekolah
    useEffect(() => {
        if (!isMapReady || !mapInstanceRef.current || !sekolahs || sekolahs.length === 0) return;

        // Hapus marker yang sudah ada
        markersRef.current.forEach((marker) => {
            if (marker) {
                mapInstanceRef.current.removeLayer(marker);
            }
        });
        markersRef.current = [];

        // Buat marker untuk setiap sekolah
        const bounds = [];
        sekolahs.forEach((sekolah) => {
            const lat = parseFloat(sekolah.latitude);
            const lng = parseFloat(sekolah.longitude);

            if (isNaN(lat) || isNaN(lng)) return;

            // Tentukan apakah marker ini harus berkedip (jika ini adalah sekolah yang sedang dilihat dan aktif)
            const shouldBlink = highlightedSekolahId && sekolah.id === highlightedSekolahId && isActive;
            const markerId = `marker-${sekolah.id}`;
            
            // Tentukan warna marker: merah jika berkedip, biru jika normal
            const markerColor = shouldBlink ? '#ef4444' : '#3b82f6';
            
            // Buat custom icon untuk marker sekolah (warna merah jika berkedip, biru jika normal, bentuk bulat)
            const sekolahIcon = L.divIcon({
                className: `custom-marker-sekolah ${shouldBlink ? 'blinking-marker' : ''}`,
                html: `<div id="${markerId}" class="${shouldBlink ? 'marker-blink' : ''}" style="
                    background-color: ${markerColor};
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                    position: relative;
                    cursor: pointer;
                "></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10],
            });

            const marker = L.marker([lat, lng], {
                icon: sekolahIcon,
            }).addTo(mapInstanceRef.current);

            // Helper untuk badge akreditasi
            const getBadgeColor = (akreditasi) => {
                const colors = {
                    A: '#10b981', // success
                    B: '#3b82f6', // info
                    C: '#f59e0b', // warning
                    Belum: '#ef4444', // error
                };
                return colors[akreditasi] || colors['Belum'];
            };

            // Buat popup dengan style yang mirip dengan card sekolah
            const popupContent = `
                <div style="
                    min-width: 280px;
                    max-width: 320px;
                    font-family: system-ui, -apple-system, sans-serif;
                ">
                    ${sekolah.foto_utama ? `
                        <div style="
                            margin-bottom: 12px;
                            overflow: hidden;
                            border-radius: 8px;
                            height: 120px;
                            width: 100%;
                        ">
                            <img 
                                src="/storage/${sekolah.foto_utama}" 
                                alt="${sekolah.nm_sekolah || 'Sekolah'}"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                "
                            />
                        </div>
                    ` : ''}
                    <div style="
                        display: flex;
                        align-items: flex-start;
                        justify-content: space-between;
                        margin-bottom: 12px;
                    ">
                        <h3 style="
                            font-size: 16px;
                            font-weight: 700;
                            margin: 0;
                            color: #1f2937;
                            flex: 1;
                            margin-right: 8px;
                        ">${sekolah.nm_sekolah || 'Sekolah'}</h3>
                        ${sekolah.akreditasi ? `
                            <span style="
                                display: inline-block;
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 11px;
                                font-weight: 600;
                                background-color: ${getBadgeColor(sekolah.akreditasi)};
                                color: white;
                                white-space: nowrap;
                            ">${sekolah.akreditasi}</span>
                        ` : ''}
                    </div>
                    <div style="
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        font-size: 13px;
                        color: #6b7280;
                        margin-bottom: 12px;
                    ">
                        ${sekolah.npsn ? `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span style="font-family: monospace;">${sekolah.npsn}</span>
                            </div>
                        ` : ''}
                        ${sekolah.kelurahan ? `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>📍</span>
                                <span>${sekolah.kelurahan.nm_kelurahan}${sekolah.kelurahan.kecamatan ? `, ${sekolah.kelurahan.kecamatan.nm_kecamatan}` : ''}</span>
                            </div>
                        ` : ''}
                        ${sekolah.no_telp ? `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>📞</span>
                                <span>${sekolah.no_telp}</span>
                            </div>
                        ` : ''}
                        ${sekolah.email ? `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>✉️</span>
                                <span>${sekolah.email}</span>
                            </div>
                        ` : ''}
                        ${sekolah.website ? `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>🌐</span>
                                <a href="${sekolah.website}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none;">
                                    ${sekolah.website}
                                </a>
                            </div>
                        ` : ''}
                        ${sekolah.thn_berdiri ? `
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>📅</span>
                                <span>Berdiri: ${sekolah.thn_berdiri}</span>
                            </div>
                        ` : ''}
                    </div>
                    <a 
                        href="/sekolah/${sekolah.id}"
                        style="
                            display: block;
                            width: 100%;
                            padding: 8px 16px;
                            background-color: #3b82f6;
                            color: white;
                            text-align: center;
                            text-decoration: none;
                            border-radius: 6px;
                            font-size: 14px;
                            font-weight: 500;
                            transition: background-color 0.2s;
                        "
                        onmouseover="this.style.backgroundColor='#2563eb'"
                        onmouseout="this.style.backgroundColor='#3b82f6'"
                    >
                        Lihat Detail
                    </a>
                </div>
            `;

            marker.bindPopup(popupContent, {
                maxWidth: 350,
                className: 'custom-popup-sekolah',
            });

            markersRef.current.push(marker);
            bounds.push([lat, lng]);
        });

        // Fit bounds jika ada marker
        if (bounds.length > 0) {
            if (bounds.length === 1) {
                // Jika hanya satu marker, set view ke marker tersebut
                mapInstanceRef.current.setView(bounds[0], zoom);
            } else {
                // Jika ada banyak marker, fit bounds
                const boundsGroup = L.latLngBounds(bounds);
                mapInstanceRef.current.fitBounds(boundsGroup, { padding: [50, 50] });
            }
        }
    }, [sekolahs, isMapReady, zoom, highlightedSekolahId, isActive]);

    return (
        <>
            <style>{`
                .custom-marker-sekolah {
                    background: transparent !important;
                    border: none !important;
                }
                .custom-popup-sekolah .leaflet-popup-content-wrapper {
                    border-radius: 8px;
                    padding: 0;
                }
                .custom-popup-sekolah .leaflet-popup-content {
                    margin: 0;
                    padding: 16px;
                }
                .custom-popup-sekolah .leaflet-popup-tip {
                    background: white;
                }
                @keyframes markerBlink {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.4;
                        transform: scale(1.3);
                    }
                }
                .marker-blink {
                    animation: markerBlink 1.5s ease-in-out infinite !important;
                }
                .blinking-marker .marker-blink {
                    animation: markerBlink 1.5s ease-in-out infinite !important;
                }
            `}</style>
            <div className="w-full overflow-hidden rounded-lg border border-base-300" style={{ height }}>
                <div ref={mapRef} className="z-0 h-full w-full" style={{ height }} />
            </div>
        </>
    );
}

