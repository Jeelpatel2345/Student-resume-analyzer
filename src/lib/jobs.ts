export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  location: string;
  country: "USA" | "Canada" | "UK" | "Germany" | "Australia" | "Worldwide Remote";
  countryCode: string; // US, CA, GB, DE, AU, GLOBAL
  workType: "Remote" | "Hybrid" | "On-site";
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experienceLevel: "Entry Level" | "Mid Level" | "Senior" | "Lead / Staff";
  salary: string;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  matchScore: number;
  description: string;
  applyUrl: string;
  source: "LinkedIn" | "Indeed" | "RemoteOK" | "Company ATS" | "Jobicy";
  postedAt: string;
  postedHoursAgo: number;
  visaSponsored?: boolean;
}

export interface CompanySpotlight {
  company: string;
  companyLogo?: string;
  companyWebsite?: string;
  location: string;
  country: string;
  countryCode: string;
  openRolesCount: number;
  avgMatchScore: number;
  highestMatchScore: number;
  roles: JobOpportunity[];
  topSkills: string[];
  careersUrl: string;
  visaSponsoredAvailable: boolean;
}

export interface JobFilterOptions {
  country?: string;
  workType?: string;
  employmentType?: string;
  experienceLevel?: string;
  datePosted?: string; // "24h" | "week" | "month" | "ALL"
  roleQuery?: string;
}

