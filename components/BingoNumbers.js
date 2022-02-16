const BingoNumbers = ({ top, left, rowGap, colGap, font, nums }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', rowGap: `${rowGap}`, columnGap: `${colGap}`, justifyItems: 'center', alignItems: 'center' }}>
      {nums.map((i, index) => (
        <div key={i} style={{ fontSize:`${font}`, width: "5vw", height: "5vw", textAlign:"center" }}>{index === 12 ? 'X' : i}</div>
      ))}
    </div>
  )
}

export default BingoNumbers
