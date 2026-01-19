import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "x402 프로토콜 배우기";
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
            "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
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
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "24px" }}>📚</span>
          <span style={{ color: "#10b981", fontSize: "20px", fontWeight: "600" }}>
            개념 학습
          </span>
        </div>

        {/* Main Title */}
        <span
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          x402 프로토콜 배우기
        </span>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "24px",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          AI 에이전트 결제의 새로운 표준을 단계별로 학습하세요
        </p>

        {/* Topics */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "48px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["x402란?", "작동 원리", "EIP-712", "USDC 전송", "생태계"].map((topic) => (
            <div
              key={topic}
              style={{
                padding: "12px 24px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "20px",
              }}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "18px" }}>
            Learn402
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
