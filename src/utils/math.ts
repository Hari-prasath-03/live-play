const calcQuardinates = (n: number) => ({
  row: Math.floor(n / 3),
  col: n % 3,
});
const revCalcQuardinates = ({ row, col }: { row: number; col: number }) =>
  row * 3 + col;

export { calcQuardinates, revCalcQuardinates };
