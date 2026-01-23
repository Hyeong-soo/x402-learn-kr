"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Building2,
  Code,
  Layers,
  ExternalLink,
  Github,
  TrendingUp,
  Users,
  Bot,
  FileText,
  Briefcase,
  Wrench,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CoinbaseLogo,
  CloudflareLogo,
  CircleLogo,
  AWSLogo,
  AnthropicLogo,
  NEARLogo,
  GoogleLogo,
  VisaLogo,
  MetaMaskLogo,
  ThirdwebLogo,
  CrossmintLogo,
  PayAILogo,
  VercelLogo,
  ZuploLogo,
  NpmLogo,
  GitHubLogo,
} from "@/components/CompanyLogos";

// Language Icons
const TypeScriptIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5">
    <path fill="#3178c6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"/>
  </svg>
);

const PythonIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5">
    <linearGradient id="python-a" x1="70.252" x2="170.659" y1="1237.476" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#5A9FD4"/>
      <stop offset="1" stopColor="#306998"/>
    </linearGradient>
    <linearGradient id="python-b" x1="209.474" x2="173.62" y1="1098.811" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFD43B"/>
      <stop offset="1" stopColor="#FFE873"/>
    </linearGradient>
    <path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
    <path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
  </svg>
);

const GoIcon = () => (
  <svg viewBox="0 0 128 128" className="w-5 h-5">
    <path fill="#00acd7" d="M18.8 51.5c-.2 0-.4-.2-.2-.4l1.3-1.7c.2-.2.5-.4.8-.4h21.6c.2 0 .4.2.2.4l-1 1.6c-.2.2-.5.5-.8.5l-21.9-.1zm-9.5 5.8c-.2 0-.4-.2-.2-.4l1.3-1.7c.2-.2.5-.4.8-.4h27.6c.2 0 .4.2.3.5l-.5 1.5c0 .3-.3.5-.6.5l-28.7.1zm15.3 5.8c-.2 0-.4-.2-.2-.5l.9-1.6c.2-.3.5-.5.8-.5h12.1c.2 0 .4.2.4.5l-.1 1.5c0 .3-.2.5-.5.5l-13.4.1zm63.4-11.4l-15.8 4c-.7.2-1 .5-1 1 0 .6.2 1.1.5 1.7.4.8.9 1.6 1.4 2.2.5.7 1.1 1.4 1.6 2.1.5.7.9 1.3 1.4 1.8.3.4.7.8 1.1 1.1.4.4.9.7 1.4 1 .5.3 1.1.5 1.7.6.6.2 1.2.3 1.8.3.6 0 1.3-.1 1.9-.2.6-.1 1.2-.3 1.8-.6.6-.3 1.1-.6 1.6-1 .5-.4.9-.8 1.3-1.3.4-.5.7-1 .9-1.5.2-.5.4-1.1.5-1.7.1-.6.2-1.2.2-1.8 0-.6-.1-1.2-.2-1.8-.1-.6-.4-1.2-.6-1.8-.3-.6-.6-1.1-.9-1.6-.4-.5-.8-1-1.2-1.4-.4-.4-.9-.8-1.4-1.1-.5-.3-1-.6-1.5-.8-.5-.2-1.1-.4-1.6-.5-.6-.1-1.1-.2-1.7-.2h-3.4zm2.3 12.7c-1.8-.3-2.9-1.7-2.4-3.4.4-1.4 1.5-2.1 3-2.1 1.6 0 2.8.8 3.1 2.2.3 1.7-.9 3.3-3.7 3.3zm26.3-16.5c-.6.2-1.1.4-1.7.6-1.6.7-3 1.7-4.1 3-.2.3-.4.5-.6.8-.2.3-.4.6-.5 1-.1.3-.3.7-.4 1-.1.3-.2.7-.2 1 0 .7.1 1.3.4 1.9.3.6.7 1.1 1.2 1.5.5.4 1.1.7 1.8.9.7.2 1.4.3 2.1.2.7-.1 1.4-.3 2-.6.6-.3 1.2-.7 1.6-1.2.5-.5.9-1.1 1.2-1.7.3-.6.5-1.3.6-2 .1-.7.1-1.4 0-2.1-.1-.7-.3-1.4-.6-2-.3-.6-.7-1.1-1.2-1.6-.5-.5-1-.8-1.6-1.1-.6-.3-1.2-.4-1.9-.5-.7-.1-1.4-.1-2.1 0z"/>
  </svg>
);

