
export default function Coin({ coin }) {
  console.log(coin)
  return (
    <main>
      <div className='page-center'>
        <h1>{coin.name}</h1>
      </div>
    </main>
  )
}

export async function getServerSideProps({ params }) {
  const req = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`);
  const data = await req.json();

  return {
      props: { coin: data },
  }
}