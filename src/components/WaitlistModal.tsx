import { useEffect } from 'react';
import { X } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top bar */}
        <div style={{
          height: '6px',
          background: 'linear-gradient(90deg, #1E4D72, #E8843A)',
          flexShrink: 0,
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#aaa',
            zIndex: 10,
            padding: '4px',
            lineHeight: 1,
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ padding: '28px 32px 0 32px', flexShrink: 0 }}>

          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: '#FFF5E6',
            color: '#E8843A',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '999px',
            marginBottom: '14px',
          }}>
            🔒 Wczesny dostęp · liczba miejsc ograniczona
          </div>

          {/* Title */}
          <h2 style={{
            color: '#102D45',
            fontSize: '22px',
            fontWeight: 800,
            lineHeight: 1.3,
            margin: '0 0 6px 0',
            textAlign: 'center',
          }}>
            Chcesz zaoszczędzić godziny analizy, dołącz do nas i wyskaluj swój sklep razem z Shoppalyzer'em
          </h2>

          {/* Subtitle */}
          <p style={{
            color: '#888',
            fontSize: '13px',
            margin: '0',
            lineHeight: 1.5,
            textAlign: 'center',
          }}>
            Dołącz do listy wczesnego dostępu. Odezwiemy się do Ciebie w ciągu 24 godzin.
          </p>
        </div>

        {/* Tally iframe */}
        <div style={{ padding: '0 16px', flex: 1 }}>
          <iframe
            src="https://tally.so/embed/ZjVdl0?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            width="100%"
            style={{
              border: 'none',
              display: 'block',
              minHeight: '280px',
              height: 'auto',
            }}
            title="Waitlist Shoppalyzer"
          />
        </div>

        {/* Trust line */}
        <div style={{
          textAlign: 'center',
          fontSize: '11px',
          color: '#bbb',
          padding: '0 32px 24px',
          flexShrink: 0,
        }}>
          🔐 Nie wysyłamy spamu. Tylko informacja o dostępie.
        </div>
      </div>
    </div>
  );
};

