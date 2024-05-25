import type { MetaFunction } from '@remix-run/node';
import {
  HTMLMotionProps,
  SVGMotionProps,
  Variants,
  motion,
} from 'framer-motion';
import { SVGProps, useEffect, useRef, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import Blur from 'app/blur.client';
import { isMobile } from 'react-device-detect';

export const meta: MetaFunction = () => {
  return [
    { title: 'Silvan Kohler' },
    {
      name: 'description',
      content:
        'Silvan Kohler is a developer and IT enthusiast from Switzerland.',
    },
  ];
};

export default function Index() {
  const blurRef = useRef<HTMLImageElement>(null);
  const [blurPosition, setBlurPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateBlurPosition = () => {
      setBlurPosition({
        x: (blurRef.current?.x ?? 0) / 2 + (blurRef.current?.width ?? 0) / 2,
        y: (blurRef.current?.y ?? 0) / 2 + (blurRef.current?.height ?? 0) / 2,
      });
    };
    window.addEventListener('scroll', updateBlurPosition);
    window.addEventListener('resize', updateBlurPosition);
    updateBlurPosition();
    return () => {
      // window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', updateBlurPosition);
      window.removeEventListener('resize', updateBlurPosition);
    };
  }, []);

  return (
    <div className='flex flex-col min-h-screen dark:bg-[#171b22]'>
      <motion.header
        className='flex items-center h-16 px-4 border-b shrink-0 md:px-6'
        initial='initial'
        animate='animate'
        variants={pageLoadVariants(0.5, 0, 0)}
      >
        <motion.a
          className='flex items-center justify-center'
          href='#'
          aria-label='home link'
          variants={pageLoadItemVariants()}
        >
          <SignatureIcon className='h-20 w-auto mr-2' />
          <span className='sr-only'>Silvan Kohler</span>
        </motion.a>
        <motion.nav
          className='ml-auto flex gap-4 sm:gap-6'
          variants={pageLoadItemVariants()}
        >
          <Link
            className='plausible-event-name=Navigation+Link:+Click'
            href='#projects'
            aria-label='projects navigation link'
          >
            Projects
          </Link>
        </motion.nav>
      </motion.header>
      <motion.main
        className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 pb-10 md:gap-8 md:p-10'
        initial='initial'
        animate='animate'
        variants={pageLoadVariants(1, 0.5, 1)}
      >
        <section className='w-full z-10'>
          <div className='px-4 md:px-6 space-y-10 xl:space-y-16'>
            <motion.div
              className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'
              variants={pageLoadItemVariants()}
            >
              {!isMobile && (
                <ClientOnly>
                  {() => (
                    <Blur
                      className='absolute blur-sm'
                      blurPosition={blurPosition}
                    />
                  )}
                </ClientOnly>
              )}
              <div className='relative py-12 md:py-24 lg:py-32 mx-auto'>
                <picture>
                  <source srcSet='/me.avif' type='image/avif' />
                  <source srcSet='/me.webp' type='image/webp' />
                  <motion.img
                    ref={blurRef}
                    className='rounded-[100px] absolute filter blur-lg'
                    alt='Silvan Kohler'
                    width={300}
                    height={300}
                    src='/me.jpeg'
                  />
                </picture>
                <picture>
                  <source srcSet='/me.avif' type='image/avif' />
                  <source srcSet='/me.webp' type='image/webp' />
                  <img
                    ref={blurRef}
                    className='rounded-full scale-[1] shadow-cyan-400'
                    alt='Silvan Kohler'
                    width={300}
                    height={300}
                    src='/me.jpeg'
                  />
                </picture>
              </div>
              <motion.div
                className='flex flex-col items-start space-y-4 py-12 md:py-24 lg:py-32'
                initial='initial'
                animate='animate'
                variants={pageLoadVariants(0.5, 0.5, 0.3)}
              >
                <motion.p
                  className='max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'
                  variants={pageLoadItemVariants()}
                >
                  I&apos;m Silvan Kohler, a developer, systems engineer and IT
                  enthusiast based in Switzerland. I&apos;m passionate about
                  technology and love to build things. Currently building
                  shiper.
                </motion.p>
                <br />
                <motion.p
                  className='max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'
                  variants={pageLoadItemVariants()}
                >
                  Feel free to send me a message and check out my
                </motion.p>
                <motion.div
                  className='flex gap-4 flex-wrap'
                  variants={pageLoadItemVariants()}
                >
                  <Link
                    className='flex items-center gap-2'
                    href='https://github.com/orthizar'
                    aria-label='github link'
                  >
                    <GithubIcon className='w-5 h-5' />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    className='flex items-center gap-2'
                    href='https://twitter.com/orthizar'
                    aria-label='twitter link'
                  >
                    <TwitterIcon className='w-5 h-5' />
                    <span>Twitter</span>
                  </Link>
                  <Link
                    className='flex items-center gap-2'
                    href='https://www.linkedin.com/in/silvankohler'
                    aria-label='linkedin link'
                  >
                    <LinkedinIcon className='w-5 h-5' />
                    <span>LinkedIn</span>
                  </Link>
                  <Link
                    className='flex items-center gap-2'
                    href='https://crepuscolo.silvankohler.swiss'
                    aria-label='personal knowledge management link'
                  >
                    <PKMIcon className='w-5 h-5' />
                    <span>PKM</span>
                  </Link>
                  <Link
                    className='flex items-center gap-2'
                    href='https://health.silvankohler.swiss'
                    aria-label='health link'
                  >
                    <HealthIcon className='w-5 h-5' />
                    <span>Health</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <ProjectSection className='z-10' variants={pageLoadItemVariants()} />
      </motion.main>
      <motion.footer
        className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:bg-[#171b22]'
        initial='initial'
        animate='animate'
        variants={pageLoadVariants(0.5, 0, 0)}
      >
        <motion.p
          className='text-xs dark:text-gray-400'
          variants={pageLoadItemVariants()}
        >
          © 2024 Silvan Kohler. All rights reserved.
        </motion.p>
        <motion.nav
          className='sm:ml-auto flex gap-4 sm:gap-6'
          variants={pageLoadItemVariants()}
        >
          <Link
            href='https://github.com/orthizar'
            aria-label='github link'
            className='text-xs'
          >
            GitHub
          </Link>
          <Link
            href='https://twitter.com/orthizar'
            aria-label='twitter link'
            className='text-xs'
          >
            Twitter
          </Link>
          <Link
            href='https://www.linkedin.com/in/silvankohler'
            aria-label='linkedin link'
            className='text-xs'
          >
            LinkedIn
          </Link>
          <Link
            href='https://crepuscolo.silvankohler.swiss'
            aria-label='personal knowledge management link'
            className='text-xs'
          >
            PKM
          </Link>
          <Link
            href='https://health.silvankohler.swiss'
            aria-label='health link'
            className='text-xs'
          >
            Health
          </Link>
        </motion.nav>
      </motion.footer>
    </div>
  );
}

function ProjectSection(props: HTMLMotionProps<'section'>) {
  return (
    <motion.section
      className='w-full py-12 md:py-24 lg:py-32 border-t'
      id='projects'
      {...props}
    >
      <div className='px-4 md:px-6 space-y-10 xl:space-y-16'>
        <h2 className='text-2xl font-bold text-center dark:text-white'>
          Projects
        </h2>
        <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-3 md:gap-16'>
          <ProjectCard
            title='Shiper'
            description='Zero config deployment platform that is easy to use, designed for developers that like to focus on innovation.'
            icon='/shiper.svg'
            website='https://shiper.app'
          />
          <ProjectCard
            title='Health'
            description='Monitoring my essential health indicators, including glucose levels, heart rate, SpO2 and respiration rate.'
            github='https://github.com/orthizar/health'
            website='https://health.silvankohler.swiss'
          />
          <ProjectCard
            title='Evolution'
            description='Neuronal network evolution simulation using DNA. The simulation provides a way to observe and study the effects of genetic variation, neural network architecture, and selective pressures on the behavior and adaptation of the entities.'
            github='https://github.com/orthizar/evolution'
          />
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({
  title,
  description,
  icon,
  github,
  website,
}: {
  title: string;
  description: string;
  icon?: string;
  github?: string;
  website?: string;
}) {
  return (
    <div className='card'>
      <div className='card-header flex gap-3'>
        {icon && <img src={icon} alt={title} className='w-5 h-5 my-auto' />}
        <h3 className='text-xl font-bold dark:text-white'>{title}</h3>
        {github && (
          <Link href={github} aria-label={`github link to project ${title}`}>
            <GithubIcon className='w-5 my-auto' />
          </Link>
        )}
        {website && (
          <Link href={website} aria-label={`website link to project ${title}`}>
            <WebsiteIcon className='w-5 my-auto' />
          </Link>
        )}
      </div>
      <div className='card-content'>
        <p className='text-medium max-w-prose text-gray-500 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </div>
  );
}

function Link({
  children,
  ...props
}: { children: React.ReactNode } & HTMLMotionProps<'a'>) {
  return (
    <motion.a
      className={cn('text-sm font-medium', props.className)}
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      initial={{
        borderBottom: '1px solid transparent',
        borderImage:
          'linear-gradient(to right, transparent 50%, #fff 50%, #fff 50%, transparent 50%) 100% 1',
      }}
      whileHover={{
        borderBottom: '1px solid currentColor',
        borderImage:
          'linear-gradient(to right, transparent 0%, #fff 1%, #fff 99%, transparent 100%) 100% 1',
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

const pageLoadVariants = (
  duration: number,
  delayChildren: number,
  staggerChildren: number,
) => {
  return {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: duration,
        delayChildren: delayChildren,
        staggerChildren: staggerChildren,
      },
    },
  } as Variants;
};

const pageLoadItemVariants = () => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  } as Variants;
};

const signatureVariants: Variants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      staggerChildren: 0.3,
    },
  },
};

