export function GeometricBackground() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full opacity-40">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="cube"
            x="0"
            y="0"
            width="70"
            height="40.4"
            patternUnits="userSpaceOnUse"
          >
            <g>
              {/* Top face */}
              <path
                d="M 35 0 L 52.5 10.1 L 35 20.2 L 17.5 10.1 Z"
                fill="#ffffff"
              />
              {/* Left face */}
              <path
                d="M 17.5 10.1 L 35 20.2 L 17.5 30.3 L 0 20.2 Z"
                fill="#f5f5f5"
              />
              {/* Right face (shadow) */}
              <path
                d="M 35 20.2 L 52.5 10.1 L 52.5 30.3 L 35 40.4 Z"
                fill="#FADBE1"
              />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cube)" />
      </svg>
    </div>
  );
}
