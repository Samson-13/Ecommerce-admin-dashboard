export default function RevenueForecastChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Revenue Forecast
      </h3>

      <div className="h-48 relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 340 100"
          preserveAspectRatio="none"
        >
          {/* Bars */}
          {[40, 70, 60, 50, 45, 90, 30, 60, 50, 70, 95, 80].map(
            (height, index) => {
              const x = 20 + index * 25;
              const isCenter = index === 6;
              return (
                <rect
                  key={index}
                  x={x}
                  y={100 - height}
                  width="6"
                  height={height}
                  fill={isCenter ? "#f87171" : "#6366f1"}
                  rx="3"
                  opacity={isCenter ? 1 : 0.9}
                  filter={isCenter ? "url(#glow)" : undefined}
                />
              );
            }
          )}

          {/* Optional glow effect */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="4"
                floodColor="#f87171"
                floodOpacity="0.5"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
