import type { MetaFunction } from '@remix-run/node';
import {
  HTMLMotionProps,
  SVGMotionProps,
  Variants,
  motion,
  stagger,
} from 'framer-motion';
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
  const staggerItems = stagger(1);
  return (
    <div className='flex flex-col min-h-screen'>
      <motion.header
        className='flex items-center h-16 px-4 border-b shrink-0 md:px-6 dark:bg-gray-800/40'
        initial='initial'
        animate='animate'
        variants={pageLoadVariants(0.5, 0, 0)}
      >
        <motion.a
          className='flex items-center justify-center'
          href='#'
          variants={pageLoadItemVariants(0.3)}
        >
          <SignatureIcon className='h-20 w-auto mr-2' />
          <span className='sr-only'>Silvan Kohler</span>
        </motion.a>
        <motion.nav
          className='ml-auto flex gap-4 sm:gap-6'
          variants={pageLoadItemVariants(0.3)}
        >
          <Link href='#projects'>Projects</Link>
        </motion.nav>
      </motion.header>
      <motion.main
        className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40'
        initial='initial'
        animate='animate'
        variants={pageLoadVariants(1, 0.5, 1)}
      >
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='px-4 md:px-6 space-y-10 xl:space-y-16'>
            <motion.div
              className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'
              variants={pageLoadItemVariants(0.5)}
            >
              <motion.img
                alt='Silvan Kohler'
                className='rounded-full mx-auto'
                width={300}
                src='/me.jpeg'
              />
              <motion.div
                className='flex flex-col items-start space-y-4'
                initial='initial'
                animate='animate'
                variants={pageLoadVariants(0.5, 0.5, 0.3)}
              >
                <motion.p
                  className='max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'
                  variants={pageLoadItemVariants(0.1)}
                >
                  I'm Silvan Kohler, a developer and IT enthusiast based in
                  Switzerland. I'm passionate about technology and love to build
                  things. Currently building shiper.
                </motion.p>
                <br />
                <motion.p
                  className='max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'
                  variants={pageLoadItemVariants(0.1)}
                >
                  Feel free to send me a message and check out my
                </motion.p>
                <motion.div
                  className='flex gap-4'
                  variants={pageLoadItemVariants(0.1)}
                >
                  <Link
                    className='flex items-center gap-2'
                    href='https://github.com/orthizar'
                  >
                    <GithubIcon className='w-5 h-5' />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    className='flex items-center gap-2'
                    href='https://twitter.com/orthizar'
                  >
                    <TwitterIcon className='w-5 h-5' />
                    <span>Twitter</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <ProjectSection variants={pageLoadItemVariants(0.5)} />
      </motion.main>
      <motion.footer
        className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t dark:bg-gray-800/40'
        initial='initial'
        animate='animate'
        variants={pageLoadVariants(0.5, 0, 0)}
      >
        <motion.p
          className='text-xs dark:text-gray-400'
          variants={pageLoadItemVariants(0.3)}
        >
          © 2024 Silvan Kohler. All rights reserved.
        </motion.p>
        <motion.nav
          className='sm:ml-auto flex gap-4 sm:gap-6'
          variants={pageLoadItemVariants(0.3)}
        >
          <Link href='https://github.com/orthizar' className='text-xs'>
            GitHub
          </Link>
          <Link href='https://twitter.com/orthizar' className='text-xs'>
            Twitter
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
            website='https://health.silvankohler.com'
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
          <Link href={github}>
            <GithubIcon className='w-5 my-auto' />
          </Link>
        )}
        {website && (
          <Link href={website}>
            <WebsiteIcon className='w-5 my-auto' />
          </Link>
        )}
      </div>
      <div className='card-content'>
        <p className='text-gray-500 dark:text-gray-400'>{description}</p>
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
      className='text-sm font-medium'
      target='_blank'
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

const pageLoadItemVariants = (duration: number) => {
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

function GithubIcon(props) {
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

function TwitterIcon(props) {
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

function WebsiteIcon(props) {
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
