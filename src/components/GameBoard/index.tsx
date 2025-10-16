import Cube from "../Cube";


interface GameBoardProps {
  board: number[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="inline-block">
      <div 
        className="
          grid grid-cols-4 gap-3 
          w-[300px] h-[300px]
        "
        style={{
          gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))'
        }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className="w-full h-full">
              <Cube value={cell} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;