import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
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
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [showScrollHint, setShowScrollHint] = useState(false)
  const heroRef = useRef(null)

  const openChat = () => setChatOpen(true)
  const closeChat = () => setChatOpen(false)

  useEffect(() => {
    const OVERSCROLL_TRIGGER_DEPTH = 420
    const OVERSCROLL_RESET_MS = 240
    const HANDOFF_COOLDOWN_MS = 700

    let overscrollDepth = 0
    let resetTimer
    let cooldownTimer
    let handoffCoolingDown = false

    const resetOverscrollDepth = () => {
      overscrollDepth = 0
      window.clearTimeout(resetTimer)
    }

    const handleWheel = (event) => {
      if (chatOpen) {
        return
      }

      if (event.deltaY <= 0) {
        resetOverscrollDepth()
        return
      }

      const hero = heroRef.current

      if (!hero) {
        return
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight
      const heroHandoffZoneEnd = heroBottom - window.innerHeight
      const isInHeroRange = window.scrollY <= heroHandoffZoneEnd + 8

      if (!isInHeroRange) {
        resetOverscrollDepth()
        return
      }

      event.preventDefault()
      if (handoffCoolingDown) {
        return
      }

      overscrollDepth += Math.max(0, event.deltaY)

      window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => {
        overscrollDepth = 0
      }, OVERSCROLL_RESET_MS)

      if (overscrollDepth < OVERSCROLL_TRIGGER_DEPTH) {
        return
      }

      resetOverscrollDepth()
      handoffCoolingDown = true

      const aboutSection = document.getElementById('about')

      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      cooldownTimer = window.setTimeout(() => {
        handoffCoolingDown = false
      }, HANDOFF_COOLDOWN_MS)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.clearTimeout(resetTimer)
      window.clearTimeout(cooldownTimer)
    }
  }, [chatOpen])

  useEffect(() => {
    const hintTimer = window.setTimeout(() => {
      setShowScrollHint(true)
    }, 3000)

    return () => {
      window.clearTimeout(hintTimer)
    }
  }, [])

  return (
    <Box>
      <Box
        component="header"
        ref={heroRef}
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-end',
          px: { xs: 2, md: 5 },
          pb: { xs: 4, md: 6 },
          background: 'linear-gradient(180deg, #000000 0%, #060606 60%, #0d0d0d 100%)',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 58%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          component="nav"
          sx={{
            '@keyframes headerFadeDown': {
              '0%': {
                opacity: 0,
                transform: 'translateY(-16px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            px: { xs: 1, md: 3 },
            pt: { xs: 1, md: 1.5 },
            pb: { xs: 2, md: 2.5 },
            background: 'linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0) 100%)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
            gap: 1,
            alignItems: 'center',
            maxWidth: '100%',
            opacity: 0,
            transform: 'translateY(-16px)',
            animation: 'headerFadeDown 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards',
            '@media (prefers-reduced-motion: reduce)': {
              opacity: 1,
              transform: 'none',
              animation: 'none',
            },
          }}
        >
          <Typography
            component="a"
            href="#"
            sx={{
              color: 'grey.100',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              justifySelf: { xs: 'center', md: 'start' },
            }}
          >
            Todd Froisland
          </Typography>

          <TextField
            size="small"
            placeholder="Ask AI about Todd"
            variant="outlined"
            onFocus={(event) => {
              event.target.blur()
              openChat()
            }}
            onClick={openChat}
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <AutoAwesomeRoundedIcon
                      sx={{
                        fontSize: 18,
                        color: 'rgba(226,232,240,0.95)',
                        filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))',
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              minWidth: { xs: '100%', sm: 280, md: 320 },
              justifySelf: 'center',
              '& .MuiOutlinedInput-root': {
                color: 'grey.100',
                backgroundColor: 'rgba(0,0,0,0.45)',
                '& fieldset': {
                  borderColor: 'rgba(203,213,225,0.35)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(226,232,240,0.65)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255,255,255,0.85)',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(226,232,240,0.85)',
                opacity: 1,
              },
            }}
          />

          <Stack direction="row" spacing={1} sx={{ justifySelf: { xs: 'center', md: 'end' }, flexWrap: 'wrap' }}>
            {[
              ['About', '#about'],
              ['Projects', '#projects'],
              ['Experience', '#experience'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <Button key={label} href={href} color="inherit" sx={{ color: 'grey.100' }}>
                {label}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 'min(84ch, 92vw)',
            '@keyframes heroFadeUp': {
              '0%': {
                opacity: 0,
                transform: 'translateY(24px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
            '& > *': {
              opacity: 0,
              transform: 'translateY(24px)',
              animation: 'heroFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
            },
            '& > :nth-of-type(2)': {
              animationDelay: '110ms',
            },
            '& > :nth-of-type(3)': {
              animationDelay: '220ms',
            },
            '& > :nth-of-type(4)': {
              animationDelay: '330ms',
            },
            '@media (prefers-reduced-motion: reduce)': {
              '& > *': {
                opacity: 1,
                transform: 'none',
                animation: 'none',
              },
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'rgba(226,232,240,0.92)', letterSpacing: '0.12em' }}
          >
            Software Engineer
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 0.5,
              mb: 1,
              color: 'grey.50',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Todd Froisland
          </Typography>
          <Typography sx={{ maxWidth: '64ch', color: 'rgba(226,232,240,0.95)' }}>
            Senior full stack software engineer and technical founder building enterprise retail
            software, production SaaS platforms, payment systems, and cloud infrastructure.
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 3 }}>
            <Button href="#projects" variant="contained" color="primary">
              View Projects
            </Button>
            <Button
              href="https://www.linkedin.com/in/todd-froisland-14b960138/"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              sx={{ color: 'grey.50', borderColor: 'rgba(203,213,225,0.34)' }}
            >
              LinkedIn
            </Button>
            <Button
              href={resumePdf}
              download="Todd_Froisland_Resume_2026.pdf"
              variant="outlined"
              sx={{ color: 'grey.50', borderColor: 'rgba(203,213,225,0.34)' }}
            >
              Download Resume
            </Button>
          </Stack>
        </Box>

        {showScrollHint && (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: { xs: 16, md: 22 },
              transform: 'translateX(-50%)',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'rgba(226,232,240,0.86)',
              opacity: 0,
              '@keyframes scrollHintReveal': {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
              '@keyframes scrollHintBob': {
                '0%, 100%': { transform: 'translate(-50%, 0)' },
                '50%': { transform: 'translate(-50%, 6px)' },
              },
              animation:
                'scrollHintReveal 480ms ease forwards, scrollHintBob 1.6s ease-in-out 480ms infinite',
              '@media (prefers-reduced-motion: reduce)': {
                opacity: 1,
                animation: 'none',
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                mb: -0.2,
                color: 'rgba(226,232,240,0.82)',
              }}
            >
              Scroll down
            </Typography>
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 28 }} />
          </Box>
        )}
      </Box>

      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 }, py: 3 }}>
        <Card id="about" sx={{ borderRadius: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>
              About Me
            </Typography>
            <Typography>
              I build software end-to-end: architecture, APIs, front-end products, authentication,
              and real-time systems. I focus on practical execution, strong product ownership, and
              measurable business impact.
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
              {highlights.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Box id="projects" sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Projects
          </Typography>
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid key={project.name} size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: '100%', borderRadius: 1 }}>
                  <CardContent>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography sx={{ mt: 1 }}>{project.description || 'More details coming soon.'}</Typography>
                    <Link href={project.url} target="_blank" rel="noreferrer" underline="hover" sx={{ mt: 2, display: 'inline-block' }}>
                      Visit Site
                    </Link>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
                      {project.stack.map((item) => (
                        <Chip key={item} size="small" label={item} variant="outlined" />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box id="experience" sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Experience
          </Typography>
          <Grid container spacing={2}>
            {experience.map((job) => (
              <Grid key={job.company} size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100%', borderRadius: 1 }}>
                  <CardContent>
                    <Typography variant="h6">{job.role}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {job.company}
                    </Typography>
                    <Typography>{job.summary}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Card id="contact" sx={{ mt: 3, borderRadius: 1 }}>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 1.5 }}>
              Contact
            </Typography>
            <Typography>Let&apos;s connect and build something meaningful.</Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
              <Button href="https://github.com/todd-froisland" target="_blank" rel="noreferrer" variant="outlined">
                GitHub
              </Button>
              <Button
                href="https://www.linkedin.com/in/todd-froisland-14b960138/"
                target="_blank"
                rel="noreferrer"
                variant="outlined"
              >
                LinkedIn
              </Button>
              <Button href={resumePdf} download="Todd_Froisland_Resume_2026.pdf" variant="contained">
                Download Resume
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      <Modal
        open={chatOpen}
        onClose={closeChat}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
            },
          },
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <IconButton
            aria-label="Close chat overlay"
            onClick={closeChat}
            sx={{
              position: 'fixed',
              top: { xs: 14, md: 20 },
              left: { xs: 14, md: 20 },
              color: 'grey.100',
              backgroundColor: 'rgba(0,0,0,0.35)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.55)',
              },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <Box
            sx={{
              width: '100%',
              maxWidth: 900,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                alignSelf: 'flex-start',
                maxWidth: { xs: '100%', md: '78%' },
                px: 1.6,
                py: 1.1,
                borderRadius: 2,
                color: 'rgba(226,232,240,0.92)',
                backgroundColor: 'rgba(8, 8, 8, 0.52)',
                backdropFilter: 'blur(4px)',
                fontSize: { xs: '0.92rem', md: '1rem' },
              }}
            >
              Chat is currently under construction. Check back later.
            </Box>

            <TextField
              autoFocus
              fullWidth
              placeholder="Ask AI about Todd..."
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <AutoAwesomeRoundedIcon
                        sx={{
                          fontSize: 20,
                          color: 'rgba(226,232,240,0.95)',
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'grey.100',
                  backgroundColor: 'rgba(8, 8, 8, 0.52)',
                  backdropFilter: 'blur(4px)',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input': {
                  py: 1.5,
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(226,232,240,0.82)',
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default App
