"use client";

export function ArchitectureDiagram() {
  // Actor positions (x coordinates)
  const actors = [
    { x: 90, name: "클라이언트", sub: "AI Agent", color: "#10b981" },
    { x: 260, name: "리소스 서버", sub: "API Server", color: "#3b82f6" },
    { x: 430, name: "퍼실리테이터", sub: "검증/정산", color: "#a855f7" },
    { x: 600, name: "블록체인", sub: "USDC Contract", color: "#f59e0b" },
  ];

  // Message flows (matching visualizer page - async settlement)
  const messages = [
    { from: 0, to: 1, y: 105, label: "1. GET /resource" },
    { from: 1, to: 0, y: 145, label: "2. 402 응답", sublabel: "결제 정보" },
    { from: 0, to: 0, y: 185, label: "3. 서명 생성", sublabel: "EIP-712", self: true },
    { from: 0, to: 1, y: 240, label: "4. GET + 서명" },
    { from: 1, to: 2, y: 280, label: "5. 검증 요청", sublabel: "오프체인" },
    { from: 2, to: 1, y: 320, label: "6. 검증 완료", sublabel: "~100ms" },
    { from: 1, to: 0, y: 360, label: "7. 200 + 콘텐츠", sublabel: "즉시 응답" },
    { from: 2, to: 3, y: 410, label: "8. 온체인 정산", sublabel: "비동기", async: true },
  ];

  const svgHeight = 480;
  const headerHeight = 70;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 700 480"
        className="w-full max-w-3xl mx-auto"
        style={{ minWidth: "580px" }}
      >
        <defs>
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0,0 10,3.5 0,7" fill="rgba(255,255,255,0.7)" />
          </marker>
          {/* Async arrow marker (dashed) */}
          <marker
            id="arrowhead-async"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0,0 10,3.5 0,7" fill="rgba(251,191,36,0.8)" />
          </marker>
        </defs>

        {/* Vertical lifelines */}
        {actors.map((actor, i) => (
          <line
            key={`line-${i}`}
            x1={actor.x}
            y1={headerHeight}
            x2={actor.x}
            y2={svgHeight - 20}
            stroke={actor.color}
            strokeWidth="2"
            strokeOpacity="0.3"
            strokeDasharray="4 4"
          />
        ))}

        {/* Actor headers */}
        {actors.map((actor, i) => (
          <g key={`actor-${i}`}>
            {/* Icon background */}
            <rect
              x={actor.x - 22}
              y={10}
              width="44"
              height="44"
              rx="10"
              fill={actor.color}
              fillOpacity="0.2"
            />
            {/* Icon circle */}
            <circle
              cx={actor.x}
              cy={32}
              r="10"
              fill={actor.color}
              fillOpacity="0.5"
            />
            {/* Actor name */}
            <text
              x={actor.x}
              y={72}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontWeight="500"
            >
              {actor.name}
            </text>
            {/* Actor subtitle */}
            <text
              x={actor.x}
              y={86}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="9"
            >
              {actor.sub}
            </text>
          </g>
        ))}

        {/* Messages */}
        {messages.map((msg, i) => {
          const fromX = actors[msg.from].x;
          const toX = actors[msg.to].x;
          const isSelf = msg.self;
          const isAsync = msg.async;

          if (isSelf) {
            // Self-referencing arrow (loop)
            const loopWidth = 32;
            const loopHeight = 18;
            return (
              <g key={`msg-${i}`}>
                <path
                  d={`M ${fromX} ${msg.y}
                      L ${fromX + loopWidth} ${msg.y}
                      L ${fromX + loopWidth} ${msg.y + loopHeight}
                      L ${fromX + 8} ${msg.y + loopHeight}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                />
                {/* Label */}
                <text
                  x={fromX + loopWidth + 8}
                  y={msg.y + 8}
                  fill="rgba(255,255,255,0.9)"
                  fontSize="10"
                  fontWeight="500"
                >
                  {msg.label}
                  {msg.sublabel && (
                    <tspan fill="rgba(255,255,255,0.5)" fontSize="9">
                      {" "}({msg.sublabel})
                    </tspan>
                  )}
                </text>
              </g>
            );
          }

          // Regular arrow
          const goingRight = toX > fromX;
          const midX = (fromX + toX) / 2;

          return (
            <g key={`msg-${i}`}>
              <line
                x1={goingRight ? fromX + 2 : fromX - 2}
                y1={msg.y}
                x2={goingRight ? toX - 2 : toX + 2}
                y2={msg.y}
                stroke={isAsync ? "rgba(251,191,36,0.6)" : "rgba(255,255,255,0.5)"}
                strokeWidth="1.5"
                strokeDasharray={isAsync ? "6 3" : "none"}
                markerEnd={isAsync ? "url(#arrowhead-async)" : "url(#arrowhead)"}
              />
              {/* Label background */}
              <rect
                x={midX - 42}
                y={msg.y - 16}
                width="84"
                height="14"
                fill={isAsync ? "rgba(251,191,36,0.15)" : "rgba(0,0,0,0.6)"}
                rx="3"
              />
              {/* Label */}
              <text
                x={midX}
                y={msg.y - 5}
                textAnchor="middle"
                fill={isAsync ? "rgba(251,191,36,0.9)" : "rgba(255,255,255,0.9)"}
                fontSize="9"
                fontWeight="500"
              >
                {msg.label}
              </text>
              {msg.sublabel && (
                <text
                  x={midX + 46}
                  y={msg.y - 5}
                  fill={isAsync ? "rgba(251,191,36,0.6)" : "rgba(255,255,255,0.5)"}
                  fontSize="8"
                >
                  {msg.sublabel}
                </text>
              )}
            </g>
          );
        })}

        {/* Legend for async */}
        <g transform="translate(20, 445)">
          <line
            x1="0"
            y1="8"
            x2="30"
            y2="8"
            stroke="rgba(251,191,36,0.6)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <text x="38" y="12" fill="rgba(251,191,36,0.8)" fontSize="9">
            비동기 처리
          </text>
        </g>
      </svg>
    </div>
  );
}