// Global tech companies hiring in USA, Canada, UK, Germany, etc.
export const GLOBAL_JOB_CATALOG: Omit<JobOpportunity, "matchedSkills" | "missingSkills" | "matchScore">[] = [
  // USA Opportunities
  {
    id: "us-1",
    title: "Senior Full Stack Engineer",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces",
    companyWebsite: "https://stripe.com",
    location: "San Francisco, CA / Remote (US)",
    country: "USA",
    countryCode: "US",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$165,000 - $210,000 USD",
    requiredSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "System Design"],
    description: "Build high-reliability financial infrastructure and developer APIs used by millions of internet businesses worldwide.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Stripe+Full+Stack+Engineer",
    source: "LinkedIn",
    postedAt: "1 day ago",
    postedHoursAgo: 24,
    visaSponsored: true
  },
  {
    id: "us-1b",
    title: "Junior Software Engineer (New Grad / 0-2 yrs)",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=faces",
    companyWebsite: "https://stripe.com",
    location: "Seattle, WA (Hybrid)",
    country: "USA",
    countryCode: "US",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salary: "$120,000 - $145,000 USD",
    requiredSkills: ["JavaScript", "Python", "SQL", "Git", "RESTful APIs", "React"],
    description: "Kickstart your career on Stripe's core payments infrastructure. High mentorship, rapid growth, and modern developer tooling.",
    applyUrl: "https://stripe.com/jobs",
    source: "Company ATS",
    postedAt: "8 hours ago",
    postedHoursAgo: 8,
    visaSponsored: true
  },
  {
    id: "us-2",
    title: "Cloud DevOps & Platform Engineer",
    company: "Datadog",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
    companyWebsite: "https://datadoghq.com",
    location: "New York, NY / Remote (US)",
    country: "USA",
    countryCode: "US",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$150,000 - $195,000 USD",
    requiredSkills: ["Kubernetes", "Docker", "AWS", "Terraform", "Go", "CI/CD", "Linux"],
    description: "Scale distributed observability pipelines processing petabytes of telemetry data daily across multi-cloud environments.",
    applyUrl: "https://www.indeed.com/jobs?q=Datadog+DevOps+Engineer",
    source: "Indeed",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: true
  },
  {
    id: "us-3",
    title: "Staff Backend Engineer (Distributed Systems)",
    company: "Cloudflare",
    companyLogo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop",
    companyWebsite: "https://cloudflare.com",
    location: "Austin, TX / Remote",
    country: "USA",
    countryCode: "US",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Lead / Staff",
    salary: "$180,000 - $230,000 USD",
    requiredSkills: ["Rust", "Go", "Distributed Systems", "Linux", "Docker", "RESTful APIs"],
    description: "Develop global edge network caching, security services, and high-performance routing protocols.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Cloudflare+Backend+Engineer",
    source: "LinkedIn",
    postedAt: "Just now",
    postedHoursAgo: 2,
    visaSponsored: true
  },
  {
    id: "us-4",
    title: "Frontend Architect & Next.js Core",
    company: "Vercel",
    companyWebsite: "https://vercel.com",
    location: "San Francisco, CA / Remote",
    country: "USA",
    countryCode: "US",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$170,000 - $215,000 USD",
    requiredSkills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GraphQL", "Performance Optimization"],
    description: "Pioneer the next generation of web development tooling and cloud platform interfaces used by top enterprise teams.",
    applyUrl: "https://vercel.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 72,
    visaSponsored: false
  },
  {
    id: "us-5",
    title: "Software Engineer Intern (Fall / Summer)",
    company: "Vercel",
    companyWebsite: "https://vercel.com",
    location: "Remote (US/Global)",
    country: "USA",
    countryCode: "US",
    workType: "Remote",
    employmentType: "Internship",
    experienceLevel: "Entry Level",
    salary: "$45 - $60 / hr USD",
    requiredSkills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Git"],
    description: "Paid engineering internship working directly on Next.js documentation, open-source SDKs, and developer dashboard UI.",
    applyUrl: "https://vercel.com/careers",
    source: "Company ATS",
    postedAt: "12 hours ago",
    postedHoursAgo: 12,
    visaSponsored: false
  },

  // Canada Opportunities
  {
    id: "ca-1",
    title: "Senior Backend Developer",
    company: "Shopify",
    companyWebsite: "https://shopify.com",
    location: "Toronto, ON / Remote (Canada)",
    country: "Canada",
    countryCode: "CA",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$140,000 - $175,000 CAD",
    requiredSkills: ["Ruby on Rails", "Go", "PostgreSQL", "Redis", "Kafka", "Docker"],
    description: "Power commerce for millions of global merchants during flash sales and high-concurrency peak traffic.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Shopify+Senior+Backend+Developer",
    source: "LinkedIn",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: true
  },
  {
    id: "ca-2",
    title: "Full Stack Engineer (Growth & AI)",
    company: "Wealthsimple",
    companyWebsite: "https://wealthsimple.com",
    location: "Toronto, ON (Hybrid)",
    country: "Canada",
    countryCode: "CA",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$130,000 - $160,000 CAD",
    requiredSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Microservices"],
    description: "Empower Canadians to achieve financial freedom by creating modern, accessible wealth management applications.",
    applyUrl: "https://www.wealthsimple.com/en-ca/careers",
    source: "Company ATS",
    postedAt: "4 days ago",
    postedHoursAgo: 96,
    visaSponsored: true
  },
  {
    id: "ca-3",
    title: "DevOps & Cloud Infrastructure Specialist",
    company: "Hootsuite",
    companyWebsite: "https://hootsuite.com",
    location: "Vancouver, BC (On-site / Hybrid)",
    country: "Canada",
    countryCode: "CA",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$125,000 - $155,000 CAD",
    requiredSkills: ["AWS", "Terraform", "Kubernetes", "Docker", "CI/CD", "GitHub Actions"],
    description: "Modernize multi-region Kubernetes clusters and automated infrastructure for social media management enterprise suites.",
    applyUrl: "https://www.indeed.ca/jobs?q=Hootsuite+DevOps+Engineer",
    source: "Indeed",
    postedAt: "3 days ago",
    postedHoursAgo: 72,
    visaSponsored: false
  },
  {
    id: "ca-4",
    title: "Contract React Frontend Developer (Part-time)",
    company: "Shopify",
    companyWebsite: "https://shopify.com",
    location: "Remote (Canada)",
    country: "Canada",
    countryCode: "CA",
    workType: "Remote",
    employmentType: "Part-time",
    experienceLevel: "Mid Level",
    salary: "$65 - $85 CAD / hr",
    requiredSkills: ["React", "TypeScript", "GraphQL", "Tailwind CSS", "HTML5"],
    description: "Support specialized merchant dashboard customization and theme app extensions on a flexible part-time contract.",
    applyUrl: "https://shopify.com/careers",
    source: "Company ATS",
    postedAt: "1 day ago",
    postedHoursAgo: 20,
    visaSponsored: false
  },

  // UK Opportunities
  {
    id: "uk-1",
    title: "Senior Software Engineer (Core Banking)",
    company: "Monzo Bank",
    companyWebsite: "https://monzo.com",
    location: "London, UK / Remote (UK)",
    country: "UK",
    countryCode: "GB",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "£90,000 - £120,000 GBP",
    requiredSkills: ["Go", "Microservices", "PostgreSQL", "Kubernetes", "Docker", "AWS"],
    description: "Help build the banking app of the future handling billions in transactions with 2,000+ microservices in Go.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Monzo+Software+Engineer",
    source: "LinkedIn",
    postedAt: "1 day ago",
    postedHoursAgo: 22,
    visaSponsored: true
  },
  {
    id: "uk-2",
    title: "Full Stack Developer (Fintech Platform)",
    company: "Revolut",
    companyWebsite: "https://revolut.com",
    location: "London, UK (On-site)",
    country: "UK",
    countryCode: "GB",
    workType: "On-site",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "£85,000 - £115,000 GBP",
    requiredSkills: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"],
    description: "Architect borderless financial services, crypto tools, and global remittance engines for 35M+ customers.",
    applyUrl: "https://www.revolut.com/careers",
    source: "Company ATS",
    postedAt: "3 days ago",
    postedHoursAgo: 72,
    visaSponsored: true
  },
  {
    id: "uk-3",
    title: "Lead Frontend Engineer",
    company: "Wise",
    companyWebsite: "https://wise.com",
    location: "London, UK / Remote",
    country: "UK",
    countryCode: "GB",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Lead / Staff",
    salary: "£95,000 - £130,000 GBP",
    requiredSkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "Jest"],
    description: "Build money without borders. Craft lightning-fast, ultra-accessible interfaces that transfer money globally at fair exchange rates.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Wise+Frontend+Engineer",
    source: "LinkedIn",
    postedAt: "18 hours ago",
    postedHoursAgo: 18,
    visaSponsored: true
  },
  {
    id: "uk-4",
    title: "Junior Backend Engineer (Go / Microservices)",
    company: "Monzo Bank",
    companyWebsite: "https://monzo.com",
    location: "London, UK (Hybrid)",
    country: "UK",
    countryCode: "GB",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salary: "£55,000 - £70,000 GBP",
    requiredSkills: ["Go", "SQL", "Git", "RESTful APIs", "Docker", "Linux"],
    description: "Collaborate in a blameless engineering culture with paired programming and dedicated training for junior engineers.",
    applyUrl: "https://monzo.com/careers",
    source: "Company ATS",
    postedAt: "6 hours ago",
    postedHoursAgo: 6,
    visaSponsored: true
  },

  // Germany / Europe Opportunities
  {
    id: "de-1",
    title: "Senior Backend Engineer (Platform)",
    company: "Delivery Hero",
    companyWebsite: "https://deliveryhero.com",
    location: "Berlin, Germany / Hybrid",
    country: "Germany",
    countryCode: "DE",
    workType: "Hybrid",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€80,000 - €105,000 EUR",
    requiredSkills: ["Python", "FastAPI", "Go", "PostgreSQL", "Kubernetes", "GCP"],
    description: "Scale quick-commerce delivery dispatch systems orchestrating millions of orders across 70+ global markets.",
    applyUrl: "https://careers.deliveryhero.com",
    source: "Company ATS",
    postedAt: "5 days ago",
    postedHoursAgo: 120,
    visaSponsored: true
  },
  {
    id: "de-2",
    title: "Senior Full Stack Engineer",
    company: "Zalando",
    companyWebsite: "https://zalando.com",
    location: "Berlin, Germany / Remote (DE)",
    country: "Germany",
    countryCode: "DE",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "€85,000 - €110,000 EUR",
    requiredSkills: ["TypeScript", "React", "Node.js", "AWS", "Docker", "RESTful APIs"],
    description: "Create seamless e-commerce fashion discovery experiences serving over 50 million active European shoppers.",
    applyUrl: "https://www.linkedin.com/jobs/search/?keywords=Zalando+Full+Stack+Engineer",
    source: "LinkedIn",
    postedAt: "1 day ago",
    postedHoursAgo: 26,
    visaSponsored: true
  },
  {
    id: "de-3",
    title: "Cloud Infrastructure Specialist (Freelance / Contract)",
    company: "Delivery Hero",
    companyWebsite: "https://deliveryhero.com",
    location: "Berlin, Germany (On-site)",
    country: "Germany",
    countryCode: "DE",
    workType: "On-site",
    employmentType: "Contract",
    experienceLevel: "Mid Level",
    salary: "€75 - €95 / hr",
    requiredSkills: ["Kubernetes", "Terraform", "GCP", "Docker", "CI/CD"],
    description: "6-month contract upgrading delivery logistics observability and telemetry clusters.",
    applyUrl: "https://careers.deliveryhero.com",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 40,
    visaSponsored: false
  },

  // Worldwide Remote Opportunities
  {
    id: "global-1",
    title: "Senior Site Reliability Engineer",
    company: "GitLab",
    companyWebsite: "https://about.gitlab.com",
    location: "Remote - Anywhere Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$135,000 - $175,000 USD",
    requiredSkills: ["Kubernetes", "Linux", "Docker", "Terraform", "Go", "Prometheus", "CI/CD"],
    description: "Join the world's largest all-remote company. Ensure 99.99% uptime for the world's most widely used DevOps platform.",
    applyUrl: "https://about.gitlab.com/jobs/careers",
    source: "RemoteOK",
    postedAt: "4 hours ago",
    postedHoursAgo: 4,
    visaSponsored: false
  },
  {
    id: "global-2",
    title: "Full Stack Engineer (Open Source Database)",
    company: "Supabase",
    companyWebsite: "https://supabase.com",
    location: "Remote - Global",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Mid Level",
    salary: "$120,000 - $160,000 USD",
    requiredSkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Node.js", "Docker"],
    description: "Help build the open source Firebase alternative. Build dashboard features, auth flows, and edge function toolings.",
    applyUrl: "https://supabase.com/careers",
    source: "Company ATS",
    postedAt: "2 days ago",
    postedHoursAgo: 48,
    visaSponsored: false
  },
  {
    id: "global-3",
    title: "Senior Software Engineer (Distributed DB)",
    company: "Automattic",
    companyWebsite: "https://automattic.com",
    location: "Remote - Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    workType: "Remote",
    employmentType: "Full-time",
    experienceLevel: "Senior",
    salary: "$110,000 - $150,000 USD",
    requiredSkills: ["JavaScript", "TypeScript", "React", "PHP", "MySQL", "RESTful APIs"],
    description: "Democratize publishing and commerce. Work on WordPress.com, WooCommerce, and Tumblr from anywhere on Earth.",
    applyUrl: "https://automattic.com/work-with-us",
    source: "RemoteOK",
    postedAt: "4 days ago",
    postedHoursAgo: 96,
    visaSponsored: false
  },
  {
    id: "global-4",
    title: "Frontend Developer (Part-time / Remote)",
    company: "Supabase",
    companyWebsite: "https://supabase.com",
    location: "Remote - Worldwide",
    country: "Worldwide Remote",
    countryCode: "GLOBAL",
    workType: "Remote",
    employmentType: "Part-time",
    experienceLevel: "Entry Level",
    salary: "$50 - $70 / hr USD",
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5"],
    description: "Part-time frontend contributor assisting with Supabase docs, UI component libraries, and sample templates.",
    applyUrl: "https://supabase.com/careers",
    source: "Company ATS",
    postedAt: "10 hours ago",
    postedHoursAgo: 10,
    visaSponsored: false
  }
];

