import React from 'react';
import { TemplateProps } from '@/lib/types';

/**
 * Hero Template - Enhanced with gradients, modern shadows, and refined typography
 * Features 4 random layout variants, event-specific emojis, and premium styling
 */
export default function HeroTemplate({
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

  // Event emoji mapping based on keywords
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
          <stop offset="0%" stopColor={colorPalette.primary} stopOpacity="0.25" />
          <stop offset="100%" stopColor={colorPalette.primary} stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorPalette.accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={colorPalette.accent} stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Gradient circles for depth */}
      <circle cx="100" cy="150" r="120" fill="url(#primaryGrad)" />
      <circle cx="980" cy="1100" r="180" fill="url(#accentGrad)" />
      <circle cx="500" cy="50" r="100" fill="url(#primaryGrad)" />

      {/* Accent lines with gradient */}
      <line
        x1="0"
        y1="400"
        x2="1080"
        y2="400"
        stroke={colorPalette.primary}
        strokeWidth="2"
        opacity="0.08"
      />
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

      {/* Layout Variant 0: Icon Top Center, Title, Description, Details Below */}
      {layoutVariant === 0 && (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              flex: 1,
              padding: '80px 60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '200px',
                marginBottom: '30px',
                filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.15))',
              }}
            >
              {eventIcon}
            </div>
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                marginBottom: '20px',
                lineHeight: '1.1',
                background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
              }}
            >
              {event.eventName}
            </h1>
            {event.description && (
              <p
                style={{
                  fontSize: '24px',
                  opacity: 0.85,
                  marginBottom: '10px',
                  maxWidth: '800px',
                  lineHeight: '1.5',
                  letterSpacing: '0.3px',
                }}
              >
                {event.description}
              </p>
            )}
          </div>

          {/* Accent Divider Line */}
          <div
            style={{
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${colorPalette.primary}, ${colorPalette.accent}, transparent)`,
              margin: '0',
            }}
          />

          <div
            style={{
              background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.95)})`,
              color: isLightBg(colorPalette.primary) ? '#1A1A1A' : '#FFFFFF',
              padding: '50px 60px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  opacity: 0.75,
                  marginBottom: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                When
              </p>
              <p style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                {event.date}
              </p>
              <p style={{ fontSize: '20px', opacity: 0.9 }}>{event.time}</p>
            </div>
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  opacity: 0.75,
                  marginBottom: '10px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                }}
              >
                Where
              </p>
              <p style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                {event.location}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant 1: Icon Left, Content Right (Premium Side-by-Side) */}
      {layoutVariant === 1 && (
        <div style={{ display: 'flex', height: '100%' }}>
          <div
            style={{
              flex: '0 0 40%',
              background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.92)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '200px',
              filter: 'drop-shadow(8px 0 24px rgba(0, 0, 0, 0.15))',
            }}
          >
            {eventIcon}
          </div>
          <div
            style={{
              flex: '0 0 60%',
              padding: '80px 60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.5px',
                }}
              >
                {event.eventName}
              </h1>
              {event.description && (
                <p
                  style={{
                    fontSize: '22px',
                    color: colorPalette.secondary,
                    opacity: 0.9,
                    lineHeight: '1.6',
                    letterSpacing: '0.3px',
                  }}
                >
                  {event.description}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: '20px' }}>
              <div
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.93)})`,
                  padding: '30px',
                  borderRadius: '16px',
                  color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  When
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  {event.date}
                </p>
                <p style={{ fontSize: '18px', opacity: 0.95, marginTop: '4px' }}>{event.time}</p>
              </div>
              <div
                style={{
                  background: `linear-gradient(135deg, ${colorPalette.secondary}, ${adjustBrightness(colorPalette.secondary, 0.93)})`,
                  padding: '30px',
                  borderRadius: '16px',
                  color: isLightBg(colorPalette.secondary) ? '#1A1A1A' : '#FFFFFF',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Where
                </p>
                <p style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant 2: Centered with Icon Above - Modern Layout */}
      {layoutVariant === 2 && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '60px 40px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '220px',
              filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.15))',
            }}
          >
            {eventIcon}
          </div>

          <div>
            <h1
              style={{
                fontSize: '68px',
                fontWeight: 'bold',
                marginBottom: '20px',
                background: `linear-gradient(135deg, ${colorPalette.primary}, ${colorPalette.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.5px',
              }}
            >
              {event.eventName}
            </h1>
            {event.description && (
              <p
                style={{
                  fontSize: '24px',
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
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              width: '100%',
              maxWidth: '800px',
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.primary}, ${adjustBrightness(colorPalette.primary, 0.93)})`,
                padding: '40px 30px',
                borderRadius: '18px',
                color: isLightBg(colorPalette.primary) ? '#1A1A1A' : '#FFFFFF',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
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
                When
              </p>
              <p style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
                {event.date}
              </p>
              <p style={{ fontSize: '16px', opacity: 0.95 }}>{event.time}</p>
            </div>
            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.93)})`,
                padding: '40px 30px',
                borderRadius: '18px',
                color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.15)',
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
                Where
              </p>
              <p style={{ fontSize: '22px', fontWeight: '700' }}>{event.location}</p>
            </div>
          </div>
        </div>
      )}

      {/* Layout Variant 3: Icon + Title Top, Large Premium Detail Boxes Below */}
      {layoutVariant === 3 && (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              flex: '0 0 auto',
              padding: '60px 60px 50px',
              borderBottom: `3px solid`,
              borderImage: `linear-gradient(90deg, ${colorPalette.primary}, ${colorPalette.accent}) 1`,
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
                fontSize: '66px',
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
                  fontSize: '22px',
                  color: colorPalette.secondary,
                  lineHeight: '1.6',
                  maxWidth: '700px',
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
              gridTemplateRows: '1fr 1fr',
              gap: '25px',
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.accent}, ${adjustBrightness(colorPalette.accent, 0.92)})`,
                padding: '45px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: isLightBg(colorPalette.accent) ? '#1A1A1A' : '#FFFFFF',
                boxShadow: '0 16px 35px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '12px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  📅 Date & Time
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.5px' }}>
                  {event.date}
                </p>
                <p style={{ fontSize: '24px', opacity: 0.95 }}>{event.time}</p>
              </div>
            </div>

            <div
              style={{
                background: `linear-gradient(135deg, ${colorPalette.secondary}, ${adjustBrightness(colorPalette.secondary, 0.92)})`,
                padding: '45px',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: isLightBg(colorPalette.secondary) ? '#1A1A1A' : '#FFFFFF',
                boxShadow: '0 16px 35px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    opacity: 0.8,
                    marginBottom: '12px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  📍 Location
                </p>
                <p style={{ fontSize: '32px', fontWeight: '700', letterSpacing: '-0.5px' }}>
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer/Branding */}
      {logoUrl && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
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
            }}
          />
        </div>
      )}
    </div>
  );
}
