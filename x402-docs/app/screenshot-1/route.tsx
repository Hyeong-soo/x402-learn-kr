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
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          padding: "80px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(16, 185, 129, 0.3)" />
            </svg>
          </div>
          <span style={{ fontSize: "48px", fontWeight: "bold", color: "white" }}>
            Learn402
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: "40px",
          }}
        >
          <span
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.2,
            }}
          >
            AI 에이전트를 위한
          </span>
          <span
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #10b981, #3b82f6)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.2,
            }}
          >
            결제 프로토콜
          </span>
          <p
            style={{
              fontSize: "40px",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "20px",
              lineHeight: 1.5,
            }}
          >
            x402를 사용하면 AI 에이전트가 자율적으로 마이크로페이먼트를 처리할 수 있습니다
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "60px",
            paddingTop: "40px",
            borderTop: "2px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "56px", fontWeight: "bold", color: "#10b981" }}>~2초</span>
            <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.5)" }}>결제 완료</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "56px", fontWeight: "bold", color: "#3b82f6" }}>$0.01~</span>
            <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.5)" }}>마이크로페이먼트</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1284,
      height: 2778,
    }
  );
}