export async function matchJobsForResume(
  candidateSkills: string[],
  filters?: JobFilterOptions
): Promise<JobOpportunity[]> {
  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase());

  // Try fetching live public jobs from RemoteOK with a strict 3.5-second timeout
  let liveJobs: JobOpportunity[] = [];
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch("https://remoteok.com/api?tag=engineer", {
      signal: controller.signal,
      headers: { "User-Agent": "ResumePulse-Platform" }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // Skip index 0 which is legal metadata in RemoteOK
        const items = data.slice(1, 25);
        liveJobs = items
          .filter((item: any) => item && item.position && item.company)
          .map((item: any, idx: number) => {
            const rawLocation = item.location || "Remote - Worldwide";
            let country: JobOpportunity["country"] = "Worldwide Remote";
            let countryCode = "GLOBAL";

            if (/usa|united states|us\b/i.test(rawLocation)) {
              country = "USA";
              countryCode = "US";
            } else if (/canada|ca\b/i.test(rawLocation)) {
              country = "Canada";
              countryCode = "CA";
            } else if (/uk|united kingdom|london|great britain/i.test(rawLocation)) {
              country = "UK";
              countryCode = "GB";
            } else if (/germany|berlin|deutschland/i.test(rawLocation)) {
              country = "Germany";
              countryCode = "DE";
            }

            const tags: string[] = Array.isArray(item.tags) ? item.tags : ["Engineering", "Remote"];
            const posLower = (item.position || "").toLowerCase();

            // Infer experience level
            let experienceLevel: JobOpportunity["experienceLevel"] = "Mid Level";
            if (posLower.includes("senior") || posLower.includes("sr.") || posLower.includes("principal")) {
              experienceLevel = "Senior";
            } else if (posLower.includes("lead") || posLower.includes("staff") || posLower.includes("head") || posLower.includes("architect")) {
              experienceLevel = "Lead / Staff";
            } else if (posLower.includes("junior") || posLower.includes("jr") || posLower.includes("entry") || posLower.includes("intern") || posLower.includes("associate")) {
              experienceLevel = "Entry Level";
            }

            // Infer employment type
            let employmentType: JobOpportunity["employmentType"] = "Full-time";
            if (posLower.includes("intern") || tags.some(t => t.toLowerCase().includes("intern"))) {
              employmentType = "Internship";
            } else if (posLower.includes("part-time") || posLower.includes("part time") || tags.some(t => t.toLowerCase().includes("part-time"))) {
              employmentType = "Part-time";
            } else if (posLower.includes("contract") || posLower.includes("freelance") || tags.some(t => t.toLowerCase().includes("contract"))) {
              employmentType = "Contract";
            }

            // Estimate posted hours ago (RemoteOK items are ordered latest first)
            const hoursAgo = Math.max(1, (idx * 3) + 2);
            let postedAt = `${hoursAgo} hours ago`;
            if (hoursAgo >= 24) {
              const days = Math.floor(hoursAgo / 24);
              postedAt = days === 1 ? "1 day ago" : `${days} days ago`;
            }

            return {
              id: `remoteok-${item.id || idx}`,
              title: item.position,
              company: item.company,
              companyLogo: item.company_logo || undefined,
              companyWebsite: item.url || `https://${item.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
              location: rawLocation,
              country,
              countryCode,
              workType: "Remote" as const,
              employmentType,
              experienceLevel,
              salary: item.salary || "$115,000 - $165,000 USD",
              requiredSkills: tags.slice(0, 6),
              matchedSkills: [],
              missingSkills: [],
              matchScore: 0,
              description: (item.description || item.position).replace(/<[^>]*>?/gm, "").slice(0, 240) + "...",
              applyUrl: item.url || item.apply_url || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(item.company + " " + item.position)}`,
              source: "RemoteOK" as const,
              postedAt,
              postedHoursAgo: hoursAgo,
              visaSponsored: false
            };
          });
      }
    }
  } catch (err) {
    // Graceful fallback to rich catalog if API is unavailable
  }

  // Combine curated international catalog with live feed
  const allOpportunities = [...GLOBAL_JOB_CATALOG, ...liveJobs];

  // Calculate Match Score for each job based on candidate's skills
  const scoredJobs: JobOpportunity[] = allOpportunities.map(job => {
    const matched: string[] = [];
    const missing: string[] = [];

    job.requiredSkills.forEach(reqSkill => {
      const isMatched = normalizedCandidateSkills.some(candSkill =>
        candSkill.includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(candSkill)
      );

      if (isMatched) {
        matched.push(reqSkill);
      } else {
        missing.push(reqSkill);
      }
    });

    // Score calculation
    let matchScore = 50;
    if (job.requiredSkills.length > 0) {
      matchScore = Math.round((matched.length / job.requiredSkills.length) * 100);
      // Give a slight boost if candidate has overall strong tech breadth
      if (candidateSkills.length >= 8 && matchScore >= 40) {
        matchScore = Math.min(98, matchScore + 10);
      }
    }

    return {
      ...job,
      matchedSkills: matched,
      missingSkills: missing,
      matchScore
    };
  });

  // Filter based on user selections
  let results = scoredJobs;

  // 1. Country filter
  if (filters?.country && filters.country !== "ALL") {
    results = results.filter(j => 
      j.country.toLowerCase() === filters.country!.toLowerCase() || 
      (filters.country === "Remote" && j.workType === "Remote")
    );
  }

  // 2. Work Location Type filter (Remote, Hybrid, On-site)
  if (filters?.workType && filters.workType !== "ALL") {
    results = results.filter(j => j.workType.toLowerCase() === filters.workType!.toLowerCase());
  }

  // 3. Employment Type filter (Full-time, Part-time, Contract, Internship)
  if (filters?.employmentType && filters.employmentType !== "ALL") {
    results = results.filter(j => j.employmentType.toLowerCase() === filters.employmentType!.toLowerCase());
  }

  // 4. Experience Level filter (Entry Level, Mid Level, Senior, Lead / Staff)
  if (filters?.experienceLevel && filters.experienceLevel !== "ALL") {
    results = results.filter(j => {
      const el = j.experienceLevel.toLowerCase();
      const target = filters.experienceLevel!.toLowerCase();
      if (target.includes("entry")) return el.includes("entry");
      if (target.includes("mid")) return el.includes("mid");
      if (target.includes("senior")) return el.includes("senior");
      if (target.includes("lead") || target.includes("staff")) return el.includes("lead") || el.includes("staff");
      return el === target;
    });
  }

  // 5. Date Posted filter (24h, week, month)
  if (filters?.datePosted && filters.datePosted !== "ALL") {
    if (filters.datePosted === "24h") {
      results = results.filter(j => j.postedHoursAgo <= 24);
    } else if (filters.datePosted === "week" || filters.datePosted === "7d") {
      results = results.filter(j => j.postedHoursAgo <= 168); // 7 * 24 = 168 hours
    } else if (filters.datePosted === "month" || filters.datePosted === "30d") {
      results = results.filter(j => j.postedHoursAgo <= 720); // 30 * 24 = 720 hours
    }
  }

  // 6. Role & Keyword search query
  if (filters?.roleQuery) {
    const q = filters.roleQuery.toLowerCase();
    results = results.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
      j.location.toLowerCase().includes(q)
    );
  }

  // Sort descending by Match Score
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

