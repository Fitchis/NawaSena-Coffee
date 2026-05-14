"use client";
import React, { use, useState } from "react";

type MapsProps = {
  embedUrl?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
  locationName?: string;
  address?: string;
  phone?: string;
  hours?: string;
};

const DEFAULT_EMBED =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63319.94921506666!2d112.6962299!3d-7.297942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fb00578ee1d9%3A0x60bd89342c91a78c!2sKedai%20nawasena!5e0!3m2!1sen!2sid!4v1778784945055!5m2!1sen!2sid";

export function Maps({
  embedUrl = DEFAULT_EMBED,
  className = "",
  height = "420px",
  width = "100%",
  locationName = "Kedai Nawasena",
  address = "Surabaya, Jawa Timur, Indonesia",
  phone = "+6281390070770",
  hours = "16.00 – 00.00",
}: MapsProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style>{`
        .maps-root {
          --cream: #faf7f2;
          --ink: #1c1a17;
          --olive: #6b6b47;
          --sand: #d9c9a8;
          --accent: #c8a96e;
          --accent-deep: #a07d3e;
          --glass: rgba(250,247,242,0.92);
        }

        .maps-wrapper {
          background: var(--cream);
          border-radius: 28px;
          overflow: hidden;
          box-shadow:
            0 4px 6px rgba(28,26,23,0.04),
            0 20px 60px rgba(28,26,23,0.10),
            0 0 0 1px rgba(200,169,110,0.20);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Top header bar */
        .maps-header {
          background: #D92A2A;
          padding: 22px 28px 18px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          overflow: hidden;
        }

        .maps-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 80% 50%, rgba(200,169,110,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .maps-pin-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(200,169,110,0.40);
        }

        .maps-title {

          font-size: 1.25rem;
          font-weight: 700;
          color: var(--cream);
          letter-spacing: 0.01em;
          line-height: 1.2;
          margin: 0;
        }

        .maps-subtitle {
          font-size: 0.75rem;
          color: var(--sand);
          font-weight: 300;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Map container */
        .maps-iframe-container {
          position: relative;
          overflow: hidden;
          flex: 1;
        }

        .maps-loader {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--cream);
          gap: 12px;
          z-index: 1;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .maps-loader.hidden {
          opacity: 0;
          visibility: hidden;
        }

        .maps-loader-ring {
          width: 40px;
          height: 40px;
          border: 3px solid var(--sand);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .maps-loader-text {
          font-size: 0.8rem;
          color: var(--olive);
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        .maps-iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
          position: relative;
          z-index: 2;
        }

        /* Bottom info strip */
        .maps-footer {
          background: var(--cream);
          border-top: 1px solid rgba(200,169,110,0.20);
          padding: 16px 24px;
          display: flex;
          gap: 0;
          flex-wrap: wrap;
        }

        .maps-info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 160px;
          padding: 4px 12px 4px 0;
          border-right: 1px solid rgba(200,169,110,0.20);
          margin-right: 12px;
        }

        .maps-info-item:last-child {
          border-right: none;
          margin-right: 0;
        }

        .maps-info-icon {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, rgba(200,169,110,0.18) 0%, rgba(200,169,110,0.06) 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(200,169,110,0.25);
        }

        .maps-info-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--olive);
          font-weight: 500;
          margin-bottom: 1px;
        }

        .maps-info-value {
          font-size: 0.8rem;
          color: var(--ink);
          font-weight: 400;
          line-height: 1.3;
        }

        /* Open Maps button */
        .maps-open-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(200,169,110,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          white-space: nowrap;
          align-self: center;
          margin-left: auto;
        }

        .maps-open-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(200,169,110,0.45);
        }
      `}</style>

      <div className={`maps-root ${className}`} style={{ width }}>
        <div className="maps-wrapper">
          {/* Header */}
          <div className="maps-header">
            <div className="maps-pin-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="white"
                />
                <circle cx="12" cy="9" r="2.5" fill="rgba(28,26,23,0.5)" />
              </svg>
            </div>
            <div>
              <h3 className="maps-title">{locationName}</h3>
              <p className="maps-subtitle">Temukan Kami</p>
            </div>
          </div>

          {/* Map iframe */}
          <div className="maps-iframe-container" style={{ height }}>
            <div className={`maps-loader${loaded ? " hidden" : ""}`}>
              <div className="maps-loader-ring" />
              <span className="maps-loader-text">Memuat peta…</span>
            </div>
            <iframe
              src={embedUrl}
              className="maps-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Lokasi ${locationName}`}
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* Footer info strip */}
          <div className="maps-footer">
            <div className="maps-info-item">
              <div className="maps-info-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill="#c8a96e"
                  />
                </svg>
              </div>
              <div>
                <div className="maps-info-label">Alamat</div>
                <div className="maps-info-value">{address}</div>
              </div>
            </div>

            <div className="maps-info-item">
              <div className="maps-info-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.5l-4-4V7h1.5v4.79l3.5 3.5-1 1.21z"
                    fill="#c8a96e"
                  />
                </svg>
              </div>
              <div>
                <div className="maps-info-label">Jam Buka</div>
                <div className="maps-info-value">{hours}</div>
              </div>
            </div>

            <div className="maps-info-item">
              <div className="maps-info-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                    fill="#c8a96e"
                  />
                </svg>
              </div>
              <div>
                <div className="maps-info-label">Telepon</div>
                <div className="maps-info-value">{phone}</div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="maps-open-btn"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                  fill="white"
                />
              </svg>
              Buka Maps
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Maps;
