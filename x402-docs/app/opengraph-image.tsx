import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Learn402 - AI 에이전트 결제 프로토콜";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "9999px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "24px" }}>✨</span>
          <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "20px" }}>
            Learn402
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            AI 시대의
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #10b981, #3b82f6)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
            }}
          >
            결제 프로토콜
          </span>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          HTTP 402 상태 코드를 활용한 인터넷 네이티브 결제 표준
        </p>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "64px",
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}>~2초</span>
            <span style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.5)" }}>결제 완료</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}>$0.001~</span>
            <span style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.5)" }}>마이크로페이먼트</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "#10b981" }}>HTTP</span>
            <span style={{ fontSize: "18px", color: "rgba(255, 255, 255, 0.5)" }}>네이티브</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
