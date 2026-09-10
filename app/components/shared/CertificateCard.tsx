'use client';

import { m } from 'framer-motion';
import { Certificate } from '@/app/data/types';
import { motionItem } from './MotionContainer';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { useDictionary } from '../../context/DictionaryContext';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const dict = useDictionary();
  const viewCertificateBtnText = dict.certificates.viewCertificate;

  return (
    <m.div
      variants={motionItem}
      className='bg-secondary/30 backdrop-blur-sm rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col h-full group overflow-hidden'
    >
      {/* Image Section */}
      <div className='relative h-48 w-full overflow-hidden bg-card/50'>
        {certificate.image ? (
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='flex items-center justify-center h-full text-primary/20'>
            <FaAward className='w-16 h-16' />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80' />
      </div>

      {/* Content Section */}
      <div className='p-6 flex flex-col flex-grow relative'>
        <div className='absolute -top-10 left-6'>
          <div className='p-3 bg-secondary rounded-xl text-primary shadow-lg border border-primary/10 group-hover:scale-110 transition-transform duration-300'>
            <FaAward className='w-6 h-6' />
          </div>
        </div>

        <div className='mt-2 mb-4'>
          <h3 className='text-lg font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors'>
            {certificate.title}
          </h3>
          <p className='text-muted-foreground text-sm font-medium'>
            {certificate.issuer}
          </p>
        </div>

        <div className='mt-auto pt-4'>
          {certificate.date && (
            <div className='mb-3'>
              <span className='px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/10'>
                {certificate.date}
              </span>
            </div>
          )}

          {certificate.url && (
            <Link
              href={certificate.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center text-sm font-medium text-primary hover:underline gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              {viewCertificateBtnText}
              <FaExternalLinkAlt className='w-3 h-3' />
            </Link>
          )}
        </div>
      </div>
    </m.div>
  );
};
