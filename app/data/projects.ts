import { Project } from './types';

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
      'React',
      'TypeScript',
      'JWT',
      'OAuth2',
      'SQL Server',
      'Entity Framework',
    ],
    complete: false,
  },
  {
    key: 'dalle',
    title: 'Dall-E Klonu',
    description:
      'OpenAI&apos;ın DALL-E&apos;sinden esinlenen bir yapay zeka görsel oluşturma uygulaması. Kullanıcılar MERN stack kullanarak metin komutlarına dayalı yapay zeka tarafından oluşturulan görselleri oluşturabilir ve paylaşabilir.',
    githubUrl: 'https://github.com/AdylshaY/dalle-clone',
    image: '/dalle-clone.png',
    technologies: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'OpenAI API',
    ],
    complete: true,
  },
  {
    key: 'airbnb',
    title: 'Airbnb Klonu',
    description:
      'Airbnb web sitesinin bir klonu. Kullanıcılar mülkleri arayabilir, detayları görüntüleyebilir ve konaklama rezervasyonu yapabilir.',
    githubUrl: 'https://github.com/AdylshaY/nextjs-airbnb-clone',
    image: '/airbnb-clone.png',
    technologies: ['Next.js', 'Tailwind CSS', 'Zustand', 'Prisma', 'MongoDB'],
    complete: true,
  },
  {
    key: 'twitter',
    title: 'Twitter Klonu',
    description:
      'Twitter&apos;ın modern bir klonu. Kullanıcılar tweet atabilir, diğer kullanıcıları takip edebilir ve etkileşimde bulunabilir. Next.js ve TypeScript kullanılarak geliştirilmiş tam özellikli bir sosyal medya uygulaması.',
    githubUrl: 'https://github.com/AdylshaY/nextjs-twitter-clone',
    image: '/twitter-image.png',
    technologies: [
      'Next.js',
      'Tailwind CSS',
      'Zustand',
      'NextAuth',
      'TypeScript',
    ],
    complete: true,
  },
  {
    key: 'aiPrompt',
    title: 'AI Prompt Uygulaması',
    description:
      'Kullanıcıların yapay zeka promptlarını oluşturup paylaşabilecekleri bir platform. Kullanıcılar kendi promptlarını kaydedebilir, başkalarının promptlarını keşfedebilir ve etkileşimde bulunabilir. Next.js ve modern kimlik doğrulama yöntemleri kullanılarak geliştirilmiştir.',
    githubUrl: 'https://github.com/AdylshaY/ai-prompt-app',
    image: '/prompt-app.png',
    technologies: ['Next.js', 'Tailwind CSS', 'Bcrypt', 'NextAuth'],
    complete: true,
  },
  {
    key: 'habit',
    title: 'Habit Tracker App',
    description:
      'Temiz, modern bir kullanıcı arayüzü ve güçlü özelliklerle kullanıcıların alışkanlıklarını takip etmelerine ve sürdürmelerine yardımcı olan bir Flutter uygulaması.',
    githubUrl: 'https://github.com/AdylshaY/habit_tracker_app',
    technologies: [
      'Flutter',
      'Dart',
      'Dio',
      'Intl',
      'Riverpod',
      'Go Router',
      'Hive',
    ],
    complete: true,
  },
];