// Company Logo mapping
const getCompanyLogo = (name: string, size: "sm" | "md" | "lg" = "md") => {
  const sizeClass = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6";
  const logos: Record<string, React.ReactNode> = {
    "Coinbase": <CoinbaseLogo className={sizeClass} />,
    "Coinbase CDP": <CoinbaseLogo className={sizeClass} />,
    "Cloudflare": <CloudflareLogo className={sizeClass} />,
    "Circle": <CircleLogo className={sizeClass} />,
    "AWS": <AWSLogo className={sizeClass} />,
    "Anthropic": <AnthropicLogo className={sizeClass} />,
    "NEAR": <NEARLogo className={sizeClass} />,
    "Google": <GoogleLogo className={sizeClass} />,
    "Visa": <VisaLogo className={sizeClass} />,
    "MetaMask": <MetaMaskLogo className={sizeClass} />,
    "thirdweb": <ThirdwebLogo className={sizeClass} />,
    "Crossmint": <CrossmintLogo className={sizeClass} />,
    "PayAI": <PayAILogo className={sizeClass} />,
  };
  return logos[name] || null;
};

// Protocol Statistics Data
const protocolStats = [
  { value: "100M+", label: "총 트랜잭션", description: "2025년 5월 출시 이후" },
  { value: "$24M+", label: "거래량", description: "USDC 기반 결제" },
  { value: "$600M", label: "연간 거래량", description: "2025년 12월 기준" },
  { value: "$77B", label: "USDC 유통량", description: "16개 블록체인" },
];

// Protocol Founders
const founders = [
  {
    name: "Coinbase",
    initials: "CB",
    role: "프로토콜 창시자",
    description: "Coinbase Developer Platform(CDP)을 통해 x402 프로토콜을 개발하고 주요 퍼실리테이터를 운영합니다. Base 네트워크에서 수수료 없는 USDC 정산을 제공합니다.",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
    link: "https://docs.cdp.coinbase.com/x402",
  },
  {
    name: "Cloudflare",
    initials: "CF",
    role: "공동 창시자",
    description: "x402 프로토콜의 공동 창시자로, Workers 통합과 엣지 컴퓨팅 인프라를 제공합니다. 글로벌 분산 네트워크로 빠른 결제 처리를 지원합니다.",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
    link: "https://developers.cloudflare.com/agents/x402/",
  },
];

// Strategic Partners
const strategicPartners = [
  {
    name: "Circle",
    initials: "CI",
    role: "USDC 발행사",
    description: "세계 최대 규제 스테이블코인 USDC를 발행합니다. Gateway 제품으로 고처리량 에이전트 트랜잭션을 지원합니다.",
    bgColor: "bg-green-500/20",
    textColor: "text-green-400",
    link: "https://www.circle.com/",
  },
  {
    name: "AWS",
    initials: "AWS",
    role: "클라우드 파트너",
    description: "클라우드 인프라 및 AI 서비스를 통해 x402 생태계를 지원하는 협력 파트너입니다.",
    bgColor: "bg-yellow-500/20",
    textColor: "text-yellow-400",
    link: "https://aws.amazon.com/",
  },
  {
    name: "Anthropic",
    initials: "AN",
    role: "AI 파트너",
    description: "Claude AI와 x402를 통합하여 AI 에이전트가 자율적으로 유료 서비스에 결제할 수 있도록 합니다.",
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-400",
    link: "https://www.anthropic.com/",
  },
  {
    name: "NEAR",
    initials: "NR",
    role: "블록체인 파트너",
    description: "NEAR Protocol 블록체인 네트워크에서 x402 결제를 지원하는 파트너입니다.",
    bgColor: "bg-cyan-500/20",
    textColor: "text-cyan-400",
    link: "https://near.org/",
  },
];

