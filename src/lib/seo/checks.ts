export type Severity = "error" | "warning" | "notice";

export const checks = {
  http4xx: { severity: "error", title: "4XX status code", description: "Pages returned a 4XX client error." },
  http5xx: { severity: "error", title: "5XX status code", description: "Pages returned a 5XX server error." },
  brokenInternalLink: { severity: "error", title: "Broken internal link", description: "Internal links point to pages that return an error." },
  duplicateTitle: { severity: "error", title: "Duplicate title tag", description: "Several pages share the same title tag." },
  duplicateDescription: { severity: "error", title: "Duplicate meta description", description: "Several pages share the same meta description." },
  missingTitle: { severity: "error", title: "Missing title tag", description: "Pages have no title tag." },
  fetchFailed: { severity: "error", title: "Page couldn't be crawled", description: "The page timed out or the connection failed." },
  missingDescription: { severity: "warning", title: "Missing meta description", description: "Pages have no meta description." },
  missingH1: { severity: "warning", title: "Missing h1 heading", description: "Pages have no h1 heading." },
  titleTooLong: { severity: "warning", title: "Title tag too long", description: "Title tags are longer than 70 characters." },
  lowWordCount: { severity: "warning", title: "Low text-to-HTML ratio", description: "Pages have fewer than 200 words of text." },
  missingAlt: { severity: "warning", title: "Images without alt attributes", description: "Images are missing alt text." },
  slowPage: { severity: "warning", title: "Slow page load speed", description: "The HTML took longer than 1.5 seconds to load." },
  temporaryRedirect: { severity: "warning", title: "Temporary redirect", description: "Pages use 302 or 307 redirects." },
  redirectChain: { severity: "warning", title: "Redirect chain", description: "Redirects lead to another redirect." },
  mixedContent: { severity: "warning", title: "Mixed content", description: "HTTPS pages load resources over HTTP." },
  notSecure: { severity: "warning", title: "Page not served over HTTPS", description: "Internal pages are served over HTTP." },
  multipleH1: { severity: "notice", title: "Multiple h1 tags", description: "Pages have more than one h1 heading." },
  noindex: { severity: "notice", title: "Page blocked from indexing", description: "Pages have a noindex robots directive." },
  deepPage: { severity: "notice", title: "Page crawl depth more than 3 clicks", description: "Pages need more than 3 clicks from the homepage." },
  permanentRedirect: { severity: "notice", title: "Permanent redirect", description: "Pages use 301 or 308 redirects." },
  blockedByRobots: { severity: "notice", title: "Blocked from crawling", description: "robots.txt blocks these URLs." },
  titleTooShort: { severity: "notice", title: "Title tag too short", description: "Title tags are shorter than 30 characters." },
} satisfies Record<string, { severity: Severity; title: string; description: string }>;

export type CheckId = keyof typeof checks;
