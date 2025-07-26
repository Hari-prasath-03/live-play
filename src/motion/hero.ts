interface BgShape {
  id: number;
  label: "X" | "O";
  color: string;
  rotate: string;
  scale: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const bgShapes: BgShape[] = [
  {
    id: 1,
    label: "X",
    top: "10%",
    left: "5%",
    rotate: "12deg",
    scale: 1.4,
    color: "#f87171",
  },
  {
    id: 2,
    label: "O",
    top: "20%",
    right: "14%",
    rotate: "-8deg",
    scale: 1.2,
    color: "#60a5fa",
  },
  {
    id: 3,
    label: "X",
    bottom: "12%",
    left: "15%",
    rotate: "20deg",
    scale: 1.6,
    color: "#facc15",
  },
  {
    id: 4,
    label: "O",
    bottom: "18%",
    right: "10%",
    rotate: "-18deg",
    scale: 1.3,
    color: "#34d399",
  },
  {
    id: 5,
    label: "X",
    top: "0%",
    left: "12%",
    rotate: "15deg",
    scale: 1.4,
    color: "#f87171",
  },
  {
    id: 6,
    label: "O",
    top: "0%",
    right: "5%",
    rotate: "-10deg",
    scale: 1.3,
    color: "#60a5fa",
  },
  {
    id: 7,
    label: "X",
    top: "5%",
    left: "35%",
    rotate: "25deg",
    scale: 1.2,
    color: "#facc15",
  },
  {
    id: 8,
    label: "O",
    top: "12%",
    right: "30%",
    rotate: "-20deg",
    scale: 1.5,
    color: "#34d399",
  },
];

export { bgShapes };
