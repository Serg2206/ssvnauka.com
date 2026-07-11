'use client';

import React from 'react';

const WHATSAPP_URL = 'https://chat.whatsapp.com/BP1uBjDZEE70SlyKBmpZiZ';

export default function WhatsAppWidget() {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_join', {
        event_category: 'engagement',
        event_label: 'floating_widget',
      });
    }
  };

  return (
    <div className="ssv-whatsapp-widget" aria-label="WhatsApp Community">
      <div className="ssv-tooltip">Присоединиться к экспертному сообществу</div>
      <a
        href={`${WHATSAPP_URL}?utm_source=ssvnauka&utm_medium=website&utm_campaign=community_launch&utm_content=floating_widget`}
        target="_blank"
        rel="noopener noreferrer"
        className="ssv-btn"
        onClick={handleClick}
      >
        <svg className="ssv-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.3A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="ssv-btn-text">WhatsApp</span>
      </a>
      <span className="ssv-badge">NEW</span>

      <style jsx>{`
        .ssv-whatsapp-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: var(--font-inter), 'Segoe UI', system-ui, sans-serif;
        }
        .ssv-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #0D1B2A 0%, #1D3557 100%);
          color: #fff;
          padding: 14px 20px;
          border-radius: 50px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(230, 57, 70, 0.3), 0 0 40px rgba(230, 57, 70, 0.1);
          border: 2px solid #E63946;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .ssv-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(230, 57, 70, 0.4), 0 0 60px rgba(230, 57, 70, 0.2);
          background: linear-gradient(135deg, #1D3557 0%, #0D1B2A 100%);
        }
        .ssv-icon {
          width: 26px;
          height: 26px;
          fill: #E63946;
          flex-shrink: 0;
        }
        .ssv-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #E63946;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 12px;
          border: 2px solid #0D1B2A;
          animation: ssv-pulse 2s infinite;
          pointer-events: none;
        }
        @keyframes ssv-pulse {
          0% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(230, 57, 70, 0); }
          100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0); }
        }
        .ssv-tooltip {
          position: absolute;
          bottom: 68px;
          right: 0;
          background: #1D3557;
          color: #A8DADC;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12px;
          white-space: nowrap;
          border: 1px solid #E63946;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .ssv-whatsapp-widget:hover .ssv-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .ssv-whatsapp-widget {
            bottom: 16px;
            right: 16px;
          }
          .ssv-btn-text {
            display: none;
          }
          .ssv-btn {
            padding: 14px;
            border-radius: 50%;
          }
        }
      `}</style>
    </div>
  );
}
