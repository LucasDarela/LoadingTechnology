import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  // 12 bars for the loading spinner
  const bars = Array.from({ length: 12 }).map((_, i) => {
    const rotation = i * 30;
    // Calculate opacity to create the gradient effect of the loading spinner
    const opacity = (i + 1) / 12;

    return (
      <g key={i} transform={`rotate(${rotation} 50 50)`}>
        <rect
          x="46"
          y="15"
          width="8"
          height="20"
          rx="4"
          ry="4"
          fill="currentColor"
          style={{ opacity }}
        />
      </g>
    );
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("w-10 h-10 animate-[spin_3s_linear_infinite]", className)}
      {...props}
    >
      {bars}
    </svg>
  );
}
