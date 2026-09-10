/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { getDictionary } from '../../utils/get-dictionary';
import { jobs } from '../../data/jobs';
import { projects } from '../../data/projects';
import { skillTiers } from '../../data/skills';
import { certificates } from '../../data/certificates';
import { socialLinks } from '../../data/social';
import type { Locale } from '../../../i18n-config';

const skillTierOrder = ['primary', 'secondary', 'supporting'] as const;

function buildHomepageMarkdown(dict: any, lang: string) {
  const lines: string[] = [];

  lines.push('# Adylsha Yumayev');
  lines.push('');
  lines.push(`> ${dict.hero.role}`);
  lines.push('');
  lines.push(dict.hero.description);
  lines.push('');

  lines.push(`## ${dict.about.title}`);
  lines.push('');
  lines.push(`_${dict.about.subtitle}_`);
  lines.push('');
  lines.push(dict.about.p1);
  lines.push('');
  lines.push(dict.about.p2);
  lines.push('');
  lines.push(dict.about.p3);
  lines.push('');

  lines.push(`## ${dict.about.experienceTitle}`);
  lines.push('');
  jobs.forEach((job) => {
    const jobDict = dict.about.jobs[job.key];
    if (!jobDict) return;
    lines.push(`### ${jobDict.role} — ${jobDict.title} (${job.period})`);
    lines.push('');
    jobDict.desc.forEach((item: string) => lines.push(`- ${item}`));
    lines.push('');
    if (job.technologies?.length) {
      lines.push(`Technologies: ${job.technologies.join(', ')}`);
      lines.push('');
    }
  });

  lines.push(`## ${dict.certificates.title}`);
  lines.push('');
  lines.push(dict.certificates.subtitle);
  lines.push('');
  certificates.forEach((cert) => {
    lines.push(`- ${cert.title} — ${cert.issuer} (${cert.date})`);
  });
  lines.push('');

  lines.push(`## ${dict.projects.title}`);
  lines.push('');
  projects.forEach((project) => {
    const projectDict = dict.projects.items[project.key];
    const title = projectDict?.title || project.title;
    const desc = projectDict?.desc || project.description;
    lines.push(`### ${title}`);
    lines.push('');
    lines.push(desc);
    lines.push('');
    lines.push(`Technologies: ${project.technologies.join(', ')}`);
    if (project.liveUrl) lines.push(`Live: ${project.liveUrl}`);
    if (project.githubUrl) lines.push(`Source: ${project.githubUrl}`);
    lines.push('');
  });

  lines.push(`## ${dict.skills.title}`);
  lines.push('');
  lines.push(dict.skills.intro);
  lines.push('');
  skillTierOrder.forEach((tier) => {
    lines.push(`### ${dict.skills.tiers[tier]}`);
    lines.push('');
    skillTiers[tier].forEach((skill) => lines.push(`- ${skill.name}`));
    lines.push('');
  });

  lines.push('## Contact');
  lines.push('');
  socialLinks
    .filter((link) => !link.href.startsWith('mailto:'))
    .forEach((link) => lines.push(`- ${link.label}: ${link.href}`));
  lines.push('- Email: adylshay@gmail.com');
  lines.push('');

  lines.push('---');
  lines.push(`Full page: https://yumayev.dev${lang === 'en' ? '/en' : ''}`);

  return lines.join('\n');
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const markdown = buildHomepageMarkdown(dict, lang);

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
      Vary: 'Accept',
    },
  });
}
