'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import { TOKENS } from '../RepaymentStatusGauge';

export type StatusItem = { label: string; value: number };

type Props = { status: StatusItem[] };

const clsNum = '[font-variant-numeric:tabular-nums_lining-nums]';

// align Claim Status palette to your brand system
const COLORS = {
  completed: TOKENS.success,       // Submitted
  inProgress: TOKENS.neutral500,   // In Review
  pendingStroke: TOKENS.warning,   // Pending (striped accent)
  track: TOKENS.success,           // rendered with low opacity (see below)
  textMuted: '#6B7280',
  text: '#0F172A',
};


export default function ClaimsStatusCard({ status }: Props) {
  // Map incoming labels to fixed visual roles
  const submitted = status.find(s => /submitted/i.test(s.label));
  const inReview  = status.find(s => /review/i.test(s.label));
  const pending   = status.find(s => /pending/i.test(s.label));

  const data = [
    { key: 'completed',  label: submitted?.label ?? 'Submitted',  value: submitted?.value ?? 0 },
    { key: 'inProgress', label: inReview?.label ?? 'In Review',   value: inReview?.value ?? 0 },
    { key: 'pending',    label: pending?.label ?? 'Pending Info', value: pending?.value ?? 0 },
  ];

  const total = data.reduce((s, d) => s + d.value, 0);
  const pctCompleted = total ? (data[0].value / total) * 100 : 0;
  const pctPending   = total ? (data[2].value / total) * 100 : 0;

  // Arc geometry
  const START = 200;
  const END   = -20;
  const OUTER = 112;
  const INNER = 74;
  const PADDING = 3;
  const CORNER  = 12;

  const track = [{ key: 'track', value: 100 }];

  return (
    <Card className="relative h-full w-full overflow-hidden rounded-xl border border-neutral-200 bg-white p-4">
      {/* Title + short description */}
      <div className="mb-[-15px] text-lg font-semibold text-neutral-800">Claims Status</div>
      <p className="mb-3 text-sm leading-5 text-neutral-500">
        Breakdown of claim workflow for the selected period. Numbers update with your filters.
      </p>

      {/* Chart */}
      <div className="relative">
        <div className="relative mx-auto w-full" style={{ height: 230 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {/* diagonal hatch for the pending slice */}
                <pattern id="diagHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect x="0" y="0" width="6" height="6" fill="white" />
                  <rect x="0" y="0" width="2" height="6" fill={COLORS.pendingStroke} />
                </pattern>
              </defs>

              {/* faint track */}
              <Pie
                data={track}
                dataKey="value"
                startAngle={START}
                endAngle={END}
                innerRadius={INNER}
                outerRadius={OUTER}
                isAnimationActive={false}
              >
                <Cell fill={COLORS.track} fillOpacity={0.15} />
              </Pie>

              {/* data wedges */}
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                startAngle={START}
                endAngle={END}
                innerRadius={INNER}
                outerRadius={OUTER}
                paddingAngle={PADDING}
                cornerRadius={CORNER}
                strokeWidth={1}
                stroke="#FFFFFF"
                isAnimationActive={false}
              >
                {data.map((d) => {
                  const fill =
                    d.key === 'completed'  ? COLORS.completed :
                    d.key === 'inProgress' ? COLORS.inProgress :
                    'url(#diagHatch)';
                  const stroke = d.key === 'pending' ? COLORS.pendingStroke : '#FFFFFF';
                  return <Cell key={d.key} fill={fill} stroke={stroke} />;
                })}

                {/* center label */}
                <Label
                  position="center"
                  content={({ viewBox }) => {
                    if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;
                    const { cx, cy } = viewBox as { cx: number; cy: number };
                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 4}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={clsNum}
                          style={{ fontSize: 38, fontWeight: 700, fill: COLORS.text }}
                        >
                          {Math.round(pctCompleted)}%
                        </text>
                        <text
                          x={cx}
                          y={cy + 24}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{ fontSize: 12, fill: COLORS.textMuted }}
                        >
                          {data[0].label}
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {data.map((d) => (
            <div key={d.key} className="flex items-center justify-start gap-2">
              {/* use CSS stripes for the legend dot (works outside SVG) */}
              <span
                aria-hidden
                className="inline-block h-3.5 w-3.5 rounded-full border"
                style={{
                  background:
                    d.key === 'completed'
                      ? COLORS.completed
                      : d.key === 'inProgress'
                      ? COLORS.inProgress
                      : 'repeating-linear-gradient(45deg, white 0 3px, #4A90E2 3px 6px)',
                  borderColor: d.key === 'pending' ? COLORS.pendingStroke : 'transparent',
                }}
              />
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] text-neutral-700">{d.label}</span>
                <span className={`text-[11px] text-neutral-500 ${clsNum}`}>{d.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Calm summary footer to use vertical space without clutter */}
        <div className="mt-5 border-t border-neutral-200 pt-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="min-w-0">
              <div className="text-[11px] text-neutral-500">Total</div>
              <div className={`text-[16px] font-semibold text-neutral-900 ${clsNum}`}>{total.toLocaleString()}</div>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-neutral-500">{data[0].label} share</div>
              <div className={`text-[16px] font-semibold text-neutral-900 ${clsNum}`}>{Math.round(pctCompleted)}%</div>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-neutral-500">{data[2].label} share</div>
              <div className={`text-[16px] font-semibold text-neutral-900 ${clsNum}`}>{Math.round(pctPending)}%</div>
            </div>
          </div>
          {/* small meta line — stays understated */}
          <div className="mt-2 text-[11px] text-neutral-400">Updated just now</div>
        </div>
      </div>
    </Card>
  );
}
