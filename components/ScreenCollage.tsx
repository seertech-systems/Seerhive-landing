
type Shot = { src: string; label: string };

/**
 * Three real screens overlapped like a collage: one large in front, two behind it at
 * a slight angle. Hovering fans them apart a little.
 */
export default function ScreenCollage({ name, shots }: { name: string; shots: [Shot, Shot, Shot] }) {
  const [front, left, right] = shots;

  const frame =
    "absolute overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_30px_80px_-30px_rgba(10,40,120,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const Window = ({ shot }: { shot: Shot }) => (
    <>
      <div className="flex items-center gap-2 border-b border-[#0078C8] bg-[#0078C8] px-3 py-2">
        <span className="label-mono ml-1 truncate text-[12px] text-white">{shot.label}</span>
      </div>
      <div className="overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={shot.src} alt={`${name}: ${shot.label}`} loading="lazy" draggable={false} className="block aspect-[16/10] w-full object-cover object-top" />
      </div>
    </>
  );

  return (
    <div className="group relative mx-auto aspect-[1.02/1] w-full max-w-[680px] p-3">
      {/* back left */}
      <div
        className={`${frame} left-2 top-3 w-[56%] -rotate-2 group-hover:-translate-x-2 group-hover:-rotate-[5deg]`}
      >
        <Window shot={left} />
      </div>
      {/* back right */}
      <div
        className={`${frame} bottom-3 right-2 w-[56%] rotate-2 group-hover:translate-x-2 group-hover:rotate-[5deg]`}
      >
        <Window shot={right} />
      </div>
      {/* front */}
      <div
        className={`${frame} left-1/2 top-1/2 z-10 w-[88%] -translate-x-1/2 -translate-y-1/2 group-hover:-translate-y-[53%]`}
      >
        <Window shot={front} />
      </div>
    </div>
  );
}
