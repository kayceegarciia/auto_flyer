import React from 'react';
import { TemplateProps } from '@/lib/types';

/**
 * Split Template - Enhanced with gradients, modern shadows, and premium styling
 * Features 4 random layout variants, event-specific emojis, and sophisticated design
 */
export default function SplitTemplate({
  event,
  colorPalette,
  logoUrl,
}: TemplateProps) {
  // Determine text color based on background brightness
  const isLightBg = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };

  // Adjust brightness of colors for gradient depth
  const adjustBrightness = (color: string, factor: number): string => {
    const hex = color.replace('#', '');
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    
    r = Math.min(255, Math.max(0, Math.round(r * factor)));
    g = Math.min(255, Math.max(0, Math.round(g * factor)));
    b = Math.min(255, Math.max(0, Math.round(b * factor)));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const textColor = isLightBg(colorPalette.background) ? '#1A1A1A' : '#FFFFFF';
  const layoutVariant = Math.floor(Math.random() * 4);

  // Event emoji mapping
  const eventEmojis: { [key: string]: string } = {
    music: '🎵',
    concert: '🎤',
    festival: '🎉',
    sports: '⚽',
    game: '🎮',
    tech: '💻',
    art: '🎨',
    workshop: '📚',
    conference: '🎯',
    party: '🎊',
    dance: '💃',
    run: '🏃',
    meeting: '👥',
    networking: '🤝',
  };

  const getEventIcon = () => {
    const eventLower = event.eventName.toLowerCase();
    for (const [keyword, emoji] of Object.entries(eventEmojis)) {
      if (eventLower.includes(keyword)) return emoji;
    }
    return '⭐';
  };

  const eventIcon = getEventIcon();

  // SVG Decorative Elements - Enhanced with gradients and opacity
  const DecorativeShapes = () => (
    <svg
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
      viewBox="0 0 1080 1350"
    >
      <defs>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorPalette.primary} stopOpacity="0.2" />
          <stop offset="100%" stopColor={colorPalette.primary} stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorPalette.accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={colorPalette.accent} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Gradient circles for depth */}
      <circle cx="150" cy="200" r="130" fill="url(#primaryGrad)" />
      <circle cx="950" cy="1000" r="150" fill="url(#accentGrad)" />
    </svg>
  );

  return (
    <div
      style={{
        width: '1080px',
        height: '1350px',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${colorPalette.background} 0%, ${adjustBrightness(colorPalette.background, isLightBg(colorPalette.background) ? 0.97 : 1.05)} 100%)`,
        fontFamily: 'Poppins, sans-serif',
        color: textColor,
      }}
    >
      <DecorativeShapes />

      {/* Layout Variant 0: Colored Left Panel with Icon, Content Right (Premium) */}
      {layoutVariant === 0 && (
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              flex: '0 0 45%',
              background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.92)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '200px',
              filter: 'drop-shadow(8px 0 24px rgba(0, 0, 0, 0.15))',
              color: isLightBg(colorPalette.primary) ? '#1A1A1A' : '#FFFFFF',
            }}
          >
            {eventIcon}
          </div>
          <div
            style={{
              flex: '0 0 55%',
              padding: '60px 50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '54px',
                  fontWeight: 'bold',
                  background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '15px',
                  letterSpacing: '-0.5px',
                }}
              >
                {event.eventName}
              </h1>
              {event.description && (
                <p
                  style={{
                    fontSize: '18px',
                    color: colorPalette.secondary,
                    lineHeight: '1.6',
                    opacity: 0.95,
                  }}
                >
                  {event.description}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.93)})`,
                  padding: '28px 20px',
                  borderRadius: '16px',
                  color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '8px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  When
                </p>
                <p style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px', letterSpacing: '-0.5px' }}>
                  {event.date}
                </p>
                <p style={{ fontSize: '16px', opacity: 0.95 }}>{event.time}</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.secondary}, ${adjustBrightness(colorPalette.secondary, 0.93)})`,
                  padding: '28px 20px',
                  borderRadius: '16px',
                  color: isLightBg(colorPalette.secondary) ? '#1A1A1A' : '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '8px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Where
                </p>
                <p style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant 1: Emoji Top Center, Two Column Details Below (Premium) */}
      {layoutVariant === 1 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              flex: '0 0 auto',
              padding: '60px 60px 50px',
              textAlign: 'center',
              borderBottom: `3px solid`,
              borderImage: `linear-gradient(90deg, ${colorPalette.primary}, ${colorPalette.accent}) 1`,
            }}
          >
            <div
              style={{
                fontSize: '180px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.15))',
              }}
            >
              {eventIcon}
            </div>
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '15px',
                letterSpacing: '-0.5px',
              }}
            >
              {event.eventName}
            </h1>
            {event.description && (
              <p
                style={{
                  fontSize: '20px',
                  color: colorPalette.secondary,
                  lineHeight: '1.6',
                  maxWidth: '700px',
                  margin: '0 auto',
                }}
              >
                {event.description}
              </p>
            )}
          </div>

          <div
            style={{
              flex: 1,
              padding: '40px 60px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.93)})`,
                padding: '50px 40px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: isLightBg(colorPalette.primary) ? '#1A1A1A' : '#FFFFFF',
                boxShadow: '0 16px 35px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  opacity: 0.8,
                  marginBottom: '14px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                📅 Date & Time
              </p>
              <p style={{ fontSize: '28px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.5px' }}>
                {event.date}
              </p>
              <p style={{ fontSize: '20px', opacity: 0.95 }}>{event.time}</p>
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.93)})`,
                padding: '50px 40px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                boxShadow: '0 16px 35px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  opacity: 0.8,
                  marginBottom: '14px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                📍 Location
              </p>
              <p style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                {event.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant 2: Vertical Stacked Premium Sections */}
      {layoutVariant === 2 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              flex: '0 0 auto',
              background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.92)})`,
              padding: '50px 60px',
              color: isLightBg(colorPalette.primary) ? '#1A1A1A' : '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '160px',
                marginBottom: '20px',
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
              }}
            >
              {eventIcon}
            </div>
            <h1
              style={{
                fontSize: '58px',
                fontWeight: 'bold',
                marginBottom: '10px',
                letterSpacing: '-0.5px',
              }}
            >
              {event.eventName}
            </h1>
          </div>

          {event.description && (
            <div
              style={{
                flex: '0 0 auto',
                background: `linear-gradient(135deg, ${colorPalette.secondary}, ${adjustBrightness(colorPalette.secondary, 0.93)})`,
                padding: '40px 60px',
                color: isLightBg(colorPalette.secondary) ? '#1A1A1A' : '#FFFFFF',
                fontSize: '20px',
                lineHeight: '1.7',
                borderBottom: `3px solid`,
                borderImage: `linear-gradient(90deg, ${colorPalette.primary}, ${colorPalette.accent}) 1`,
              }}
            >
              {event.description}
            </div>
          )}

          <div
            style={{
              flex: 1,
              padding: '40px 60px',
              display: 'grid',
              gridTemplateRows: '1fr 1fr',
              gap: '25px',
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.92)})`,
                padding: '45px',
                borderRadius: '18px',
                color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 16px 35px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  opacity: 0.8,
                  marginBottom: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                📅 When
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {event.date}
              </p>
              <p style={{ fontSize: '24px', opacity: 0.95 }}>{event.time}</p>
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.88)})`,
                padding: '45px',
                borderRadius: '18px',
                color: isLightBg(colorPalette.primary) ? '#1A1A1A' : '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 16px 35px rgba(0, 0, 0, 0.15)',
              }}
            >
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  opacity: 0.8,
                  marginBottom: '12px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                📍 Where
              </p>
              <p style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                {event.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant 3: Content Left, Colored Icon Right (Mirror Premium) */}
      {layoutVariant === 3 && (
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              flex: '0 0 55%',
              padding: '60px 50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '120px',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
                }}
              >
                {eventIcon}
              </div>
              <h1
                style={{
                  fontSize: '54px',
                  fontWeight: 'bold',
                  background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '15px',
                  letterSpacing: '-0.5px',
                }}
              >
                {event.eventName}
              </h1>
              {event.description && (
                <p
                  style={{
                    fontSize: '18px',
                    color: colorPalette.secondary,
                    lineHeight: '1.6',
                    opacity: 0.95,
                  }}
                >
                  {event.description}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.93)})`,
                  padding: '28px 20px',
                  borderRadius: '16px',
                  color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '8px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  When
                </p>
                <p style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px', letterSpacing: '-0.5px' }}>
                  {event.date}
                </p>
                <p style={{ fontSize: '16px', opacity: 0.95 }}>{event.time}</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.secondary}, ${adjustBrightness(colorPalette.secondary, 0.93)})`,
                  padding: '28px 20px',
                  borderRadius: '16px',
                  color: isLightBg(colorPalette.secondary) ? '#1A1A1A' : '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                }}
              >
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '8px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Where
                </p>
                <p style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  {event.location}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              flex: '0 0 45%',
              background: `linear-gradient(135deg, ${colorPalette.secondary}, ${adjustBrightness(colorPalette.secondary, 0.92)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '200px',
              filter: 'drop-shadow(-8px 0 24px rgba(0, 0, 0, 0.15))',
              color: isLightBg(colorPalette.secondary) ? '#1A1A1A' : '#FFFFFF',
            }}
          >
            {eventIcon}
          </div>
        </div>
      )}

      {/* Footer/Branding */}
      {logoUrl && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '30px',
            zIndex: 20,
          }}
        >
          <img
            src={logoUrl}
            alt="Logo"
            style={{
              height: '50px',
              objectFit: 'contain',
              filter: textColor === '#1A1A1A' ? 'invert(0)' : 'invert(0)',
            }}
          />
        </div>
      )}
    </div>
  );
}