const signaturePathVariants: Variants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      duration: 0.5,
    },
  },
};

function SignatureIcon(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 841.89 595.28'
      fill='none'
      stroke='currentColor'
      strokeWidth='5'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
      initial='initial'
      animate='animate'
      variants={signatureVariants}
    >
      <motion.path
        d='M295.27,243.98c0,0,3.69-40.82-50.17-33.73s-78.71,38.65-74.55,45.92c4.89,8.55,49.13-0.09,78.8,4.98
	c23.41,4.01,33.45,20.25,26.36,41.79c-7.09,21.54-38.67,90.14-43.43,89.86s5.16-40.25-42.74-66.61S39.3,313.43,47.52,326.75
	s75.55-10.48,340.72-47.06c263.06-36.28,335.62-34.58,335.62-36.85'
        variants={signaturePathVariants}
      />
      <motion.path
        d='M466.48,212.23c0,0,21.83-38.83,0-35.43s-61.8,39.69-98.36,79.37s-66.9,91.56-66.9,91.56
	s42.52-152.5,41.39-152.5s-35.15,54.99-45.07,61.23c-9.92,6.24,28.52-13.41,72.85,12.47c42.24,24.66,25.51,66.61,17.57,69.45'
        variants={signaturePathVariants}
      />
      <motion.path
        d='M439.65,237.17c0,0-9.07,3.97-11.91,13.8c-2.83,9.83,5.86,10.02,17.48,0.66c11.62-9.35,2.98-16.58-4.54-16.72
	c-7.51-0.14,24.66-7.04,49.89-25.49c25.23-18.45,22.96-28.65,18.43-25.25c-4.54,3.4-51.74,75.97-39.48,69.73
	c12.26-6.24,43.59-27.5,43.3-20.83c-0.28,6.66-6.85,19.42,10.54,12.8c17.39-6.61,47.15-26.27,59.62-48.66s-3.87-4.63-8.03,2.74
	c-2.89,5.13-27.21,41.76-4.91,38.36c22.3-3.4,39.31-20.41,39.31-20.41s-11.34,18.14,4.72,13.42s35.91-17.95,35.91-17.95
	s-7.56,17.01,26.27,13.23s92.98-12.85,113.01-7.37s-0.76,14.74-1.32,14.93'
        variants={signaturePathVariants}
      />
    </motion.svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M23 3.5a9.5 9.5 0 0 1-2.6 2.9 4.75 4.75 0 0 0-8.3 3.4A13.5 13.5 0 0 1 2 3.5a4.75 4.75 0 0 0 1.5 7.1 4.75 4.75 0 0 1-2.15-.6v.1a4.75 4.75 0 0 0 3.8 4.65 4.75 4.75 0 0 1-2.15.1 4.75 4.75 0 0 0 4.45 3.3A9.5 9.5 0 0 1 2 20.5a13.5 13.5 0 0 0 7.3 2.15c8.8 0 13.6-7.3 13.6-13.6v-.65A9.5 9.5 0 0 0 23 3.5z' />
    </svg>
  );
}

function WebsiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <line x1='2' y1='12' x2='22' y2='12' />
      <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
    </svg>
  );
}

function HealthIcon(props: SVGProps<SVGSVGElement>) {
  // Health icon is a heart icon
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M1 9.5H7.43412C7.47409 9.5 7.51023 9.4762 7.526 9.43947L8.91178 6.21386C8.94645 6.13316 9.06087 6.13316 9.09554 6.21386L11.9257 12.8015C11.9593 12.8797 12.0692 12.8828 12.1071 12.8065L13.7496 9.5L14.5054 7.93629C14.5418 7.86097 14.649 7.86097 14.6854 7.93629L15.4139 9.44352C15.4306 9.47805 15.4656 9.5 15.5039 9.5H23M1 17H23M5 20V20.0318M9 20V20.0318M2 23H22C22.5523 23 23 22.5523 23 22V2C23 1.44772 22.5523 1 22 1H2C1.44772 1 1 1.44772 1 2V22C1 22.5523 1.44772 23 2 23Z' />
    </svg>
  );
}

function PKMIcon(props: SVGProps<SVGSVGElement>) {
  // PKM icon is a book icon
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 20L7 20M3 15H7M3 10H7M3 5H7M21 21.5L21 2.5C21 1.67157 20.3284 1 19.5 1L6.49998 1C5.67155 1 4.99998 1.67157 4.99998 2.5L4.99998 21.5C4.99998 22.3284 5.67155 23 6.49998 23L19.5 23C20.3284 23 21 22.3284 21 21.5ZM11 9H16C16.5523 9 17 8.55229 17 8V6C17 5.44772 16.5523 5 16 5H11C10.4477 5 10 5.44772 10 6V8C10 8.55229 10.4477 9 11 9Z' />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      transform='scale(1.2)'
    >
      <path d='M 5 3 C 3.895 3 3 3.895 3 5 L 3 19 C 3 20.105 3.895 21 5 21 L 19 21 C 20.105 21 21 20.105 21 19 L 21 5 C 21 3.895 20.105 3 19 3 L 5 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z M 7.7792969 6.3164062 C 6.9222969 6.3164062 6.4082031 6.8315781 6.4082031 7.5175781 C 6.4082031 8.2035781 6.9223594 8.7167969 7.6933594 8.7167969 C 8.5503594 8.7167969 9.0644531 8.2035781 9.0644531 7.5175781 C 9.0644531 6.8315781 8.5502969 6.3164062 7.7792969 6.3164062 z M 6.4765625 10 L 6.4765625 17 L 9 17 L 9 10 L 6.4765625 10 z M 11.082031 10 L 11.082031 17 L 13.605469 17 L 13.605469 13.173828 C 13.605469 12.034828 14.418109 11.871094 14.662109 11.871094 C 14.906109 11.871094 15.558594 12.115828 15.558594 13.173828 L 15.558594 17 L 18 17 L 18 13.173828 C 18 10.976828 17.023734 10 15.802734 10 C 14.581734 10 13.930469 10.406562 13.605469 10.976562 L 13.605469 10 L 11.082031 10 z'></path>
    </svg>
  );
}
