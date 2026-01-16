"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  RotateCcw,
  Server,
  Smartphone,
  Building2,
  Check,
} from "lucide-react";

type Step = {
  id: number;
  title: string;
  subtitle: string;
  from: number; // 0-3 position index
  to: number;
  color: string;
  // For parallel animations
  parallel?: {
    from: number;
    to: number;
    color: string;
    label: string;
  };
};

const steps: Step[] = [
  { id: 1, title: "요청", subtitle: "GET /api/data", from: 0, to: 1, color: "emerald" },
  { id: 2, title: "402", subtitle: "Payment Required", from: 1, to: 0, color: "amber" },
  { id: 3, title: "서명", subtitle: "EIP-712 Sign", from: 0, to: 0, color: "blue" },
  { id: 4, title: "재요청", subtitle: "+ Signature", from: 0, to: 1, color: "emerald" },
  { id: 5, title: "검증 요청", subtitle: "Verify Payment", from: 1, to: 2, color: "purple" },
  { id: 6, title: "검증 완료", subtitle: "OK Response", from: 2, to: 1, color: "purple" },
  {
    id: 7,
    title: "정산 & 응답",
    subtitle: "동시 처리",
    from: 2,
    to: 3,
    color: "amber",
    parallel: {
      from: 1,
      to: 0,
      color: "emerald",
      label: "✓",
    },
  },
];

const entities = [
  { id: "client", label: "클라이언트", icon: Smartphone },
  { id: "server", label: "서버", icon: Server },
  { id: "facilitator", label: "퍼실리테이터", icon: Building2 },
  { id: "blockchain", label: "블록체인", icon: null },
];

// 4개 엔티티 위치 (0%, 33.33%, 66.67%, 100%)
const POSITIONS = [0, 33.33, 66.67, 100];

