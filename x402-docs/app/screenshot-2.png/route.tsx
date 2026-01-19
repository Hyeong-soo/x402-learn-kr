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
            데모
          </span>
        </div>

        {/* Payment Flow */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "50px",
          }}
        >
          {/* Step 1 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              padding: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              border: "2px solid rgba(16, 185, 129, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                color: "black",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              1
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}>
                AI가 콘텐츠 요청
              </span>
              <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.6)" }}>
                보호된 API에 접근 시도
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              padding: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              border: "2px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
                color: "black",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              2
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}>
                402 Payment Required
              </span>
              <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.6)" }}>
                서버가 결제 요청 응답
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              padding: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "24px",
              border: "2px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
                color: "white",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              3
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "white" }}>
                자동 USDC 결제
              </span>
              <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.6)" }}>
                MCP 서버가 결제 처리
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              padding: "40px",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: "24px",
              border: "2px solid rgba(16, 185, 129, 0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                color: "black",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#10b981" }}>
                콘텐츠 접근 성공!
              </span>
              <span style={{ fontSize: "28px", color: "rgba(255, 255, 255, 0.6)" }}>
                마크다운으로 효율적 응답
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "60px",
            padding: "30px",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderRadius: "16px",
          }}
        >
          <span style={{ fontSize: "32px", color: "#10b981" }}>
            💡 토큰 90% 절약 · ROI 165%
          </span>
        </div>
      </div>
    ),
    {
      width: 1284,
      height: 2778,
    }
  );
}
