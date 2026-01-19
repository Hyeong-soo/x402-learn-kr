import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
        }}
      >
        {/* Outer glow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "800px",
            height: "800px",
            borderRadius: "200px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
          }}
        >
          {/* Inner circle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "600px",
              height: "600px",
              borderRadius: "150px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "4px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            {/* Icon content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {/* Lightning bolt / Zap icon */}
              <svg
                width="280"
                height="280"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(16, 185, 129, 0.2)" />
              </svg>
              {/* Text */}
              <span
                style={{
                  fontSize: "120px",
                  fontWeight: "bold",
                  color: "white",
                  letterSpacing: "-4px",
                }}
              >
                402
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
    }
  );
}
