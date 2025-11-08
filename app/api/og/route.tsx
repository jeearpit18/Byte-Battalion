import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'Developer';
  const handle = searchParams.get('handle') || 'dev';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #080A0F 0%, #14192B 100%)',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#E6ECF8',
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#93A1C6',
            }}
          >
            @{handle}
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#8A7CFF',
              marginTop: '20px',
            }}
          >
            DevOrbit
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
