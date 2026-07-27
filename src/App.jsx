import './App.css'
import resumePdf from './assets/Resume_2026.pdf'

const projects = [
  {
    name: 'HipDeck',
    description:
      'A digital signage platform used by small businesses and restaurants, as well as a few one-off enterprise clients like Hilton & Chic-Fil-A.',
    stack: [],
    url: 'https://hipdeck.co',
  },
  {
    name: 'Purple MPOS',
    description:
      'Contributed to enterprise POS architecture and payment workflows with Stripe Terminal and Clover integrations.',
    stack: ['POS', 'Stripe Terminal', 'Clover', 'Payments'],
    url: 'https://mpos.purple.com',
  },
  {
    name: 'Purple.com',
    description:
      'Contributed to Purple.com and adjacent retail systems supporting a vertically integrated commerce stack.',
    stack: ['Drupal', 'Commerce', 'CI/CD'],
    url: 'https://purple.com',
  },
  {
    name: 'Solle Naturals',
    description:
      'Contributed to Solle Naturals e-commerce platform and adjacent retail systems supporting a vertically integrated commerce stack.',
    stack: ['Shopify', 'Commerce', 'CI/CD'],
    url: 'https://sollenaturals.com',   
  },
  {
    name: 'BranchOps',
    description:
      '',
    stack: ['Operations', 'Web App'],
    url: 'https://branchops.com',
  },
]

const experience = [
  {
    role: 'Software Engineer III',
    company: 'Purple Innovation (2022–Present)',
    summary:
      'Architected a vertically integrated POS platform, delivered React/TypeScript/Node.js applications, and supported approximately $2M in annual operational savings.',
  },
  {
    role: 'Founder & Software Engineer',
    company: 'HipDeck (2021–Present)',
    summary:
      'Designed and built multi-tenant SaaS architecture with authentication, real-time systems, cloud infrastructure, and payment integrations.',
  },
  {
    role: 'Full Stack Software Engineer',
    company: 'Solle Naturals',
    summary:
      'Improved onboarding flows that contributed to roughly 15% downstream revenue growth while shipping commerce tooling.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Bluehost',
    summary:
      'Built React components for the Bluebird design system and maintained strong automated test coverage.',
  },
]

const highlights = [
  'Multi-tenant SaaS architecture',
  'React, TypeScript, Node.js',
  'MySQL, Redis, WebSockets',
  'AWS, DigitalOcean, CI/CD',
  'Stripe, Stripe Terminal, Clover',
  'Auth0, OAuth 2.0, API integrations',
]

function App() {
  return (
    <div className="page">
      <header className="hero">
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <p className="eyebrow">Software Engineer</p>
        <h1>Todd Froisland</h1>
        <p className="intro">
          Senior full stack software engineer and technical founder building
          enterprise retail software, production SaaS platforms, payment systems,
          and cloud infrastructure.
        </p>
        <div className="hero-cta">
          <a href="#projects">View Projects</a>
          <a href="https://www.linkedin.com/in/todd-froisland-14b960138/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={resumePdf} download="Todd_Froisland_Resume_2026.pdf">
            Download Resume
          </a>
        </div>
      </header>

      <main>
        <section id="about" className="card section">
          <h2>About Me</h2>
          <p>
            I build software end-to-end: architecture, APIs, front-end products,
            authentication, and real-time systems. I focus on practical execution,
            strong product ownership, and measurable business impact.
          </p>
          <ul className="highlights" aria-label="Technical highlights">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="grid projects-grid">
            {projects.map((project) => (
              <article key={project.name} className="card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                  Visit Site
                </a>
                <ul className="tags" aria-label={`${project.name} tech stack`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <h2>Experience</h2>
          <div className="grid experience-grid">
            {experience.map((job) => (
              <article key={job.company} className="card">
                <h3>{job.role}</h3>
                <p className="muted">{job.company}</p>
                <p>{job.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="section card contact">
        <h2>Contact</h2>
        <p>Let&apos;s connect and build something meaningful.</p>
        <div className="hero-cta">
          <a href="https://github.com/todd-froisland" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/todd-froisland-14b960138/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={resumePdf} download="Todd_Froisland_Resume_2026.pdf">
            Download Resume
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
