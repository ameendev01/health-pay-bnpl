type SparklineProps = {
  points: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  paddingY?: number;
  paddingX?: number;
};

export const Sparkline = ({
  points,
  width = 72,
  height = 24,
  strokeWidth = 2,
  paddingY = 4,   // top & bottom inner padding
  paddingX = 0,   // left & right inner padding
}: SparklineProps) => {
  const min = Math.min(...points);
  const max = Math.max(...points);

  const innerW = Math.max(1, width - paddingX * 2);
  const innerH = Math.max(1, height - paddingY * 2);

  const scaleY = (v: number) =>
    max === min
      ? paddingY + innerH / 2
      : paddingY + (innerH - ((v - min) / (max - min)) * innerH);

  const step = innerW / Math.max(points.length - 1, 1);

  const d = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${paddingX + i * step} ${scaleY(v)}`)
    .join(' ');

  const up = points[points.length - 1] >= points[0];
  const stroke = up ? '#16a34a' : '#dc2626';

  return (
    <svg width={width} height={height} aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
