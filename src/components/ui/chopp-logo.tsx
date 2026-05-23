import { cn } from "@/lib/utils";

interface ChoppLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function ChoppLogo({ className, ...props }: ChoppLogoProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={cn("w-full h-full", className)}
      {...props}
    >
      {/* Background Gear */}
      <g fill="#2563eb" transform="translate(50, 60) scale(0.6)">
        <path d="M49.9,89.6l-5.1-13.8c-2.4-0.8-4.7-1.9-6.8-3.2l-12.7,7.8L15.9,71l7.8-12.7c-1.3-2.1-2.4-4.4-3.2-6.8L6.7,46.4v-13 l13.8-5.1c0.8-2.4,1.9-4.7,3.2-6.8L15.9,8.8l9.4-9.4l12.7,7.8c2.1-1.3,4.4-2.4,6.8-3.2L49.9-9.8h13l5.1,13.8 c2.4,0.8,4.7,1.9,6.8,3.2l12.7-7.8l9.4,9.4l-7.8,12.7c1.3,2.1,2.4,4.4,3.2,6.8l13.8,5.1v13l-13.8,5.1c-0.8,2.4-1.9,4.7-3.2,6.8 l7.8,12.7l-9.4,9.4l-12.7-7.8c-2.1,1.3-4.4,2.4-6.8,3.2l-5.1,13.8H49.9z" />
        <circle cx="56.4" cy="39.9" r="25" fill="#0a0a0a" />
      </g>

      {/* Beer Mug */}
      <g transform="translate(20, 15)">
        {/* Mug Body */}
        <path d="M15,25 v40 a10,10 0 0,0 10,10 h15 a10,10 0 0,0 10,-10 v-40 z" fill="#f8fafc" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Mug Handle */}
        <path d="M50,35 h10 a8,8 0 0,1 8,8 v10 a8,8 0 0,1 -8,8 h-10" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Vertical lines on mug */}
        <line x1="22" y1="35" x2="22" y2="65" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <line x1="32" y1="35" x2="32" y2="65" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
        <line x1="42" y1="35" x2="42" y2="65" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />

        {/* Foam */}
        <path d="M10,25 a8,8 0 0,1 15,-5 a12,12 0 0,1 22,0 a8,8 0 0,1 5,12 a6,6 0 0,1 -10,4 a6,6 0 0,1 -8,5 a8,8 0 0,1 -15,-2 a6,6 0 0,1 -9,-14 z" fill="#ffffff" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
