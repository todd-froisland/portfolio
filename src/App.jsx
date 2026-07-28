import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  Link,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import XIcon from "@mui/icons-material/X";
import branchOpsLogo from "./assets/branch_ops_logo.png";
import bluehostLogo from "./assets/bluehost_logo.png";
import hipdeckLogo from "./assets/hipdeck_logo.png";
import purpleLogo from "./assets/purple_mpos.svg";
import resumePdf from "./assets/Resume_2026.pdf";
import solleNaturalsLogo from "./assets/solle_naturals_logo.svg";
import vendanzaLogo from "./assets/vendanza.svg";
import heroImage from "./assets/hero.png";

const projects = [
  {
    name: "HipDeck",
    description:
      "A digital signage platform currently in use by small businesses, non-profits, and enterprise clients like Hilton & Chic-Fil-A.",
    company: "HipDeck",
    startDate: "2021",
    endDate: "Present",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: [],
    url: "https://hipdeck.co",
    role: "Founder & Software Engineer",
    logo: hipdeckLogo,
  },
  {
    name: "Purple MPOS",
    description:
      "A mobile point-of-sale application used by Purple Innovation retail stores, customer care, and sales reps.",
    company: "Purple Innovation",
    startDate: "2022",
    endDate: "Present",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: ["POS", "Stripe Terminal", "Clover", "Payments"],
    url: "https://mpos.purple.com",
    role: "Software Engineer",
    logo: purpleLogo,
  },
  {
    name: "Purple.com",
    description:
      "The e-commerce site for Purple Innovation, a sleep and wellness company.",
    company: "Purple Innovation",
    startDate: "2022",
    endDate: "Present",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: ["Drupal", "Commerce", "CI/CD"],
    role: "Software Engineer",
    url: "https://purple.com",
    logo: purpleLogo,
  },
  {
    name: "BranchOps",
    description: "An agent orchestration platform currently in development.",
    company: "BranchOps",
    startDate: "2026",
    endDate: "Present",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: ["Operations", "Web App"],
    role: "Founder & Software Engineer",
    url: "https://branchops.com",
    logo: branchOpsLogo,
  },
  {
    name: "Solle Naturals",
    description: "An MLM e-commerce site for health and wellness products.",
    company: "Solle Naturals",
    startDate: "2020",
    endDate: "2022",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: ["Shopify", "Commerce", "CI/CD"],
    role: "Software Engineer",
    url: "https://sollenaturals.com",
    logo: solleNaturalsLogo,
  },
  {
    name: "Vendanza",
    description: "A now defunct multi-channel e-commerce analytics platform.",
    company: "Vendanza",
    startDate: "2019",
    endDate: "2021",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: ["React", "Design System", "CI/CD"],
    role: "Founder & Software Engineer",
    url: "https://vendanza.com",
    logo: vendanzaLogo,
  },
  {
    name: "Bluebird Design System",
    description:
      "A React component library and design system used internally at BlueHost.",
    company: "Bluehost",
    startDate: "2018",
    endDate: "2019",
    projectDetails:
      "Add a deeper description of the project scope, architecture, business context, and scale here.",
    contributions:
      "Add details about your direct contributions, technical decisions, and ownership areas here.",
    stack: ["React", "Design System", "CI/CD"],
    role: "Software Engineer",
    url: "https://bluehost.com",
    logo: bluehostLogo,
  },
];