export default function VisualizerPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetPos, setPacketPos] = useState({ from: 0, to: 0, progress: 0 });
  const [parallelPacketPos, setParallelPacketPos] = useState({ from: 0, to: 0, progress: 0 });
  const [speed, setSpeed] = useState(1); // 0.5 = 느리게, 1 = 보통, 2 = 빠르게
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isPlaying) return;

    const step = steps[currentStep];
    if (!step) {
      if (currentStep >= steps.length) {
        setIsPlaying(false);
      }
      return;
    }

    // Animate packet(s)
    let start: number | null = null;
    const duration = 600 / speed;
    const pauseTime = 400 / speed;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      setPacketPos({
        from: step.from,
        to: step.to,
        progress: easeInOut(progress),
      });

      // Animate parallel packet if exists
      if (step.parallel) {
        setParallelPacketPos({
          from: step.parallel.from,
          to: step.parallel.to,
          progress: easeInOut(progress),
        });
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Move to next step after a short pause
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, pauseTime);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentStep, speed]);

  const easeInOut = (t: number) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  const handlePlayPause = () => {
    if (currentStep >= steps.length || currentStep === -1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    setPacketPos({ from: 0, to: 0, progress: 0 });
  };

  const getPacketX = () => {
    const fromX = POSITIONS[packetPos.from];
    const toX = POSITIONS[packetPos.to];
    return fromX + (toX - fromX) * packetPos.progress;
  };

  const getParallelPacketX = () => {
    const fromX = POSITIONS[parallelPacketPos.from];
    const toX = POSITIONS[parallelPacketPos.to];
    return fromX + (toX - fromX) * parallelPacketPos.progress;
  };

  const activeStep = steps[currentStep];

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-5xl px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            x402 결제 플로우
          </h1>
          <p className="text-white/50 text-sm">
            AI 에이전트가 유료 API에 접근하는 전체 과정
          </p>
        </div>

        {/* Main Visualizer */}
        <div className="glass rounded-2xl p-6 mb-6">
          {/* Entity Row + Line in same relative container */}
          <div className="relative px-8">
            {/* Entity Icons */}
            <div className="relative h-24 mb-4">
              {entities.map((entity, idx) => {
                const Icon = entity.icon;
                const isActive = activeStep && (activeStep.from === idx || activeStep.to === idx);
                return (
                  <div
                    key={entity.id}
                    className="absolute -translate-x-1/2 flex flex-col items-center"
                    style={{ left: `${POSITIONS[idx]}%` }}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-emerald-500/30 text-emerald-400 scale-110"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {Icon ? (
                        <Icon className="h-7 w-7" />
                      ) : (
                        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-white/60 mt-2 text-center whitespace-nowrap">{entity.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Connection Line & Packet */}
            <div className="relative h-12">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2">
                {/* Nodes */}
                {POSITIONS.map((pos, idx) => {
                  const isMainActive = activeStep && (activeStep.from === idx || activeStep.to === idx);
                  const isParallelActive = activeStep?.parallel && (activeStep.parallel.from === idx || activeStep.parallel.to === idx);
                  return (
                    <div
                      key={idx}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-colors duration-300 ${
                        isMainActive || isParallelActive
                          ? "bg-emerald-400"
                          : "bg-white/30"
                      }`}
                      style={{ left: `${pos}%` }}
                    />
                  );
                })}
              </div>

              {/* Animated Packet */}
              {currentStep >= 0 && currentStep < steps.length && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-200"
                  style={{ left: `${getPacketX()}%` }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
                      activeStep?.color === "amber"
                        ? "bg-amber-500 text-black shadow-amber-500/50"
                        : activeStep?.color === "purple"
                        ? "bg-purple-500 text-white shadow-purple-500/50"
                        : activeStep?.color === "blue"
                        ? "bg-blue-500 text-white shadow-blue-500/50"
                        : "bg-emerald-500 text-black shadow-emerald-500/50"
                    }`}
                  >
                    {activeStep?.parallel ? "$" : activeStep?.id}
                  </div>
                </div>
              )}

              {/* Parallel Packet (for simultaneous animations) */}
              {currentStep >= 0 && currentStep < steps.length && activeStep?.parallel && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-opacity duration-200"
                  style={{ left: `${getParallelPacketX()}%` }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg bg-emerald-500 text-black shadow-emerald-500/50">
                    {activeStep.parallel.label}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Current Step Info */}
          <div className="text-center h-16 flex items-center justify-center">
            {activeStep ? (
              <div className="animate-fadeIn">
                <div className="text-lg font-semibold text-white">
                  {activeStep.id}. {activeStep.title}
                </div>
                <div className="text-sm text-white/50">{activeStep.subtitle}</div>
              </div>
            ) : currentStep >= steps.length ? (
              <div className="text-emerald-400 font-semibold flex items-center gap-2">
                <Check className="h-5 w-5" />
                결제 완료! 콘텐츠 접근 성공
              </div>
            ) : (
              <div className="text-white/40">시작 버튼을 눌러주세요</div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              onClick={handlePlayPause}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  일시정지
                </>
              ) : currentStep >= steps.length ? (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  다시 보기
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  {currentStep === -1 ? "시작" : "계속"}
                </>
              )}
            </Button>
            <Select
              value={String(speed)}
              onValueChange={(value) => setSpeed(Number(value))}
            >
              <SelectTrigger className="w-20 bg-white/5 border-white/20 text-white hover:bg-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/20">
                <SelectItem value="0.5" className="text-white focus:bg-white/10 focus:text-white">0.5x</SelectItem>
                <SelectItem value="1" className="text-white focus:bg-white/10 focus:text-white">1x</SelectItem>
                <SelectItem value="2" className="text-white focus:bg-white/10 focus:text-white">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Step Timeline */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            단계별 진행
          </h3>

          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${currentStep >= 0 ? (currentStep / (steps.length - 1)) * 100 : 0}%` }}
              />
            </div>
            <div className="absolute -top-1 left-0 right-0 flex justify-between">
              {steps.map((step, idx) => {
                const isComplete = idx < currentStep;
                const isActive = idx === currentStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(idx);
                      setPacketPos({ from: step.from, to: step.to, progress: 0.5 });
                    }}
                    className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                      isComplete
                        ? "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                        : isActive
                        ? "bg-emerald-400 ring-4 ring-emerald-400/30 scale-125"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    title={`${step.id}. ${step.title}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Step Cards Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {steps.map((step, idx) => {
              const isComplete = idx < currentStep;
              const isActive = idx === currentStep;
              const colorClass = step.color === "amber"
                ? "border-amber-500/50 bg-amber-500/10"
                : step.color === "purple"
                ? "border-purple-500/50 bg-purple-500/10"
                : step.color === "blue"
                ? "border-blue-500/50 bg-blue-500/10"
                : "border-emerald-500/50 bg-emerald-500/10";
              const textColor = step.color === "amber"
                ? "text-amber-400"
                : step.color === "purple"
                ? "text-purple-400"
                : step.color === "blue"
                ? "text-blue-400"
                : "text-emerald-400";

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(idx);
                    setPacketPos({ from: step.from, to: step.to, progress: 0.5 });
                  }}
                  className={`relative p-3 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? `${colorClass} scale-105 shadow-lg`
                      : isComplete
                      ? "border-white/20 bg-white/5"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-white/20"
                  }`}
                >
                  {isComplete && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-black" />
                    </div>
                  )}
                  <div className={`text-lg font-bold mb-1 ${isActive ? textColor : isComplete ? "text-white" : "text-white/40"}`}>
                    {step.id}
                  </div>
                  <div className={`text-xs font-medium ${isActive ? textColor : isComplete ? "text-white/80" : "text-white/40"}`}>
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Flow Explanation */}
        <div className="mt-6 space-y-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            플로우 상세 설명
          </h3>

          {/* Phase 1: Request & Response */}
          <div className="glass rounded-2xl p-5 border border-amber-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Server className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold">Phase 1</span>
                  <h4 className="text-white font-semibold">요청 & 402 응답</h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">1</div>
                      <span className="text-white/80 text-sm font-medium">API 요청</span>
                    </div>
                    <code className="text-emerald-400 text-xs">GET /api/premium-data</code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">2</div>
                      <span className="text-white/80 text-sm font-medium">결제 요구</span>
                    </div>
                    <code className="text-amber-400 text-xs">402 Payment Required</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2: Signing & Verification */}
          <div className="glass rounded-2xl p-5 border border-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">Phase 2</span>
                  <h4 className="text-white font-semibold">서명 & 검증</h4>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">3</div>
                      <span className="text-white/80 text-sm font-medium">서명 생성</span>
                    </div>
                    <code className="text-blue-400 text-xs">EIP-712 Sign</code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">4</div>
                      <span className="text-white/80 text-sm font-medium">재요청</span>
                    </div>
                    <code className="text-emerald-400 text-xs">+ X-402-Sig</code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">5</div>
                      <span className="text-white/80 text-sm font-medium">검증 요청</span>
                    </div>
                    <code className="text-purple-400 text-xs">서버 → 퍼실리테이터</code>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-purple-500 text-white text-xs font-bold flex items-center justify-center">6</div>
                      <span className="text-white/80 text-sm font-medium">검증 완료</span>
                    </div>
                    <code className="text-purple-400 text-xs">퍼실리테이터 → 서버</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: Settlement & Success (Parallel) */}
          <div className="glass rounded-2xl p-5 border border-emerald-500/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold">Phase 3</span>
                  <h4 className="text-white font-semibold">정산 & 응답</h4>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-xs">동시 처리</span>
                </div>
                <div className="relative">
                  {/* Parallel indicator */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-black/30 rounded-lg p-3 border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">$</div>
                        <span className="text-white/80 text-sm font-medium">USDC 전송</span>
                        <span className="text-amber-400/60 text-xs">(비동기)</span>
                      </div>
                      <code className="text-amber-400 text-xs">퍼실리테이터 → 블록체인</code>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3 border border-emerald-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-black text-xs font-bold flex items-center justify-center">✓</div>
                        <span className="text-white/80 text-sm font-medium">성공 응답</span>
                        <span className="text-emerald-400/60 text-xs">(즉시)</span>
                      </div>
                      <code className="text-emerald-400 text-xs">서버 → 클라이언트</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
