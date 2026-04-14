"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { tourStops, MAP_CENTRE, MAP_ZOOM } from "@/lib/tourStops";

// Leaflet is client-side only. This component must be dynamically imported with ssr:false.
// Usage in page.tsx:
//   const TourMap = dynamic(() => import("@/components/TourMap").then(m => m.TourMap), { ssr: false });

export function TourMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [mapLoaded, setMapLoaded] = React.useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import("leaflet").then((L) => {
      // Guard again inside the async callback — the effect may have run twice
      // (React StrictMode / AnimatePresence remount) and both imports could
      // resolve. The second one must bail out if the map was already created.
      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        center: MAP_CENTRE,
        zoom: MAP_ZOOM,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // OpenStreetMap tile layer — warm/muted style
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Dashed green polyline connecting all stops in order
      const routeCoords = tourStops.map((s) => s.coords as [number, number]);
      L.polyline(routeCoords, {
        color: "#2DA96B",
        weight: 3,
        opacity: 0.8,
        dashArray: "8, 6",
        lineJoin: "round",
      }).addTo(map);

      // Custom numbered marker for each stop
      setMapLoaded(true);

      tourStops.forEach((stop) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            width: 32px;
            height: 32px;
            background: #2DA96B;
            border: 2.5px solid #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: sans-serif;
            font-size: 12px;
            font-weight: 700;
            color: #fff;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            cursor: pointer;
          ">${stop.id}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        L.marker(stop.coords as [number, number], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family: Georgia, serif; min-width: 160px;">
              <p style="font-size: 11px; font-weight: 600; color: #2DA96B; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 4px;">Stop ${stop.id}</p>
              <p style="font-size: 15px; font-weight: 700; color: #1A1A1A; margin: 0 0 6px;">${stop.name}</p>
              <p style="font-size: 13px; color: #6B7280; margin: 0; line-height: 1.5;">${stop.teaser}</p>
            </div>`,
            { maxWidth: 220 }
          );
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tour-map"
      className="section-padding bg-brand-bg"
    >
      <div className="brand-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-lora text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">
            The route
          </p>
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-brand-text">
            Map of the Route
          </h2>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-md border border-brand-accent/15"
          style={{ height: "480px" }}
        >
          {/* Leaflet CSS */}
          <style>{`
            .leaflet-container { height: 100%; width: 100%; }
            .leaflet-popup-content-wrapper {
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.12);
              border: 1px solid rgba(45,169,107,0.15);
            }
            .leaflet-popup-tip { background: #fff; }
          `}</style>
          {/* Loading skeleton — shows until Leaflet initialises */}
          {!mapLoaded && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "#f0f7f4" }}
              aria-label="Map loading"
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full border-4 border-brand-accent/30 border-t-brand-accent animate-spin"
                  aria-hidden="true"
                />
                <span className="text-sm text-brand-accent/70" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
                  Loading map...
                </span>
              </div>
            </div>
          )}
          <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-5 font-lora text-sm text-muted-foreground"
        >
          Starts and ends near The Forum. Relaxed pace throughout.
        </motion.p>
      </div>
    </section>
  );
}
