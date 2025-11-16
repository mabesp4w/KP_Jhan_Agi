import{c as y}from"./createLucideIcon-D5u0KSCq.js";import{r as n,j as l}from"./app-C88MIY-H.js";import{L as r}from"./leaflet-_qZNW8_J.js";/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],G=y("calendar",I);/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],P=y("globe",z);/**
 * @license lucide-react v0.553.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]],S=y("phone",A);delete r.Icon.Default.prototype._getIconUrl;r.Icon.Default.mergeOptions({iconRetinaUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",iconUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"});function O({sekolahs:c=[],height:b="400px",centerLat:o=null,centerLng:i=null,zoom:s=13,highlightedSekolahId:u=null,isActive:h=!0}){const m=n.useRef(null),t=n.useRef(null),p=n.useRef([]),[d,w]=n.useState(!1),$=-2.5333,_=140.7167,j=o&&parseFloat(o)?parseFloat(o):$,N=i&&parseFloat(i)?parseFloat(i):_;return n.useEffect(()=>{if(!m.current||t.current)return;const a=r.map(m.current,{zoomControl:!0}).setView([j,N],s);return r.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:19}).addTo(a),t.current=a,w(!0),()=>{t.current&&p.current.forEach(e=>{e&&t.current.removeLayer(e)}),p.current=[],t.current&&(t.current.remove(),t.current=null)}},[]),n.useEffect(()=>{if(d&&t.current&&o&&i){const a=parseFloat(o),e=parseFloat(i);!isNaN(a)&&!isNaN(e)&&t.current.setView([a,e],s)}},[o,i,s,d]),n.useEffect(()=>{if(!d||!t.current||!c||c.length===0)return;p.current.forEach(e=>{e&&t.current.removeLayer(e)}),p.current=[];const a=[];if(c.forEach(e=>{const f=parseFloat(e.latitude),x=parseFloat(e.longitude);if(isNaN(f)||isNaN(x))return;const g=u&&e.id===u&&h,B=`marker-${e.id}`,C=g?"#ef4444":"#3b82f6",M=r.divIcon({className:`custom-marker-sekolah ${g?"blinking-marker":""}`,html:`<div id="${B}" class="${g?"marker-blink":""}" style="
                    background-color: ${C};
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                    position: relative;
                    cursor: pointer;
                "></div>`,iconSize:[20,20],iconAnchor:[10,10],popupAnchor:[0,-10]}),k=r.marker([f,x],{icon:M}).addTo(t.current),R=E=>{const v={A:"#10b981",B:"#3b82f6",C:"#f59e0b",Belum:"#ef4444"};return v[E]||v.Belum},F=`
                <div style="
                    min-width: 280px;
                    max-width: 320px;
                    font-family: system-ui, -apple-system, sans-serif;
                ">
                    ${e.foto_utama?`
                        <div style="
                            margin-bottom: 12px;
                            overflow: hidden;
                            border-radius: 8px;
                            height: 120px;
                            width: 100%;
                        ">
                            <img 
                                src="/storage/${e.foto_utama}" 
                                alt="${e.nm_sekolah||"Sekolah"}"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                "
                            />
                        </div>
                    `:""}
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
                        ">${e.nm_sekolah||"Sekolah"}</h3>
                        ${e.akreditasi?`
                            <span style="
                                display: inline-block;
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 11px;
                                font-weight: 600;
                                background-color: ${R(e.akreditasi)};
                                color: white;
                                white-space: nowrap;
                            ">${e.akreditasi}</span>
                        `:""}
                    </div>
                    <div style="
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        font-size: 13px;
                        color: #6b7280;
                        margin-bottom: 12px;
                    ">
                        ${e.npsn?`
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span style="font-family: monospace;">${e.npsn}</span>
                            </div>
                        `:""}
                        ${e.kelurahan?`
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>📍</span>
                                <span>${e.kelurahan.nm_kelurahan}${e.kelurahan.kecamatan?`, ${e.kelurahan.kecamatan.nm_kecamatan}`:""}</span>
                            </div>
                        `:""}
                        ${e.no_telp?`
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>📞</span>
                                <span>${e.no_telp}</span>
                            </div>
                        `:""}
                        ${e.email?`
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>✉️</span>
                                <span>${e.email}</span>
                            </div>
                        `:""}
                        ${e.website?`
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>🌐</span>
                                <a href="${e.website}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none;">
                                    ${e.website}
                                </a>
                            </div>
                        `:""}
                        ${e.thn_berdiri?`
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <span>📅</span>
                                <span>Berdiri: ${e.thn_berdiri}</span>
                            </div>
                        `:""}
                    </div>
                    <a 
                        href="/sekolah/${e.id}"
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
            `;k.bindPopup(F,{maxWidth:350,className:"custom-popup-sekolah"}),p.current.push(k),a.push([f,x])}),a.length>0)if(a.length===1)t.current.setView(a[0],s);else{const e=r.latLngBounds(a);t.current.fitBounds(e,{padding:[50,50]})}},[c,d,s,u,h]),l.jsxs(l.Fragment,{children:[l.jsx("style",{children:`
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
            `}),l.jsx("div",{className:"w-full overflow-hidden rounded-lg border border-base-300",style:{height:b},children:l.jsx("div",{ref:m,className:"z-0 h-full w-full",style:{height:b}})})]})}export{G as C,P as G,O as M,S as P};