// Enterprise Collaborators
const enterpriseCollaborators = [
  {
    name: "Google",
    initials: "G",
    integration: "Agent Payments Protocol (AP2)",
    description: "x402 구조를 확장한 AP2(Agent-to-Payment) 프로토콜을 발표하여 AI 에이전트 간 결제 표준을 구축합니다.",
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
    link: "https://cloud.google.com/",
  },
  {
    name: "Visa",
    initials: "V",
    integration: "Trusted Agent Protocol (TAP)",
    description: "신뢰할 수 있는 에이전트 프로토콜(TAP)에 x402 지원을 추가하여 기업 결제 인프라와 통합합니다.",
    bgColor: "bg-indigo-500/20",
    textColor: "text-indigo-400",
    link: "https://visa.com/",
  },
  {
    name: "MetaMask",
    initials: "MM",
    integration: "지갑 통합",
    description: "가장 널리 사용되는 Web3 지갑과의 협력으로 에이전트 기반 결제를 지원합니다.",
    bgColor: "bg-orange-500/20",
    textColor: "text-orange-400",
    link: "https://metamask.io/",
  },
];

// Infrastructure & Facilitators (expanded)
const infrastructureProjects = [
  {
    name: "Coinbase CDP",
    initials: "CB",
    type: "공식 퍼실리테이터",
    description: "Coinbase Developer Platform에서 제공하는 공식 퍼실리테이터입니다. Base 네트워크에 최적화되어 있습니다.",
    networks: "Base, Ethereum",
    tokens: "USDC",
    bgColor: "bg-blue-500/20",
    textColor: "text-blue-400",
    link: "https://docs.cdp.coinbase.com/x402",
  },
  {
    name: "x402.org",
    initials: "x4",
    type: "커뮤니티 퍼실리테이터",
    description: "커뮤니티에서 운영하는 오픈 퍼실리테이터입니다. 다양한 네트워크를 지원합니다.",
    networks: "Base, Polygon, +",
    tokens: "USDC",
    bgColor: "bg-purple-500/20",
    textColor: "text-purple-400",
    link: "https://x402.org",
  },
  {
    name: "PayAI",
    initials: "PA",
    type: "AI 특화 퍼실리테이터",
    description: "AI 에이전트 결제에 특화된 퍼실리테이터입니다. Solana 네트워크도 지원합니다.",
    networks: "Solana, Base, Polygon",
    tokens: "USDC, SPL",
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-400",
    link: "https://payai.network",
  },
  {
    name: "thirdweb",
    initials: "3W",
    type: "개발자 플랫폼",
    description: "Web3 개발자 플랫폼으로 SDK에서 x402를 지원합니다. Nexus를 통해 AI 에이전트가 계정이나 API 키 없이 서비스를 이용할 수 있습니다.",
    networks: "멀티체인",
    tokens: "USDC",
    bgColor: "bg-pink-500/20",
    textColor: "text-pink-400",
    link: "https://thirdweb.com/",
  },
  {
    name: "Crossmint",
    initials: "CM",
    type: "결제 플랫폼",
    description: "기업과 에이전트를 위한 올인원 플랫폼입니다. 크립토 월렛, 온램프, 스테이블코인 오케스트레이션을 제공합니다.",
    networks: "멀티체인",
    tokens: "USDC",
    bgColor: "bg-teal-500/20",
    textColor: "text-teal-400",
    link: "https://crossmint.com/",
  },
  {
    name: "Daydreams",
    initials: "DD",
    type: "Agent 프레임워크",
    description: "AI 에이전트 프레임워크로 x402 결제를 기본 지원합니다. 에이전트 개발을 위한 도구를 제공합니다.",
    networks: "-",
    tokens: "-",
    bgColor: "bg-violet-500/20",
    textColor: "text-violet-400",
    link: "#",
  },
  {
    name: "AIsa",
    initials: "AI",
    type: "결제 프로세서",
    description: "x402 결제 프로세서로 10.5M+ 누적 트랜잭션을 처리했습니다. 대규모 에이전트 결제에 최적화되어 있습니다.",
    networks: "멀티체인",
    tokens: "USDC",
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-400",
    link: "#",
    stats: "10.5M+ 트랜잭션",
  },
  {
    name: "Gloria",
    initials: "GL",
    type: "데이터 제공자",
    description: "AI 에이전트를 위한 실시간 뉴스 데이터를 제공합니다. x402로 요청당 결제가 가능합니다.",
    networks: "-",
    tokens: "USDC",
    bgColor: "bg-rose-500/20",
    textColor: "text-rose-400",
    link: "#",
  },
];

