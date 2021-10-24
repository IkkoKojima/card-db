import Head from 'next/head'
import React, { useEffect, useState } from 'react';

export default function Home({ cards }) {
  const [cardlist, setCards] = useState(cards)

  const [typeFilter, setTypeFilter] = useState({
    unit: true,
    spell: true,
    object: true,
  })

  const [colorFilter, setColorFilter] = useState({
    red: true,
    green: true,
    blue: true,
  })

  const [query, setQuery] = useState("")
  const [creator, setCreator] = useState("")

  const [costFilter, setCostFilter] = useState({
    c1: true,
    c2: true,
    c3: true,
    c4: true,
    c5: true,
    c6: true,
    c7: true,
    c8: true,
    c9: true,
    c10p: true,
  })

  const [sort, setSort] = useState("cost")
  const [sortDirection, setSortDirection] = useState("asc")

  useEffect(() => {
    const colorFiltered = cards.filter(card => (colorFilter.red & card.color == "red") | (colorFilter.green & card.color == "green") | (colorFilter.blue & card.color == "blue"))
    const typeFiltered = colorFiltered.filter(card => (typeFilter.unit & card.type == "ユニット") | (typeFilter.spell & card.type == "スペル") | (typeFilter.object & card.type == "オブジェクト"))
    const costFiltered = typeFiltered.filter(card => (costFilter.c1 & card.cost == 1) | (costFilter.c2 & card.cost == 2) | (costFilter.c3 & card.cost == 3) | (costFilter.c4 & card.cost == 4) | (costFilter.c5 & card.cost == 5) | (costFilter.c6 & card.cost == 6) | (costFilter.c7 & card.cost == 7) | (costFilter.c8 & card.cost == 8) | (costFilter.c9 & card.cost == 9) | (costFilter.c10p & card.cost >= 10))
    const textFiltered = costFiltered.filter(card => card.ability.includes(query) | card.name.includes(query))
    const creatorFiltered = textFiltered.filter(card => card.creator.includes(creator) | card.illust.includes(creator))
    const sorted = creatorFiltered.sort((a, b) => {
      switch (sort) {
        case "cost":
          return sortDirection == "asc" ? a.cost - b.cost : b.cost - a.cost
        case "atk":
          return sortDirection == "asc" ? a.atk - b.atk : b.atk - a.atk
        case "def":
          return sortDirection == "asc" ? a.def - b.def : b.def - a.def
        default:
          return a.cost - b.cost
      }
    })
    setCards(sorted)
  }, [colorFilter, typeFilter, costFilter, query, creator, sort, sortDirection])

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Head>
        <title>みんなで創るカードゲーム| WILDxWILD - カードリスト</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wildxwild.vercel.app/" />
        <meta property="og:image" content="https://res.cloudinary.com/dpgh283yp/image/upload/v1634232241/wildxwild_ogp.png" />
        <meta property="og:title" content="みんなで創るカードゲーム| WILDxWILD - カードリスト" />
        <meta property="og:description" content="カードゲーム好きが集まったコミュニティで製作中のデジタルカードゲーム(DCG)です" />
      </Head>
      <div className="w-full flex items-center flex-col p-2 bg-gradient-to-b from-green-900 to-green-800">
        <img src={"/2.svg"} />
      </div>

      <div className="flex flex-col items-start px-7 mx-6 py-4 my-4 gap-8 border-4 border-double border-gray-400 rounded shadow">

        <details className="flex flex-col">
          <summary className="text-xl text-green-800 font-bold">並び替え</summary>

          <span className="text-xl text-gray-600">項目</span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <input type="radio" name="sort" value="cost" onClick={e => setSort(e.target.value)} className="h-6 w-6 text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0" />
              <span className="">コスト</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="sort" value="atk" onClick={e => setSort(e.target.value)} className="h-6 w-6 text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0" />
              <span className="">攻撃力</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="sort" value="def" onClick={e => setSort(e.target.value)} className="h-6 w-6 text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0" />
              <span className="">耐久力</span>
            </div>
          </div>

          <span className="text-xl text-gray-600 mt-6">順序</span>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <input type="radio" name="sortDirection" value="asc" onClick={e => setSortDirection(e.target.value)} className="h-6 w-6 text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0" />
              <span className="">昇順(↑)</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="sortDirection" value="dsc" onClick={e => setSortDirection(e.target.value)} className="h-6 w-6 text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0" />
              <span className="">降順(↓)</span>
            </div>
          </div>

        </details>

        <details className="flex flex-col">
          <summary className="text-xl text-green-800 font-bold">フィルタリング</summary>

          <span className="text-xl text-gray-600">テキスト検索</span>
          <div className="flex flex-wrap items-center gap-2">
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} className="rounded text-gray-600 border-gray-300 px-2 py-1 w-full" />
          </div>

          <span className="text-xl text-gray-600 mt-6">カラー</span>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="checkbox"
              className="h-6 w-6 rounded text-red-600 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={colorFilter.red}
              onChange={e => setColorFilter({ ...colorFilter, red: e.target.checked })}
            />
            <span className="text-gray-600">赤色</span>
            <input
              type="checkbox"
              className="h-6 w-6 rounded text-green-600 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={colorFilter.green}
              onChange={e => setColorFilter({ ...colorFilter, green: e.target.checked })}
            />
            <span className="text-gray-600">緑色</span>
            <input
              type="checkbox"
              className="h-6 w-6 rounded text-blue-600 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={colorFilter.blue}
              onChange={e => setColorFilter({ ...colorFilter, blue: e.target.checked })}
            />
            <span className="text-gray-600">青色</span>
          </div>

          <span className="text-xl text-gray-600 mt-6">タイプ</span>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="checkbox"
              className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={typeFilter.unit}
              onChange={e => setTypeFilter({ ...typeFilter, unit: e.target.checked })}
            />
            <span className="text-gray-600">ユニット</span>
            <input
              type="checkbox"
              className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={typeFilter.spell}
              onChange={e => setTypeFilter({ ...typeFilter, spell: e.target.checked })}
            />
            <span className="text-gray-600">スペル</span>
            <input
              type="checkbox"
              className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={typeFilter.object}
              onChange={e => setTypeFilter({ ...typeFilter, object: e.target.checked })}
            />
            <span className="text-gray-600">オブジェクト</span>
          </div>

          <span className="text-xl text-gray-600 mt-6">コスト</span>
          <div className="flex flex-wrap items-center gap-2">
            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c1}
              onChange={e => setCostFilter({ ...costFilter, c1: e.target.checked })}
            />
            <span className="text-gray-600">1</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c2}
              onChange={e => setCostFilter({ ...costFilter, c2: e.target.checked })}
            />
            <span className="text-gray-600">2</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c3}
              onChange={e => setCostFilter({ ...costFilter, c3: e.target.checked })}
            />
            <span className="text-gray-600">3</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c4}
              onChange={e => setCostFilter({ ...costFilter, c4: e.target.checked })}
            />
            <span className="text-gray-600">4</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c5}
              onChange={e => setCostFilter({ ...costFilter, c5: e.target.checked })}
            />
            <span className="text-gray-600">5</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c6}
              onChange={e => setCostFilter({ ...costFilter, c6: e.target.checked })}
            />
            <span className="text-gray-600">6</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c7}
              onChange={e => setCostFilter({ ...costFilter, c7: e.target.checked })}
            />
            <span className=" text-gray-600">7</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c8}
              onChange={e => setCostFilter({ ...costFilter, c8: e.target.checked })}
            />
            <span className=" text-gray-600">8</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c9}
              onChange={e => setCostFilter({ ...costFilter, c9: e.target.checked })}
            />
            <span className=" text-gray-600">9</span>

            <input type="checkbox" className="h-6 w-6 rounded text-gray-800 border-gray-300 focus:ring focus:ring-red-300 focus:ring-opacity-0"
              checked={costFilter.c10p}
              onChange={e => setCostFilter({ ...costFilter, c10p: e.target.checked })}
            />
            <span className=" text-gray-600">10+</span>
          </div>

          <span className="text-xl text-gray-600 mt-6">クリエイター検索</span>
          <div className="flex flex-wrap items-center gap-2">
            <input type="text" value={creator} onChange={e => setCreator(e.target.value)} className="rounded text-gray-600 border-gray-300 px-2 py-1 w-full" />
          </div>

        </details>
      </div>

      <div className="flex flex-wrap justify-center gap-4 px-6 pb-6">
        {cardlist.map(card => {
          const name = card.name
          const color = card.color
          const type = card.type
          const img = card.img
          const cost = card.cost
          const atk = card.atk
          const def = card.def
          const creator = card.creator
          const illust = card.illust
          const ability = card.ability.replace(/\r?\n/g, "%0A").replace(/\//g, "%252F").replace(/\+/g, "%2B")
          const src = `https://res.cloudinary.com/dpgh283yp/image/upload/w_1.15,y_-15,l_cards:frame_${color}/co_rgb:FFFFFF,g_north_west,x_85,y_70,l_text:Sawarabi%20Gothic_90_bold:${cost}${atk ? `/co_rgb:FFFFFF,g_north_west,x_90,y_970,l_text:Sawarabi%20Gothic_70_bold:${atk}` : ""}${def ? `/co_rgb:FFFFFF,g_north_west,x_645,y_970,l_text:Sawarabi%20Gothic_70_bold:${def}` : ""}/g_north,y_770,co_rgb:FFFFFF,l_text:Sawarabi%20Gothic_33_bold_center:${ability}/g_north,y_680,co_rgb:FFFFFF,l_text:Sawarabi%20Gothic_55_bold_center:${name}/cards/${img}.png`

          return (
            <div className="flex flex-col items-end" key={name}>
              <img className="w-72 h-96" src={src} />
              <span className="text-xs text-gray-400">{`created by ${creator}`}</span>
              <span className="text-xs text-gray-400">{`illust by ${illust}`}</span>
            </div>
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
    revalidate: 300, // In seconds
  }
}