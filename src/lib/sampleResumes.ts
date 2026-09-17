export interface SampleResumeItem {
  id: string;
  label: string;
  role: string;
  experienceYears: string;
  text: string;
}

export const SAMPLE_RESUMES: SampleResumeItem[] = [
  {
    id: "fullstack-sr",
    label: "Senior Full Stack Engineer",
    role: "Full Stack Engineer",
    experienceYears: "5+ Years",
    text: `ALEX RIVERA
San Francisco, CA | alex.rivera@email.com | +1 (555) 234-5678 | linkedin.com/in/alexrivera-dev | github.com/arivera-code

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 5+ years of experience designing high-scale cloud platforms, distributed microservices, and reactive frontend architectures. Proven track record improving application response time by 40% and deploying mission-critical systems supporting 200,000+ daily active users.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, SQL, HTML5, CSS3
Frontend: React, Next.js, Redux, Tailwind CSS, Responsive Design, WebSockets
Backend: Node.js, Express.js, FastAPI, RESTful APIs, Microservices, gRPC
Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, Lambda, ECS, RDS), Docker, Kubernetes, CI/CD, GitHub Actions

WORK EXPERIENCE
Senior Full Stack Developer | Apex Cloud Technologies, Austin, TX | Jan 2022 – Present
• Architected scalable web dashboard with React, Next.js, and TypeScript, serving over 150,000 enterprise customers with 99.98% uptime.
• Engineered 22+ RESTful microservices in Node.js and PostgreSQL, decreasing API latency by 35% through Redis caching layers.
• Streamlined CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle time from 4 days to 45 minutes.
• Mentored 6 junior engineers through code reviews, architectural workshops, and pair programming sessions.

Software Engineer | Stellar Systems Inc, San Francisco, CA | Jun 2019 – Dec 2021
• Developed responsive user interface components with React and Tailwind CSS, increasing mobile user conversion by 28%.
• Optimized complex SQL queries and database schemas in PostgreSQL, cutting query execution time by 52%.
• Collaborated in an agile scrum team with product managers and UI/UX designers to deliver 8 major quarterly features.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2015 – 2019

CERTIFICATIONS
• AWS Certified Solutions Architect - Associate`
  },
  {
    id: "devops-lead",
    label: "Cloud & DevOps Engineer",
    role: "DevOps Engineer",
    experienceYears: "4+ Years",
    text: `JORDAN CHEN
Seattle, WA | jordan.chen.cloud@email.com | +1 (206) 876-5432 | github.com/jordan-infra | linkedin.com/in/chen-cloud

SUMMARY
DevOps and Site Reliability Engineer specializing in Kubernetes cluster orchestration, multi-region AWS cloud infrastructure, and automated zero-downtime CI/CD pipelines.

CORE COMPETENCIES
Cloud & Containerization: AWS, Google Cloud (GCP), Docker, Kubernetes, Helm, Terraform
CI/CD & Automation: GitHub Actions, Jenkins, Ansible, Python, Bash, Linux
Monitoring & Security: Prometheus, Grafana, Datadog, ELK Stack, Nginx

PROFESSIONAL EXPERIENCE
DevOps Engineer | CloudScale Networks, Seattle, WA | Mar 2021 – Present
• Managed and automated multi-cluster Kubernetes deployments on AWS EKS across 3 availability zones, maintaining 99.99% service availability.
• Formulated Infrastructure-as-Code modules using Terraform, cutting cloud infrastructure provisioning duration by 60%.
• Implemented Prometheus and Grafana alerting systems, reducing mean time to detect (MTTD) outages by 45%.
• Automated Docker image security vulnerability scanning with Trivy in GitHub Actions CI/CD workflows.

Systems Administrator | Northwest Data Corp, Portland, OR | Aug 2019 – Feb 2021
• Administered 80+ Linux production servers with automated Ansible configuration playbooks.
• Configured Nginx reverse proxies, SSL certificates, and firewall security policies across internal networks.

EDUCATION
Bachelor of Science in Information Technology
University of Washington | 2015 – 2019`
  }
];
