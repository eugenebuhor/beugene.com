export const revalidate = 300; // 5 minutes

async function Home() {
  const data = await fetch(`${process.env.API_URL}/articles`);
  const articles = await data.json();

  return null;
}

export default Home;
