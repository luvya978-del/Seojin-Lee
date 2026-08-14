import React from 'react';

interface RobotLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  className?: string;
}

export const RobotLogoIcon: React.FC<{ className?: string; color?: string }> = ({
  className = "w-8 h-8",
  color = "#7864f6"
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Antenna */}
      <line
        x1="30"
        y1="38"
        x2="18"
        y2="18"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle cx="18" cy="18" r="5.5" fill={color} />

      {/* Right Antenna */}
      <line
        x1="70"
        y1="38"
        x2="82"
        y2="18"
        stroke={color}
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <circle cx="82" cy="18" r="5.5" fill={color} />

      {/* Left Ear Lug */}
      <rect
        x="6"
        y="45"
        width="10"
        height="18"
        rx="5"
        fill={color}
      />

      {/* Right Ear Lug */}
      <rect
        x="84"
        y="45"
        width="10"
        height="18"
        rx="5"
        fill={color}
      />

      {/* Main Head (Rounded TV screen shape) */}
      <rect
        x="13"
        y="32"
        width="74"
        height="56"
        rx="22"
        fill={color}
      />

      {/* Inner Screen Face Plate */}
      <rect
        x="20"
        y="39"
        width="60"
        height="42"
        rx="16"
        fill="#FFFFFF"
      />

      {/* Eyes */}
      <circle cx="37" cy="55" r="5.5" fill={color} />
      <circle cx="63" cy="55" r="5.5" fill={color} />

      {/* Smile */}
      <path
        d="M40 65 Q50 74 60 65"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export const RobotLogo: React.FC<RobotLogoProps> = ({
  size = 'md',
  showText = true,
  textColor = 'text-slate-800',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textClasses = {
    sm: 'text-sm font-bold tracking-tight',
    md: 'text-base font-bold tracking-tight',
    lg: 'text-xl font-bold tracking-tight',
    xl: 'text-2xl font-extrabold tracking-tight'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center transition-transform hover:scale-105 duration-200">
        <RobotLogoIcon className={sizeClasses[size]} />
      </div>
      {showText && (
        <div className={`flex flex-col leading-none select-none ${textColor}`}>
          <span className={`${textClasses[size]} font-['Outfit'] font-bold text-slate-800`}>
            Seojin&apos;s
          </span>
          <span className={`${textClasses[size]} font-['Outfit'] font-bold text-slate-800`}>
            Portfolio
          </span>
        </div>
      )}
    </div>
  );
};
