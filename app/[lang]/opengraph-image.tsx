import { ImageResponse } from 'next/og';

export const alt = 'Adylsha Yumayev - Software Engineer, C#/.NET & Backend';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const copy = {
  tr: {
    role: 'Yazılım Mühendisi — C#/.NET ve Backend Geliştirme',
    pills: ['C# / .NET', 'ASP.NET Core', 'SQL Server', 'Sistem Tasarımı'],
  },
  en: {
    role: 'Software Engineer — C#/.NET & Backend Engineering',
    pills: ['C# / .NET', 'ASP.NET Core', 'SQL Server', 'System Design'],
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = lang === 'en' ? copy.en : copy.tr;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 82% 18%, rgba(250,250,250,0.16) 0%, rgba(250,250,250,0) 42%), radial-gradient(circle at 8% 92%, rgba(250,250,250,0.10) 0%, rgba(250,250,250,0) 38%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row - brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 12,
              backgroundColor: '#fafafa',
              color: '#18181b',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            AY
          </div>
          <div style={{ display: 'flex', color: '#a1a1aa', fontSize: 24 }}>
            yumayev.dev
          </div>
        </div>

        {/* Middle - name + role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 76,
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.02em',
            }}
          >
            Adylsha Yumayev
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 500,
              color: '#d4d4d8',
            }}
          >
            {t.role}
          </div>
        </div>

        {/* Bottom row - focus pills */}
        <div style={{ display: 'flex', gap: 14 }}>
          {t.pills.map((pill) => (
            <div
              key={pill}
              style={{
                display: 'flex',
                padding: '12px 22px',
                borderRadius: 999,
                border: '1.5px solid rgba(250,250,250,0.22)',
                backgroundColor: 'rgba(250,250,250,0.06)',
                color: '#fafafa',
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