// Developer Tools
const developerTools = [
  {
    name: "Payments MCP",
    description: "Coinbase의 공식 MCP 서버입니다. 지갑, 온램프, x402 결제를 통합하여 AI 에이전트 상거래를 지원합니다.",
    link: "https://github.com/coinbase/payments-mcp",
    type: "MCP",
  },
  {
    name: "Vercel AI Starter",
    description: "x402 + AI SDK + AI Gateway가 통합된 Next.js 템플릿입니다. 빠르게 시작할 수 있습니다.",
    link: "https://vercel.com/templates/next.js/x402-ai-starter",
    type: "템플릿",
  },
  {
    name: "Zuplo",
    description: "API 플랫폼에서 x402 통합을 지원합니다. API 수익화를 쉽게 구현할 수 있습니다.",
    link: "https://zuplo.com/",
    type: "플랫폼",
  },
  {
    name: "@x402/axios",
    description: "Axios 인터셉터 패턴으로 자동 결제 플로우를 처리합니다. 기존 코드에 쉽게 통합됩니다.",
    link: "https://www.npmjs.com/package/@x402/axios",
    type: "npm",
  },
];

// Supported Networks (expanded)
const supportedNetworks = [
  { name: "Base Mainnet", caipId: "eip155:8453", token: "USDC", status: "active" },
  { name: "Base Sepolia", caipId: "eip155:84532", token: "USDC (테스트)", status: "active" },
  { name: "Ethereum Mainnet", caipId: "eip155:1", token: "USDC", status: "active" },
  { name: "Solana Mainnet", caipId: "solana:5eykt4...", token: "SPL USDC", status: "active" },
  { name: "Polygon", caipId: "eip155:137", token: "USDC", status: "active" },
  { name: "Arbitrum", caipId: "eip155:42161", token: "USDC", status: "partial" },
  { name: "Optimism", caipId: "eip155:10", token: "USDC", status: "partial" },
  { name: "Avalanche", caipId: "eip155:43114", token: "USDC", status: "active" },
  { name: "Sui", caipId: "sui:mainnet", token: "USDC", status: "active" },
  { name: "NEAR", caipId: "near:mainnet", token: "USDC", status: "active" },
  { name: "Sei", caipId: "sei:atlantic-2", token: "USDC", status: "upcoming" },
  { name: "Peaq", caipId: "eip155:3338", token: "USDC", status: "upcoming" },
  { name: "IoTeX", caipId: "eip155:4689", token: "USDC", status: "upcoming" },
];

