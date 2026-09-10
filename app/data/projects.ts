import { Project } from './types';

// Homepage shows featured projects only - the rest of the project history
// stays on GitHub via the "View all on GitHub" action button in Projects.tsx.
export const projects: (Project & { key: string })[] = [
  {
    key: 'yumasnap',
    title: 'YumaSnap - Etkinlik Fotoğraf Paylaşım Platformu',
    description:
      'Etkinlikler ve düğün salonları için özel olarak geliştirilmiş gerçek zamanlı bir fotoğraf paylaşım platformu. Misafirler herhangi bir kayıt veya uygulama indirme gereksinimi duymadan, sadece etkinlikteki QR kodu okutarak hızlıca fotoğraf yükleyebilir ve paylaşabilirler.',
    liveUrl: 'https://yumasnap.yumayev.dev',
    technologies: [
      'Next.js',
      'React',
      'Tailwind CSS',
      'TypeScript',
      'Supabase',
      'AWS S3',
    ],
    image: '/yumasnap.png',
    complete: false,
  },
  {
    key: 'YumaIdentity',
    title: 'YumaIdentity - IAM Servisi',
    description:
      'Tam özellikli bir Identity and Access Management (IAM) servisi. Kullanıcı kimlik doğrulama, yetkilendirme, rol yönetimi ve güvenli token tabanlı oturum yönetimi sağlar. Modern full-stack mimarisiyle geliştirilmiş, ölçeklenebilir bir kimlik yönetim platformu.',
    githubUrl: 'https://github.com/AdylshaY/YumaIdentity',
    technologies: [
      'ASP.NET Core',
      '.NET 9',
      'Entity Framework Core',
      'JWT',
      'OAuth 2.0 (PKCE)',
      'SQL Server',
      'Docker',
    ],
    complete: false,
  },
  {
    key: 'yumalog',
    title: 'YumaLog - Structured Logging & Observability for .NET',
    description:
      '.NET Framework ve .NET Core/.NET 5+ uygulamaları için geliştirdiğim, structured logging sağlayan bir kütüphane. Grafana Alloy ile toplanıp Grafana Loki üzerinden görselleştirilecek şekilde tasarlandı.',
    githubUrl: 'https://github.com/AdylshaY/Yumalog',
    technologies: [
      '.NET Standard 2.0',
      'Serilog',
      'Grafana Loki',
      'Grafana Alloy',
      'NuGet',
    ],
    complete: true,
  },
];
