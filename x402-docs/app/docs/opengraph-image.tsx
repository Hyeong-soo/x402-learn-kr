import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "x402 개발 문서";
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
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
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
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "24px" }}>📖</span>
          <span style={{ color: "#3b82f6", fontSize: "20px", fontWeight: "600" }}>
            기술 문서
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
          개발 문서
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
          x402 프로토콜을 프로젝트에 통합하기 위한 가이드와 레퍼런스
        </p>

        {/* Code Preview */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px 32px",
            borderRadius: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: "#10b981" }}>app.use</span>
          <span style={{ color: "white" }}>(</span>
          <span style={{ color: "#f59e0b" }}>paymentMiddleware</span>
          <span style={{ color: "white" }}>{"({ price: "}</span>
          <span style={{ color: "#3b82f6" }}>"$0.01"</span>
          <span style={{ color: "white" }}>{" }))"}</span>
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
