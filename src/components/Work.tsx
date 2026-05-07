import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    const setup = () => {
      const boxes = document.querySelectorAll(".work-box");
      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      const workSection = document.querySelector(".work-section") as HTMLElement;
      if (!boxes.length || !workFlex || !workSection) return;

      // Use scrollWidth which is immune to ScrollSmoother transforms
      const totalScrollWidth = workFlex.scrollWidth;
      const viewportWidth = workSection.offsetWidth;
      const translateX = totalScrollWidth - viewportWidth;

      if (translateX <= 0) return; // Nothing to scroll

      // Kill any existing trigger first
      ScrollTrigger.getById("work")?.kill();

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    };

    // Give ScrollSmoother enough time to fully initialize layout
    const timerId = setTimeout(() => {
      setup();
      // Also refresh after TechStack lazy loads
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timerId);
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            { name: "Affinity Proto - AI Social Discovery Platform", category: "Full-Stack AI Application | May 2026", tools: "Built a full-stack AI social discovery prototype that matches users via semantic similarity of published thoughts. Stack: Next.js, React, TypeScript, FastAPI, SQLAlchemy, PostgreSQL, pgvector, sentence-transformers. Implemented JWT auth, bcrypt password hashing, protected REST APIs, ownership-based authorization, and thought CRUD with draft/public visibility. Designed a semantic matching pipeline that generates user-level embeddings and ranks nearby users using pgvector cosine similarity.", image: "/images/project_affinity.png", link: "https://github.com/satyym-stack" },
            { name: "K-12 Educational Image Search Chatbot", category: "Multimodal AI / NLP | Apr 2026", tools: "Developed a multimodal image retrieval extension for a K-12 chatbot that extracts intent, context, and search keywords from prompts to fetch relevant educational images. Stack: Python, Ollama, OpenCLIP, ChromaDB, Wikimedia Commons API, vector databases, LLMs, NLP. Integrated internet-based image retrieval into the chatbot pipeline to display contextually relevant images alongside generated responses. Added Ollama-based local LLM support for offline execution and contributed to the OpenCLIP + ChromaDB semantic image search workflow.", image: "/images/project_k12_chatbot.png", link: "https://github.com/satyym-stack" },
            { name: "ChessT - Local-First Chess Trainer", category: "Browser-Based Training App", tools: "Built ChessT as a local-first chess trainer for beginners focused on real play, correction, and repetition of weak patterns. Includes Learn (structured lesson path), Coach (play against local engine with beginner-friendly corrections), Drills (pattern repetition), Review (game-to-lesson breakdown), and Progress (practice tracking with export/import backups). Stack: React, TypeScript, Vite, chess.js, react-chessboard, Stockfish in-browser, Vitest, and Testing Library. Uses IndexedDB for private on-device storage with no accounts, backend, or cloud sync.", image: "/images/project_chesst.png", link: "https://github.com/satyym-stack" },
            { name: "Real-Time Graph Data Pipeline", category: "Data Engineering / DevOps", tools: "Contributed to a containerized real-time data pipeline using Python, Kafka, Kafka Connect, Kubernetes, Docker, and Neo4j to stream taxi-trip events into Neo4j for graph storage. Configured Kafka Connect sink workflows and Kubernetes services, troubleshooting Kafka listeners, service exposure, pod restarts, and resource limits while supporting graph analytics workflows using PageRank and BFS.", image: "/images/project_graph_pipeline.png", link: "https://github.com/satyym-stack" },
            { name: "3D Gaussian Splatting - Academic Project", category: "Computer Vision / ML", tools: "Reproduced a 3D Gaussian Splatting (3DGS) reconstruction pipeline (Brush/gsplat, PyTorch) on NeRF Synthetic (Lego); trained Baseline, Compact, and Regularized configurations for 30,000 iterations, logging PSNR, SSIM, and LPIPS every 2,000 iterations. Benchmarked quality versus model size across configurations: Regularized reduced model size by about 25.6% with improved LPIPS/SSIM, while Compact reduced size by about 97% with lower reconstruction quality.", image: "/images/project_gaussian.png", link: "https://github.com/satyym-stack" },
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.name} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