// Use Cases
const useCases = [
  {
    icon: Bot,
    title: "AI 에이전트 결제",
    description: "AI 에이전트가 API, 데이터 피드, 컴퓨트 리소스에 자율적으로 결제합니다. 사전 계정이나 API 키 없이 즉시 접근이 가능합니다.",
    example: "Claude가 유료 데이터 API를 직접 호출하고 결제",
  },
  {
    icon: Code,
    title: "API 수익화",
    description: "API 요청당 과금으로 구독 복잡성을 제거합니다. 최소 결제 금액 없이 마이크로페이먼트가 가능합니다.",
    example: "Token Metrics: $0.017~$0.068/요청",
  },
  {
    icon: FileText,
    title: "콘텐츠 마이크로페이먼트",
    description: "기사, 동영상, 이미지 등 콘텐츠별 결제로 번들 구독을 대체합니다. 초 단위 스트리밍 과금도 가능합니다.",
    example: "뉴스 기사 $0.01, 동영상 초당 $0.001",
  },
  {
    icon: Users,
    title: "Agent-to-Agent 거래",
    description: "AI 에이전트 간 직접 거래가 가능합니다. 자율적인 구매자와 판매자가 24/7 거래하는 에이전트 마켓플레이스를 구축합니다.",
    example: "데이터 에이전트 → 분석 에이전트 결제",
  },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
          <Link href="/learn" className="hover:text-white">학습</Link>
          <span>/</span>
          <span className="text-white">생태계</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-6">
          생태계
        </h1>

        {/* Overview */}
        <div className="glass rounded-2xl p-8 mb-12">
          <p className="text-lg text-white/80 leading-relaxed">
            x402는 Coinbase와 Cloudflare가 공동 개발한 오픈 프로토콜입니다.
            2025년 5월 출시 이후 급속히 성장하여 Google, Visa, MetaMask 등 글로벌 기업들이
            생태계에 참여하고 있습니다. 주요 생태계 구성 요소들을 소개합니다.
          </p>
        </div>

        {/* Protocol Statistics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            프로토콜 현황
          </h2>

          <div className="glass rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {protocolStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
                  <div className="text-xs text-white/40">{stat.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/30 text-center">
              출처: Coinbase, Circle, Dune Analytics (2025년 12월 기준)
            </div>
          </div>
        </section>

        {/* Protocol Founders */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Zap className="h-6 w-6 text-emerald-400" />
            프로토콜 창시자
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {founders.map((founder) => (
              <div key={founder.name} className="glass rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${founder.bgColor} flex items-center justify-center`}>
                    {getCompanyLogo(founder.name, "lg") || <span className={`${founder.textColor} font-bold`}>{founder.initials}</span>}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-lg">{founder.name}</h3>
                    <span className="text-emerald-400 text-sm">{founder.role}</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {founder.description}
                </p>
                <a
                  href={founder.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm"
                >
                  문서 보기 <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-white/50" />
            전략 파트너
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {strategicPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.link}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-xl p-4 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-lg ${partner.bgColor} flex items-center justify-center`}>
                    {getCompanyLogo(partner.name, "md") || <span className={`${partner.textColor} font-bold text-xs`}>{partner.initials}</span>}
                  </div>
                  <span className="text-white font-medium text-sm group-hover:text-emerald-400 transition-colors">
                    {partner.name}
                  </span>
                </div>
                <div className="text-white/50 text-xs">{partner.role}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Enterprise Collaborators */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Building2 className="h-6 w-6 text-emerald-400" />
            엔터프라이즈 협력사
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {enterpriseCollaborators.map((company) => (
              <a
                key={company.name}
                href={company.link}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-xl p-5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${company.bgColor} flex items-center justify-center`}>
                    {getCompanyLogo(company.name, "md") || <span className={`${company.textColor} font-bold text-sm`}>{company.initials}</span>}
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                      {company.name}
                    </h3>
                  </div>
                </div>
                <div className="inline-block bg-white/10 rounded-full px-2 py-0.5 text-xs text-white/70 mb-3">
                  {company.integration}
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  {company.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Official SDKs */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Code className="h-6 w-6 text-emerald-400" />
            공식 SDK
          </h2>

          <div className="space-y-4">
            {/* TypeScript */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <TypeScriptIcon /> TypeScript / JavaScript
                </h3>
                <a
                  href="https://github.com/coinbase/x402"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
              <p className="text-white/60 text-sm mb-4">
                가장 완성도 높은 SDK입니다. 클라이언트, 서버, 프레임워크 통합을 모두 지원합니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="text-white/50"># 코어 패키지</div>
                <div className="text-emerald-400">npm install @x402/core @x402/evm @x402/svm</div>
                <div className="text-white/50 mt-3"># 서버 프레임워크</div>
                <div className="text-emerald-400">npm install @x402/express @x402/next @x402/hono</div>
                <div className="text-white/50 mt-3"># 클라이언트</div>
                <div className="text-emerald-400">npm install @x402/fetch @x402/axios @x402/paywall</div>
              </div>
            </div>

            {/* Python */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <PythonIcon /> Python
                </h3>
                <a
                  href="https://pypi.org/project/x402/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  PyPI
                </a>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Python 3.10 이상 지원. FastAPI, Flask, httpx, requests 통합을 제공합니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-xs">
                <div className="text-emerald-400">pip install x402</div>
                <div className="text-white/50 mt-2"># FastAPI, Flask, httpx, requests 미들웨어 포함</div>
              </div>
            </div>

            {/* Go */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <GoIcon /> Go
                </h3>
                <a
                  href="https://github.com/coinbase/x402/tree/main/go"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-sm"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
              <p className="text-white/60 text-sm mb-4">
                Go 언어 SDK. 고성능 서버 구현에 적합합니다.
              </p>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-xs">
                <div className="text-emerald-400">go get github.com/coinbase/x402/go</div>
              </div>
            </div>
          </div>
        </section>

        {/* Facilitators & Infrastructure */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Building2 className="h-6 w-6 text-emerald-400" />
            퍼실리테이터 및 인프라
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {infrastructureProjects.map((project) => (
              <div key={project.name} className="glass rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${project.bgColor} flex items-center justify-center`}>
                    {getCompanyLogo(project.name, "md") || <span className={`${project.textColor} font-bold text-sm`}>{project.initials}</span>}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{project.name}</h3>
                    <span className="text-white/50 text-xs">{project.type}</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-3 leading-relaxed">
                  {project.description}
                </p>
                {project.stats && (
                  <div className="inline-block bg-emerald-500/20 text-emerald-400 rounded-full px-2 py-0.5 text-xs mb-3">
                    {project.stats}
                  </div>
                )}
                <div className="space-y-1.5 text-sm">
                  {project.networks !== "-" && (
                    <div className="flex justify-between text-white/70">
                      <span>지원 네트워크</span>
                      <span className="text-emerald-400">{project.networks}</span>
                    </div>
                  )}
                  {project.tokens !== "-" && (
                    <div className="flex justify-between text-white/70">
                      <span>지원 토큰</span>
                      <span className="text-emerald-400">{project.tokens}</span>
                    </div>
                  )}
                </div>
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm mt-3"
                  >
                    웹사이트 <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Developer Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Wrench className="h-6 w-6 text-emerald-400" />
            개발자 도구
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {developerTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-xl p-5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="bg-white/10 rounded-full px-2 py-0.5 text-xs text-white/50">
                    {tool.type}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Supported Networks */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Layers className="h-6 w-6 text-emerald-400" />
            지원 네트워크
          </h2>

          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/50 border-b border-white/10 bg-white/5">
                  <th className="text-left py-3 px-4">네트워크</th>
                  <th className="text-left py-3 px-4">CAIP-2 ID</th>
                  <th className="text-left py-3 px-4">토큰</th>
                  <th className="text-left py-3 px-4">상태</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                {supportedNetworks.map((network, index) => (
                  <tr
                    key={network.name}
                    className={index < supportedNetworks.length - 1 ? "border-b border-white/5" : ""}
                  >
                    <td className="py-3 px-4 font-medium text-white">{network.name}</td>
                    <td className="py-3 px-4 font-mono text-xs">{network.caipId}</td>
                    <td className="py-3 px-4">{network.token}</td>
                    <td className="py-3 px-4">
                      {network.status === "active" && (
                        <span className="text-emerald-400">✓ 활성</span>
                      )}
                      {network.status === "partial" && (
                        <span className="text-amber-400">◐ 일부</span>
                      )}
                      {network.status === "upcoming" && (
                        <span className="text-blue-400">○ 예정</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Globe className="h-6 w-6 text-emerald-400" />
            활용 사례
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase) => {
              const IconComponent = useCase.icon;
              return (
                <div key={useCase.title} className="glass rounded-xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">{useCase.title}</h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed">
                    {useCase.description}
                  </p>
                  <div className="bg-black/30 rounded-lg p-3 text-xs">
                    <span className="text-emerald-400">예시: </span>
                    <span className="text-white/50">{useCase.example}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
            <Globe className="h-6 w-6 text-emerald-400" />
            리소스
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://docs.cdp.coinbase.com/x402/welcome"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  공식 문서
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">Coinbase Developer Platform x402 문서</p>
            </a>

            <a
              href="https://github.com/coinbase/x402"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  GitHub 저장소
                </h3>
                <Github className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">공식 SDK 및 예제 코드</p>
            </a>

            <a
              href="https://x402.gitbook.io/x402"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  x402 스펙
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">프로토콜 명세서</p>
            </a>

            <a
              href="https://developers.cloudflare.com/agents/x402/"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  Cloudflare 가이드
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">Cloudflare Workers 구현 가이드</p>
            </a>

            <a
              href="https://www.x402.org/ecosystem"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  x402.org 생태계
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">커뮤니티 생태계 포털</p>
            </a>

            <a
              href="https://solana.com/x402/what-is-x402"
              target="_blank"
              rel="noreferrer"
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium group-hover:text-emerald-400 transition-colors">
                  Solana x402 가이드
                </h3>
                <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-white/50 text-sm mt-2">Solana 네트워크 통합 가이드</p>
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-4">학습을 완료했습니다!</h2>
          <p className="text-white/60 mb-6">
            이제 데모를 통해 x402가 실제로 어떻게 작동하는지 확인해보세요.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
              <Link href="/demo/visualizer">
                결제 플로우 시각화
              </Link>
            </Button>
            <Button variant="outline" className="border-white/20 text-white" asChild>
              <Link href="/demo/paywall">
                페이월 체험
              </Link>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn/usdc-transfer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              USDC 가스리스 전송
            </Link>
          </Button>
          <Button variant="outline" className="border-white/20 text-white" asChild>
            <Link href="/learn">
              학습 목록으로
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
