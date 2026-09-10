'use client';

// A structured-log stream: the hero's atmosphere is built from the same
// material this engineer actually ships (YumaLog, Grafana/Loki observability
// work), instead of a generic decorative gradient.
const logLines = [
  'GET   /api/health                200   12ms',
  'POST  /api/auth/token            201   84ms',
  'INFO  cache.hit        key=user:8841',
  'GET   /api/orders?status=open    200   31ms',
  'WARN  latency.p95      route=/sync    214ms',
  'INFO  worker.tick      queue=logs     ok',
  'POST  /api/events                202   9ms',
  'DEBUG trace_id=7f2a-9e1c-44b0-9d31',
  'GET   /api/projects/yumaidentity 200   18ms',
  'INFO  db.migration     status=applied',
];

const columns = [
  { skip: 0, delay: '0s' },
  { skip: 3, delay: '-11s' },
  // { skip: 6, delay: '-22s' },
];

export const HeroBackground = () => {
  return (
    <div
      className='absolute inset-0 z-0 overflow-hidden hidden lg:block'
      aria-hidden='true'
    >
      {/* Log stream, spanning the full hero. Now that the accent color was
          reverted (monochrome only), these lines are the same white as the
          headline/body copy with nothing to separate the two by hue, so
          they need to stay much quieter than the tinted version did —
          opacity is the only lever left to keep them legible-but-present. */}
      <div
        className='absolute inset-0 overflow-hidden'
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      >
        <div className='h-full grid grid-cols-3 gap-x-10 xl:gap-x-16 px-8'>
          {columns.map((col, colIndex) => {
            const ordered = [
              ...logLines.slice(col.skip),
              ...logLines.slice(0, col.skip),
            ];
            return (
              <div
                key={colIndex}
                className='animate-log-scroll flex flex-col gap-5 pt-16 text-xs sm:text-sm tracking-tight text-primary/[0.06] whitespace-nowrap'
                style={{
                  animationDelay: col.delay,
                  // Deliberately NOT font-mono/JetBrains Mono: that face is
                  // now reserved for real headings. A plain system-mono
                  // fallback keeps this reading as quiet background texture
                  // instead of competing with the new heading identity.
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
                }}
              >
                {[...ordered, ...ordered].map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Slow telemetry sweep */}
      <div className='animate-scan-sweep absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent' />
    </div>
  );
};
