import Head from 'next/head'

export default function Home({ cards }) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex items-center flex-col p-2 bg-gradient-to-b from-green-900 to-green-800">
        <img src={"/2.svg"} />
      </div>
      <span className="p-4 md:text-4xl text-2xl font-bold text-green-900">カードリスト</span>
      <div className="flex flex-wrap justify-center gap-4 p-6">
        {cards.map(card => {
          const name = card.name
          const color = card.color
          const type = card.type
          const img = card.img
          const cost = card.cost
          const atk = card.atk
          const def = card.def
          const ability = card.ability.replace(/\r?\n/g, "%0A").replace(/\//g, "%25F").replace(/\+/g, "%2B")
          const src = `https://res.cloudinary.com/dpgh283yp/image/upload/w_1.15,y_-15,l_cards:frame_${color}/co_rgb:FFFFFF,g_north_west,x_85,y_70,l_text:Sawarabi%20Gothic_90_bold:${cost}${atk ? `/co_rgb:FFFFFF,g_north_west,x_90,y_970,l_text:Sawarabi%20Gothic_70_bold:${atk}` : ""}${def ? `/co_rgb:FFFFFF,g_north_west,x_645,y_970,l_text:Sawarabi%20Gothic_70_bold:${def}` : ""}/g_north,y_770,co_rgb:FFFFFF,l_text:Sawarabi%20Gothic_33_bold_center:${ability}/g_north,y_680,co_rgb:FFFFFF,l_text:Sawarabi%20Gothic_55_bold_center:${name}/cards/${img}.png`

          return (
            <img className="w-72 h-96" src={src} key={name} />
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.sssapi.app/8G_WAgsc9gbAysHAjpTEw')
  const cards = await res.json()

  return {
    props: {
      cards,
    },
    revalidate: 3600, // In seconds
  }
}