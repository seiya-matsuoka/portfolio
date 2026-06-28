export type TechnologyMeta = {
  label: string;
  iconSrc?: string;
};

const iconBasePath = 'icons/technologies/';

export const technologyMeta: Record<string, TechnologyMeta> = {
  Algorithm: {
    label: 'Algorithm',
  },
  Bash: {
    label: 'Bash',
    iconSrc: `${iconBasePath}bash-original.svg`,
  },
  Bootstrap: {
    label: 'Bootstrap',
    iconSrc: `${iconBasePath}bootstrap-original.svg`,
  },
  CSS: {
    label: 'CSS',
    iconSrc: `${iconBasePath}css3-original.svg`,
  },
  'Data Structure': {
    label: 'Data Structure',
  },
  Docker: {
    label: 'Docker',
    iconSrc: `${iconBasePath}docker-original.svg`,
  },
  EJS: {
    label: 'EJS',
  },
  ESLint: {
    label: 'ESLint',
    iconSrc: `${iconBasePath}eslint-original.svg`,
  },
  Express: {
    label: 'Express',
    iconSrc: `${iconBasePath}express-original.svg`,
  },
  Git: {
    label: 'Git',
    iconSrc: `${iconBasePath}git-original.svg`,
  },
  'Git Bash': {
    label: 'Git Bash',
    iconSrc: `${iconBasePath}bash-original.svg`,
  },
  GitHub: {
    label: 'GitHub',
    iconSrc: `${iconBasePath}github-original.svg`,
  },
  Gradle: {
    label: 'Gradle',
    iconSrc: `${iconBasePath}gradle-original.svg`,
  },
  HTML: {
    label: 'HTML',
    iconSrc: `${iconBasePath}html5-original.svg`,
  },
  Jackson: {
    label: 'Jackson',
  },
  Java: {
    label: 'Java',
    iconSrc: `${iconBasePath}java-original.svg`,
  },
  JavaScript: {
    label: 'JavaScript',
    iconSrc: `${iconBasePath}javascript-original.svg`,
  },
  jQuery: {
    label: 'jQuery',
    iconSrc: `${iconBasePath}jquery-original.svg`,
  },
  JUnit: {
    label: 'JUnit',
    iconSrc: `${iconBasePath}junit-original.svg`,
  },
  Linux: {
    label: 'Linux',
    iconSrc: `${iconBasePath}linux-original.svg`,
  },
  'Material UI（MUI）': {
    label: 'Material UI（MUI）',
    iconSrc: `${iconBasePath}materialui-original.svg`,
  },
  Maven: {
    label: 'Maven',
    iconSrc: `${iconBasePath}maven-original.svg`,
  },
  MongoDB: {
    label: 'MongoDB',
    iconSrc: `${iconBasePath}mongodb-original.svg`,
  },
  'Next.js': {
    label: 'Next.js',
    iconSrc: `${iconBasePath}nextjs-original.svg`,
  },
  'Node.js': {
    label: 'Node.js',
    iconSrc: `${iconBasePath}nodejs-original.svg`,
  },
  npm: {
    label: 'npm',
    iconSrc: `${iconBasePath}npm-original.svg`,
  },
  PostgreSQL: {
    label: 'PostgreSQL',
    iconSrc: `${iconBasePath}postgresql-original.svg`,
  },
  Prisma: {
    label: 'Prisma',
    iconSrc: `${iconBasePath}prisma-original.svg`,
  },
  Python: {
    label: 'Python',
    iconSrc: `${iconBasePath}python-original.svg`,
  },
  React: {
    label: 'React',
    iconSrc: `${iconBasePath}react-original.svg`,
  },
  'React Router': {
    label: 'React Router',
    iconSrc: `${iconBasePath}reactrouter-original.svg`,
  },
  'Shell Script': {
    label: 'Shell Script',
    iconSrc: `${iconBasePath}bash-original.svg`,
  },
  Spring: {
    label: 'Spring',
    iconSrc: `${iconBasePath}spring-original.svg`,
  },
  'Spring Boot': {
    label: 'Spring Boot',
    iconSrc: `${iconBasePath}spring-original.svg`,
  },
  SQL: {
    label: 'SQL',
    iconSrc: `${iconBasePath}postgresql-original.svg`,
  },
  'Tailwind CSS': {
    label: 'Tailwind CSS',
    iconSrc: `${iconBasePath}tailwindcss-original.svg`,
  },
  TypeScript: {
    label: 'TypeScript',
    iconSrc: `${iconBasePath}typescript-original.svg`,
  },
  Vim: {
    label: 'Vim',
    iconSrc: `${iconBasePath}vim-original.svg`,
  },
  Vite: {
    label: 'Vite',
    iconSrc: `${iconBasePath}vitejs-original.svg`,
  },
  Vitest: {
    label: 'Vitest',
    iconSrc: `${iconBasePath}vitest-original.svg`,
  },
};

export function getTechnologyMeta(name: string): TechnologyMeta {
  return technologyMeta[name] ?? { label: name };
}
