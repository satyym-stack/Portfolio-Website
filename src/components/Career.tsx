import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Master of Science, Software Engineering</h4>
                <h5>Arizona State University</h5>
              </div>
              <h3>2024 - 2026</h3>
            </div>
            <p>
              Relevant Coursework: Adv Data Structures, Software engineering, Software Project Mgt, Software Testing, Statistical ML, Data Processing, Data Mining, Game Programming.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Intern</h4>
                <h5>Shoptaki (Remote, New York, US)</h5>
              </div>
              <h3>Jun - Aug 2025</h3>
            </div>
            <p>
              Researched and reverse-engineered the LangChain framework, mapping core abstractions (chains, tools, agents, memory) to guide the design of a SmartChain-native alternative. Implemented multiple tool-using AI agents for document Q&A, compliance support, and workflow automation while evaluating reliable orchestration patterns.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Development Intern</h4>
                <h5>Escalera Technologies (Lucknow, India)</h5>
              </div>
              <h3>Jun - Aug 2023</h3>
            </div>
            <p>
              Contributed to a containerized real-time data pipeline using Python, Kafka, Kafka Connect, Kubernetes, Docker, and Neo4j to stream taxi-trip events into graph storage. Configured Kafka Connect sink workflows and Kubernetes services while troubleshooting listeners, service exposure, pod restarts, and resource limits for graph analytics with PageRank and BFS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
