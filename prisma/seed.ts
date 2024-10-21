// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed Tags
  const tags = [
    'Front-End Development',
    'Back-End Development',
    'Full-Stack Development',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Web Development',
    'Software Engineering',
    'DevOps',
    'Blockchain and Web3',
    'NFTs',
    'DeFi',
    'Performance Optimization',
    'Software Architecture',
    'Design Patterns',
    'Testing and QA',
    'Project Case Studies',
    'Hackathons',
    'Career Development',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'GraphQL',
    'Prisma',
    'PostgreSQL',
    'MongoDB',
    'Firebase',
    'Docker',
    'GitHub Actions',
    'CI/CD',
    'AMQP',
    'Web3',
    'Blockchain',
    'NFT',
    'DeFi',
    'Performance Tuning',
    'Software Architecture',
    'Design Patterns',
    'Functional Programming',
    'Agile Methodologies',
    'Team Leadership',
    'Hackathon Experiences',
    'Project Management',
    'Testing with Jest',
    'DevOps Practices',
  ];

  for (const name of tags) {
    await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Essential data has been seeded.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