const projectPosterTints = [
  "rgba(37, 99, 235, 0.35)",
  "rgba(147, 51, 234, 0.3)",
  "rgba(234, 88, 12, 0.3)",
  "rgba(14, 116, 144, 0.3)",
  "rgba(5, 150, 105, 0.3)",
];

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [projectsRevealed, setProjectsRevealed] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [modalAnimationKey, setModalAnimationKey] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const heroRef = useRef(null);
  const headerNavRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsRailRef = useRef(null);

  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setModalAnimationKey((current) => current + 1);
    setModalImageIndex(0);
    setProjectModalOpen(true);
  };
  const closeProjectDetails = () => setProjectModalOpen(false);

  const modalImages = selectedProject?.images?.length
    ? selectedProject.images
    : selectedProject?.image
      ? [selectedProject.image]
      : [heroImage];

  const activeModalImage =
    modalImages[Math.min(modalImageIndex, modalImages.length - 1)];

  const showPreviousModalImage = () => {
    setModalImageIndex((current) =>
      current <= 0 ? modalImages.length - 1 : current - 1,
    );
  };

  const showNextModalImage = () => {
    setModalImageIndex((current) =>
      current >= modalImages.length - 1 ? 0 : current + 1,
    );
  };

  const scrollToSectionWithHeaderOffset = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const navHeight =
      headerNavRef.current?.getBoundingClientRect().height ?? 72;
    const extraOffset = window.innerWidth >= 900 ? 48 : 20;
    const absoluteTop = window.scrollY + section.getBoundingClientRect().top;
    const targetTop = Math.max(0, absoluteTop - navHeight - extraOffset);

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  const scrollProjects = (direction) => {
    const rail = projectsRailRef.current;

    if (!rail) {
      return;
    }

    const firstCard = rail.firstElementChild;

    if (!firstCard) {
      return;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const railStyles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(
      railStyles.columnGap || railStyles.gap || "0",
    );
    const scrollBy = (cardWidth + gap) * direction;

    rail.scrollBy({
      left: scrollBy,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const OVERSCROLL_TRIGGER_DEPTH = 420;
    const OVERSCROLL_RESET_MS = 240;
    const HANDOFF_COOLDOWN_MS = 700;

    let overscrollDepth = 0;
    let resetTimer;
    let cooldownTimer;
    let handoffCoolingDown = false;

    const resetOverscrollDepth = () => {
      overscrollDepth = 0;
      window.clearTimeout(resetTimer);
    };

    const handleWheel = (event) => {
      if (chatOpen) {
        return;
      }

      if (event.deltaY <= 0) {
        resetOverscrollDepth();
        return;
      }

      const hero = heroRef.current;

      if (!hero) {
        return;
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const heroHandoffZoneEnd = heroBottom - window.innerHeight;
      const isInHeroRange = window.scrollY <= heroHandoffZoneEnd + 8;

      if (!isInHeroRange) {
        resetOverscrollDepth();
        return;
      }

      event.preventDefault();
      if (handoffCoolingDown) {
        return;
      }

      overscrollDepth += Math.max(0, event.deltaY);

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        overscrollDepth = 0;
      }, OVERSCROLL_RESET_MS);

      if (overscrollDepth < OVERSCROLL_TRIGGER_DEPTH) {
        return;
      }

      resetOverscrollDepth();
      handoffCoolingDown = true;

      scrollToSectionWithHeaderOffset("projects");

      cooldownTimer = window.setTimeout(() => {
        handoffCoolingDown = false;
      }, HANDOFF_COOLDOWN_MS);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.clearTimeout(resetTimer);
      window.clearTimeout(cooldownTimer);
    };
  }, [chatOpen]);

  useEffect(() => {
    const hintTimer = window.setTimeout(() => {
      setShowScrollHint(true);
    }, 3000);

    return () => {
      window.clearTimeout(hintTimer);
    };
  }, []);

  useEffect(() => {
    const section = projectsSectionRef.current;

    if (!section) {
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setProjectsRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setProjectsRevealed(true);
        observer.disconnect();
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box>
      <Box
        component="header"
        ref={heroRef}
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          px: { xs: 2, md: 5 },
          pb: { xs: 4, md: 6 },
          background:
            "linear-gradient(180deg, #000000 0%, #060606 60%, #0d0d0d 100%)",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 58%)",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          component="nav"
          ref={headerNavRef}
          sx={{
            "@keyframes headerFadeDown": {
              "0%": {
                opacity: 0,
                transform: "translateY(-16px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            px: { xs: 1, md: 3 },
            pt: { xs: 1, md: 1.5 },
            pb: { xs: 2, md: 2.5 },
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0) 100%)",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
            gap: 1,
            alignItems: "center",
            maxWidth: "100%",
            opacity: 0,
            transform: "translateY(-16px)",
            animation:
              "headerFadeDown 700ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards",
            "@media (prefers-reduced-motion: reduce)": {
              opacity: 1,
              transform: "none",
              animation: "none",
            },
          }}
        >
          <Typography
            component="a"
            href="#"
            sx={{
              color: "grey.100",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              justifySelf: { xs: "center", md: "start" },
            }}
          >
            Todd Froisland
          </Typography>

          <TextField
            size="small"
            placeholder="Ask AI about Todd"
            variant="outlined"
            onFocus={(event) => {
              event.target.blur();
              openChat();
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
                        color: "rgba(226,232,240,0.95)",
                        filter: "drop-shadow(0 0 4px rgba(255,255,255,0.2))",
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              minWidth: { xs: "100%", sm: 280, md: 320 },
              justifySelf: "center",
              "& .MuiOutlinedInput-root": {
                color: "grey.100",
                backgroundColor: "rgba(0,0,0,0.45)",
                "& fieldset": {
                  borderColor: "rgba(203,213,225,0.35)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(226,232,240,0.65)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "rgba(255,255,255,0.85)",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(226,232,240,0.85)",
                opacity: 1,
              },
            }}
          />

          <Stack
            direction="row"
            spacing={1}
            sx={{ justifySelf: { xs: "center", md: "end" }, flexWrap: "wrap" }}
          >
            {[
              ["Projects", "#projects"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <Button
                key={label}
                href={href}
                color="inherit"
                sx={{ color: "grey.100" }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: "min(84ch, 92vw)",
            "@keyframes heroFadeUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(24px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
            "& > *": {
              opacity: 0,
              transform: "translateY(24px)",
              animation:
                "heroFadeUp 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
            },
            "& > :nth-of-type(2)": {
              animationDelay: "110ms",
            },
            "& > :nth-of-type(3)": {
              animationDelay: "220ms",
            },
            "& > :nth-of-type(4)": {
              animationDelay: "330ms",
            },
            "@media (prefers-reduced-motion: reduce)": {
              "& > *": {
                opacity: 1,
                transform: "none",
                animation: "none",
              },
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "rgba(226,232,240,0.92)", letterSpacing: "0.12em" }}
          >
            Software Engineer
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 0.5,
              mb: 1,
              color: "grey.50",
              textTransform: "uppercase",
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              fontSize: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            Todd Froisland
          </Typography>
          <Typography
            sx={{ maxWidth: "64ch", color: "rgba(226,232,240,0.95)" }}
          >
            Senior full stack software engineer and technical founder building
            enterprise retail software, production SaaS platforms, payment
            systems, and cloud infrastructure.
          </Typography>
          <Stack
            direction="row"
            spacing={2.25}
            flexWrap="wrap"
            useFlexGap
            sx={{ mt: 3 }}
          >
            <IconButton
              href="https://github.com/todd-froisland"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              sx={{
                p: 0,
                color: "grey.50",
                border: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "grey.100",
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <IconButton
              href="https://www.linkedin.com/in/todd-froisland-14b960138/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              sx={{
                p: 0,
                color: "grey.50",
                border: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "grey.100",
                },
              }}
            >
              <LinkedInIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <IconButton
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              sx={{
                p: 0,
                color: "grey.50",
                border: "none",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "grey.100",
                },
              }}
            >
              <XIcon sx={{ fontSize: 30 }} />
            </IconButton>

            <Tooltip
              title="Download Resume"
              arrow
              placement="top"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [14, 10],
                      },
                    },
                  ],
                },
              }}
            >
              <IconButton
                href={resumePdf}
                download="Todd_Froisland_Resume_2026.pdf"
                aria-label="Download Resume"
                sx={{
                  p: 0,
                  color: "grey.50",
                  border: "none",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "grey.100",
                  },
                }}
              >
                <MoveToInboxRoundedIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {showScrollHint && (
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: { xs: 16, md: 22 },
              transform: "translateX(-50%)",
              zIndex: 1,
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              color: "rgba(226,232,240,0.86)",
              opacity: 0,
              "@keyframes scrollHintReveal": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
              "@keyframes scrollHintBob": {
                "0%, 100%": { transform: "translate(-50%, 0)" },
                "50%": { transform: "translate(-50%, 6px)" },
              },
              animation:
                "scrollHintReveal 480ms ease forwards, scrollHintBob 1.6s ease-in-out 480ms infinite",
              "@media (prefers-reduced-motion: reduce)": {
                opacity: 1,
                animation: "none",
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                mb: -0.2,
                color: "rgba(226,232,240,0.82)",
              }}
            >
              Scroll down
            </Typography>
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 28 }} />
          </Box>
        )}
      </Box>

      <Container maxWidth={false} sx={{ px: { xs: 2, md: 5 }, pt: 0, pb: 3 }}>
        <Box
          id="projects"
          ref={projectsSectionRef}
          sx={{
            mt: 0,
            minHeight: "100vh",
            mx: { xs: -2, md: -5 },
            px: { xs: 2, md: 5 },
            pt: { xs: 6, md: 10 },
            pb: { xs: 3, md: 4 },
            backgroundColor: "#000000",
            scrollMarginTop: { xs: 10, md: 14 },
          }}
        >
          <Typography
            sx={{
              fontSize: "clamp(3rem, 12vw, 4rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.03em",
              // textTransform: 'lowercase',
              color: "grey.100",
              mb: 2,
              opacity: projectsRevealed ? 1 : 0,
              transform: projectsRevealed
                ? "translateY(0)"
                : "translateY(-28px)",
              transition:
                "opacity 520ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            Work
          </Typography>

          <Typography
            sx={{
              color: "rgba(226,232,240,0.82)",
              mb: 3,
              maxWidth: "62ch",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              opacity: projectsRevealed ? 1 : 0,
              transform: projectsRevealed ? "translateY(0)" : "translateY(-16px)",
              transition:
                "opacity 520ms ease 120ms, transform 620ms cubic-bezier(0.22, 1, 0.36, 1) 120ms",
            }}
          >
            A schmorgasbord of projects I&apos;ve contributed to over the years
          </Typography>

          <Box
            sx={{
              position: "relative",
            }}
          >
            <IconButton
              aria-label="Scroll projects left"
              onClick={() => scrollProjects(-1)}
              sx={{
                position: "absolute",
                top: "50%",
                left: { xs: -2, md: -3 },
                transform: "translateY(-50%)",
                zIndex: 3,
                backgroundColor: "rgba(15,23,42,0.38)",
                color: "grey.100",
                "&:hover": {
                  backgroundColor: "rgba(15,23,42,0.58)",
                },
              }}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>

            <IconButton
              aria-label="Scroll projects right"
              onClick={() => scrollProjects(1)}
              sx={{
                position: "absolute",
                top: "50%",
                right: { xs: -2, md: -3 },
                transform: "translateY(-50%)",
                zIndex: 3,
                backgroundColor: "rgba(15,23,42,0.38)",
                color: "grey.100",
                "&:hover": {
                  backgroundColor: "rgba(15,23,42,0.58)",
                },
              }}
            >
              <NavigateNextRoundedIcon />
            </IconButton>

            <Box
              ref={projectsRailRef}
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                pt: 1.25,
                pb: 2,
                px: { xs: 4, md: 5 },
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {projects.map((project, index) => (
                <Box
                  key={project.name}
                  sx={{
                    flex: "0 0 clamp(240px, 26vw, 320px)",
                    scrollSnapAlign: "start",
                    py: 0.5,
                    opacity: projectsRevealed ? 1 : 0,
                    transform: projectsRevealed
                      ? "translateY(0)"
                      : "translateY(22px)",
                    transition:
                      "opacity 480ms ease, transform 560ms cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: projectsRevealed
                      ? `${180 + index * 110}ms`
                      : "0ms",
                  }}
                >
                  <Card
                    onClick={() => openProjectDetails(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openProjectDetails(project);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open details for ${project.name}`}
                    sx={{
                      position: "relative",
                      height: "100%",
                      borderRadius: 1,
                      overflow: "hidden",
                      cursor: "pointer",
                      aspectRatio: "2 / 3",
                      backgroundColor: "#060606",
                      border: "1px solid rgba(148,163,184,0.18)",
                      transition: "transform 220ms ease, box-shadow 220ms ease",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.02)",
                        boxShadow: "0 24px 36px rgba(0,0,0,0.34)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        inset: 0,
                        height: "100%",
                        width: "100%",
                        display: "grid",
                        placeItems: "center",
                        p: 2,
                        pb: 15,
                      }}
                    >
                      {project.logo ? (
                        <Box
                          component="img"
                          src={project.logo}
                          alt={`${project.name} logo`}
                          sx={{
                            maxWidth: "78%",
                            maxHeight: "52%",
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Typography
                          sx={{
                            color: "rgba(226,232,240,0.9)",
                            textAlign: "center",
                            fontWeight: 700,
                            letterSpacing: "0.03em",
                            px: 2,
                          }}
                        >
                          {project.name}
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        pointerEvents: "none",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "56%",
                        background:
                          "linear-gradient(180deg, rgba(6,6,6,0) 0%, rgba(6,6,6,0.82) 52%, rgba(6,6,6,0.98) 100%)",
                      }}
                    />

                    <CardContent
                      sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                        color: "grey.100",
                        px: 2,
                        pb: "14px !important",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                        {project.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          mt: 0.25,
                          color: "rgba(226,232,240,0.74)",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.7,
                          color: "rgba(226,232,240,0.86)",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description || "More details coming soon."}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          id="contact"
          sx={{
            mt: 0,
            mx: { xs: -2, md: -5 },
            px: { xs: 2, md: 5 },
            py: { xs: 5, md: 7 },
            background:
              "linear-gradient(180deg, #000000 0%, #060606 60%, #0d0d0d 100%)",
            scrollMarginTop: { xs: 10, md: 14 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={(event) => event.preventDefault()}
            sx={{
              width: "100%",
              maxWidth: 700,
              textAlign: "center",
            }}
          >
            <Typography variant="h3" sx={{ mb: 1.5, color: "grey.100" }}>
              Contact
            </Typography>
            <Typography
              sx={{
                color: "rgba(226,232,240,0.9)",
                maxWidth: "64ch",
                mx: "auto",
                mb: 3,
              }}
            >
              Let&apos;s connect and build something meaningful.
            </Typography>

            <Stack spacing={1.25} sx={{ textAlign: "left" }}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "grey.100",
                    backgroundColor: "rgba(8, 8, 8, 0.52)",
                    "& fieldset": {
                      borderColor: "rgba(203,213,225,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(226,232,240,0.55)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.8)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(226,232,240,0.78)",
                  },
                }}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "grey.100",
                    backgroundColor: "rgba(8, 8, 8, 0.52)",
                    "& fieldset": {
                      borderColor: "rgba(203,213,225,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(226,232,240,0.55)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.8)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(226,232,240,0.78)",
                  },
                }}
              />

              <TextField
                label="Message"
                name="message"
                fullWidth
                required
                multiline
                minRows={5}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "grey.100",
                    backgroundColor: "rgba(8, 8, 8, 0.52)",
                    "& fieldset": {
                      borderColor: "rgba(203,213,225,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(226,232,240,0.55)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgba(255,255,255,0.8)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(226,232,240,0.78)",
                  },
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Button type="submit" variant="contained" size="large">
                  Send Message
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          px: { xs: 2, md: 5 },
          pb: 3,
          pt: 1,
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "text.secondary", fontSize: "0.92rem" }}>
          Updated 2026, American made 🇺🇸
        </Typography>
      </Box>

      <Modal
        open={projectModalOpen}
        onClose={closeProjectDetails}
        closeAfterTransition
        keepMounted
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(12px)",
              backgroundColor: "rgba(0, 0, 0, 0.56)",
              transition: "backdrop-filter 260ms ease, background-color 260ms ease",
            },
          },
        }}
      >
        <Fade
          in={projectModalOpen}
          timeout={{ enter: 240, exit: 220 }}
          onExited={() => setSelectedProject(null)}
        >
          <Box
            sx={{
              position: "fixed",
              inset: 0,
              background: "linear-gradient(180deg, #000000 0%, #060606 60%, #0d0d0d 100%)",
              overflowY: "auto",
              p: { xs: 2, md: 4 },
              transition: "filter 240ms ease, transform 240ms ease",
              filter: projectModalOpen ? "blur(0px)" : "blur(4px)",
              transform: projectModalOpen ? "scale(1)" : "scale(0.995)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: "100%",
                position: "relative",
                borderRadius: 2,
                backgroundColor: "rgba(11,15,24,0.72)",
                p: { xs: 2, md: 3 },
              }}
            >
              <IconButton
                aria-label="Close project details"
                onClick={closeProjectDetails}
                sx={{
                  position: "absolute",
                  top: { xs: 10, md: 14 },
                  left: { xs: 10, md: 14 },
                  color: "grey.100",
                  backgroundColor: "rgba(0,0,0,0.28)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.45)",
                  },
                }}
              >
                <CloseRoundedIcon />
              </IconButton>

              <Typography
                sx={{
                  color: "grey.100",
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  mb: 2,
                  mt: { xs: 5, md: 5.5 },
                }}
              >
                {selectedProject?.name}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
                  gridTemplateAreas: {
                    xs: '"media" "text"',
                    md: '"text media"',
                  },
                  alignItems: "start",
                  "@keyframes modalTextIn": {
                    "0%": {
                      opacity: 0,
                      transform: "translateX(-18px)",
                    },
                    "100%": {
                      opacity: 1,
                      transform: "translateX(0)",
                    },
                  },
                  "@keyframes modalImageIn": {
                    "0%": {
                      opacity: 0,
                    },
                    "100%": {
                      opacity: 1,
                    },
                  },
                }}
              >
              <Box
                key={`modal-text-${modalAnimationKey}`}
                sx={{
                  gridArea: "text",
                  opacity: 0,
                  animation:
                    "modalTextIn 420ms cubic-bezier(0.22, 1, 0.36, 1) 70ms forwards",
                  "@media (prefers-reduced-motion: reduce)": {
                    opacity: 1,
                    animation: "none",
                  },
                }}
              >
                <Typography sx={{ color: "rgba(226,232,240,0.7)", letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.8rem" }}>
                  {selectedProject?.role}
                </Typography>
                <Typography sx={{ mt: 0.7, color: "rgba(226,232,240,0.82)", fontSize: "0.92rem" }}>
                  {selectedProject?.company} · {selectedProject?.startDate} — {selectedProject?.endDate}
                </Typography>
                <Typography sx={{ mt: 1.25, color: "rgba(226,232,240,0.92)", lineHeight: 1.65 }}>
                  {selectedProject?.description || "Project details coming soon."}
                </Typography>

                <Typography sx={{ mt: 2.25, color: "grey.100", fontWeight: 700 }}>
                  Project details
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(226,232,240,0.9)", lineHeight: 1.75 }}>
                  {selectedProject?.projectDetails || "Add in-depth project details here."}
                </Typography>

                <Typography sx={{ mt: 2.25, color: "grey.100", fontWeight: 700 }}>
                  My thoughts on the project
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(226,232,240,0.9)", lineHeight: 1.75 }}>
                  {selectedProject?.thoughts ||
                    "Add your personal perspective here: what made this project meaningful, what you learned, and what you would improve next."}
                </Typography>

                <Typography sx={{ mt: 2.25, color: "grey.100", fontWeight: 700 }}>
                  What I contributed
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(226,232,240,0.9)", lineHeight: 1.75 }}>
                  {selectedProject?.contributions || "Add your direct contributions here."}
                </Typography>

                <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" sx={{ mt: 2 }}>
                  {(selectedProject?.stack || []).map((item) => (
                    <Chip
                      key={item}
                      size="small"
                      label={item}
                      sx={{
                        color: "grey.100",
                        backgroundColor: "rgba(15,23,42,0.72)",
                        border: "1px solid rgba(203,213,225,0.25)",
                      }}
                    />
                  ))}
                </Stack>

                <Button
                  href={selectedProject?.url}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  sx={{ mt: 2.25, color: "grey.50", borderColor: "rgba(203,213,225,0.34)" }}
                >
                  Visit Project
                </Button>
              </Box>

              <Box
                key={`modal-image-${modalAnimationKey}`}
                sx={{
                  gridArea: "media",
                  height: {
                    xs: "min(52vh, 380px)",
                    md: "min(62vh, 640px)",
                  },
                  maxHeight: "calc(100dvh - 170px)",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: "1px solid rgba(203,213,225,0.2)",
                  backgroundColor: "rgba(15,23,42,0.5)",
                  position: "relative",
                  opacity: 0,
                  animation: "modalImageIn 460ms ease 190ms forwards",
                  "@media (prefers-reduced-motion: reduce)": {
                    opacity: 1,
                    animation: "none",
                  },
                }}
              >
                <Box
                  component="img"
                  src={activeModalImage}
                  alt={`${selectedProject?.name || "Project"} preview ${modalImageIndex + 1}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {modalImages.length > 1 && (
                  <>
                    <IconButton
                      aria-label="Previous project image"
                      onClick={showPreviousModalImage}
                      sx={{
                        position: "absolute",
                        left: { xs: 8, md: 12 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        color: "grey.100",
                        backgroundColor: "rgba(0,0,0,0.38)",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.56)",
                        },
                      }}
                    >
                      <NavigateBeforeRoundedIcon />
                    </IconButton>

                    <IconButton
                      aria-label="Next project image"
                      onClick={showNextModalImage}
                      sx={{
                        position: "absolute",
                        right: { xs: 8, md: 12 },
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        color: "grey.100",
                        backgroundColor: "rgba(0,0,0,0.38)",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.56)",
                        },
                      }}
                    >
                      <NavigateNextRoundedIcon />
                    </IconButton>

                    <Stack
                      direction="row"
                      spacing={0.8}
                      sx={{
                        position: "absolute",
                        left: "50%",
                        bottom: 10,
                        transform: "translateX(-50%)",
                        zIndex: 2,
                        px: 1,
                        py: 0.5,
                        borderRadius: 99,
                        backgroundColor: "rgba(0,0,0,0.38)",
                      }}
                    >
                      {modalImages.map((_, index) => {
                        const isActive = index === modalImageIndex;

                        return (
                          <Box
                            key={`modal-dot-${index}`}
                            component="button"
                            type="button"
                            onClick={() => setModalImageIndex(index)}
                            aria-label={`Go to image ${index + 1}`}
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              border: "none",
                              p: 0,
                              cursor: "pointer",
                              backgroundColor: isActive
                                ? "rgba(248,250,252,0.98)"
                                : "rgba(148,163,184,0.72)",
                              transition: "transform 180ms ease, background-color 180ms ease",
                              transform: isActive ? "scale(1.15)" : "scale(1)",
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </>
                )}
              </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={chatOpen}
        onClose={closeChat}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(16px)",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
            },
          },
        }}
      >
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <IconButton
            aria-label="Close chat overlay"
            onClick={closeChat}
            sx={{
              position: "fixed",
              top: { xs: 14, md: 20 },
              left: { xs: 14, md: 20 },
              color: "grey.100",
              backgroundColor: "rgba(0,0,0,0.35)",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.55)",
              },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <Box
            sx={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
            }}
          >
            <Box
              sx={{
                alignSelf: "flex-start",
                maxWidth: { xs: "100%", md: "78%" },
                px: 1.6,
                py: 1.1,
                borderRadius: 2,
                color: "rgba(226,232,240,0.92)",
                backgroundColor: "rgba(8, 8, 8, 0.52)",
                backdropFilter: "blur(4px)",
                fontSize: { xs: "0.92rem", md: "1rem" },
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
                          color: "rgba(226,232,240,0.95)",
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "grey.100",
                  backgroundColor: "rgba(8, 8, 8, 0.52)",
                  backdropFilter: "blur(4px)",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(226,232,240,0.82)",
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
