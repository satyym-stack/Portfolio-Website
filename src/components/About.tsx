import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Hi, I&apos;m Satyam - an MS Software Engineering student at Arizona State University who builds full-stack systems end to end, from schema to deployment. I&apos;ve shipped Affinity, a Next.js + FastAPI social discovery platform with JWT auth and pgvector-based semantic matching; a multimodal K-12 chatbot integrating OpenCLIP and ChromaDB; and a Postgres pipeline ingesting 10M+ Reddit comments via pg_bulkload. I&apos;m comfortable across Python, TypeScript, PostgreSQL, Docker, and Kubernetes. Open to full-time SDE roles for summer 2026, with a strong interest in AI/ML-adjacent teams.
        </p>
      </div>
    </div>
  );
};

export default About;