// Group jobs by company in real-time to generate Company Spotlights
export function getHiringCompanies(jobs: JobOpportunity[]): CompanySpotlight[] {
  const map = new Map<string, {
    company: string;
    companyLogo?: string;
    companyWebsite?: string;
    location: string;
    country: string;
    countryCode: string;
    roles: JobOpportunity[];
    skillsSet: Set<string>;
    visaSponsored: boolean;
  }>();

  for (const job of jobs) {
    const key = job.company.toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, {
        company: job.company,
        companyLogo: job.companyLogo,
        companyWebsite: job.companyWebsite || job.applyUrl,
        location: job.location,
        country: job.country,
        countryCode: job.countryCode,
        roles: [],
        skillsSet: new Set(),
        visaSponsored: false
      });
    }

    const entry = map.get(key)!;
    entry.roles.push(job);
    job.requiredSkills.forEach(s => entry.skillsSet.add(s));
    if (job.visaSponsored) entry.visaSponsored = true;
  }

  const spotlights: CompanySpotlight[] = [];

  map.forEach((value) => {
    const totalScore = value.roles.reduce((acc, r) => acc + r.matchScore, 0);
    const avgMatchScore = Math.round(totalScore / value.roles.length);
    const highestMatchScore = Math.max(...value.roles.map(r => r.matchScore));

    spotlights.push({
      company: value.company,
      companyLogo: value.companyLogo,
      companyWebsite: value.companyWebsite,
      location: value.location,
      country: value.country,
      countryCode: value.countryCode,
      openRolesCount: value.roles.length,
      avgMatchScore,
      highestMatchScore,
      roles: value.roles,
      topSkills: Array.from(value.skillsSet).slice(0, 6),
      careersUrl: value.roles[0]?.applyUrl || `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(value.company)}`,
      visaSponsoredAvailable: value.visaSponsored
    });
  });

  // Sort companies by highest match score and open roles count
  return spotlights.sort((a, b) => {
    if (b.highestMatchScore !== a.highestMatchScore) {
      return b.highestMatchScore - a.highestMatchScore;
    }
    return b.openRolesCount - a.openRolesCount;
  });
}
