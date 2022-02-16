import download from "downloadjs"
import { toPng } from "html-to-image"
import Image from "next/image"
import { useRef, useState } from "react"
import BingoNumbers from "../components/BingoNumbers"
import bingo from "../public/bingo.png"

const Bingo = () => {
  const NUMBERS = Array.from({length: 75}, (_, i) => i + 1)
  const cards = new Set()
  const pages = []
  for (let l = 0; l < 60; l++) {
    const page = []
    for (let m = 0; m < 4; m++) {
      const card = NUMBERS.slice(0)
      for (let i = card.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [card[i], card[j]] = [card[j], card[i]];
      }
      const candidate = card.slice(0,25)
      const str = JSON.stringify(candidate)
      if (cards.has(str)) m--
      else {
        page.push(candidate)
        cards.add(str)
      }
    }
    pages.push(page)
  }
  const INITIALS = {
    top: '145px',
    left: '70px',
    font: '4vw',
    colGap: '3.35vw',
    rowGap: '3.3vw',
    bingoColGap: '11.1vw',
    bingoRowGap: '31.5vw',
  }
  const [top, setTop] = useState(INITIALS.top)
  const [left, setLeft] = useState(INITIALS.left)
  const topInput = useRef(null)
  const leftInput = useRef(null)
  const submitTopLeft = () => {
    setTop(topInput.current.value)
    setLeft(leftInput.current.value)
  }
  const [font, setFont] = useState(INITIALS.font)
  const [colGap, setColGap] = useState(INITIALS.colGap)
  const [rowGap, setRowGap] = useState(INITIALS.rowGap)
  const colGapInput = useRef(null)
  const rowGapInput = useRef(null)
  const fontInput = useRef(null)
  const submitGapFont = () => {
    setRowGap(rowGapInput.current.value)
    setColGap(colGapInput.current.value)
    setFont(fontInput.current.value)
  }
  const [bingoColGap, setBingoColGap] = useState(INITIALS.bingoColGap)
  const [bingoRowGap, setBingoRowGap] = useState(INITIALS.bingoRowGap)
  const bingoColGapInput = useRef(null)
  const bingoRowGapInput = useRef(null)
  const submitBingoGap = () => {
    setBingoColGap(bingoColGapInput.current.value)
    setBingoRowGap(bingoRowGapInput.current.value)
  }
  const [numCards, setNumCards] = useState(1)
  const numCardsInput = useRef(null)
  const bingos = useRef(null)
  const exportPng = () => {
    toPng(bingos.current)
      .then(dataUrl => {
        download(dataUrl, 'bingos.png')
      })
  }
  return (
    <div>
      <div>Top, Left</div>
      <input ref={topInput} defaultValue={INITIALS.top} />
      <input ref={leftInput} defaultValue={INITIALS.left} />
      <button onClick={submitTopLeft}>Submit Top and Left</button>
      <div>Number Col Gap, Number Row Gap, Font Size</div>
      <input ref={colGapInput} defaultValue={INITIALS.colGap} />
      <input ref={rowGapInput} defaultValue={INITIALS.rowGap} />
      <input ref={fontInput} defaultValue={INITIALS.font} />
      <button onClick={submitGapFont}>Submit Gap and Font</button>
      <div>Card Col Gap, Col Row Gap</div>
      <input ref={bingoColGapInput} defaultValue={INITIALS.bingoColGap} />
      <input ref={bingoRowGapInput} defaultValue={INITIALS.bingoRowGap} />
      <button onClick={submitBingoGap}>Submit Bingo Gap</button>
      <div>Number of Cards</div>
      <input ref={numCardsInput} defaultValue={1} />
      <button onClick={() => setNumCards(parseInt(numCardsInput.current.value))}>Generate X Cards</button>
      <button onClick={exportPng}>Export as PNG</button>
      <div ref={bingos}>
      {[...Array(Math.min(numCards, 60)).keys()].map(i => 
      <div style={{position: "relative"}} key={i}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', position: 'absolute', top, left, zIndex: 10, rowGap: bingoRowGap, columnGap: bingoColGap }}>
          <BingoNumbers font={font} rowGap={rowGap} colGap={colGap} nums={pages[i][0]}/>
          <BingoNumbers font={font} rowGap={rowGap} colGap={colGap} nums={pages[i][1]}/>
          <BingoNumbers font={font} rowGap={rowGap} colGap={colGap} nums={pages[i][2]}/>
          <BingoNumbers font={font} rowGap={rowGap} colGap={colGap} nums={pages[i][3]}/>
        </div>
        <Image src={bingo} alt="bingo" />
      </div>)}
      </div>
      
    </div>
  )
}

export default Bingo
