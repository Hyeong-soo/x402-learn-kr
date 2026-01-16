import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "x402 인터랙티브 데모";
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
            "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.2) 0%, transparent 50%)",
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
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "24px" }}>⚡</span>
          <span style={{ color: "#f59e0b", fontSize: "20px", fontWeight: "600" }}>
            인터랙티브 데모
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
          직접 체험하기
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
          사람과 AI 에이전트의 접근 차이를 직접 확인하세요
        </p>

        {/* Comparison */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {/* Human */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 48px",
              borderRadius: "16px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <span style={{ fontSize: "48px" }}>👤</span>
            <span style={{ color: "white", fontSize: "24px", fontWeight: "600", marginTop: "12px" }}>
              사람
            </span>
            <span style={{ color: "#10b981", fontSize: "20px", fontWeight: "bold", marginTop: "8px" }}>
              무료
            </span>
          </div>

          {/* vs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgba(255, 255, 255, 0.3)",
              fontSize: "32px",
            }}
          >
            vs
          </div>

          {/* AI */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px 48px",
              borderRadius: "16px",
              backgroundColor: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <span style={{ fontSize: "48px" }}>🤖</span>
            <span style={{ color: "white", fontSize: "24px", fontWeight: "600", marginTop: "12px" }}>
              AI
            </span>
            <span style={{ color: "#f59e0b", fontSize: "20px", fontWeight: "bold", marginTop: "8px" }}>
              $0.01 USDC
            </span>
          </div>
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
            x402-learn-kr
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
