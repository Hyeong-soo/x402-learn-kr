const BASE_URL = "https://x402-learn-kr.vercel.app";

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  imageUrl?: string;
  section?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished = "2024-01-01",
  dateModified,
  imageUrl,
  section = "Technology",
}: ArticleSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || new Date().toISOString().split("T")[0],
    image: imageUrl || `${BASE_URL}/learn/opengraph-image`,
    author: {
      "@type": "Organization",
      name: "x402-learn-kr",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "x402-learn-kr",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: section,
    inLanguage: "ko-KR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider?: string;
  courseCode?: string;
  url: string;
}

export function CourseSchema({
  name,
  description,
  provider = "x402-learn-kr",
  courseCode,
  url,
}: CourseSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: BASE_URL,
    },
    url: url,
    inLanguage: "ko-KR",
    ...(courseCode && { courseCode }),
    coursePrerequisites: "None",
    educationalLevel: "Beginner to Intermediate",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
