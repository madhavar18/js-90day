const PROJECTS = [
    {
        name: "HematoVision",
        description: "Deep learning classifier for blood cell images. ResNet50 fine-tuned with transfer learning. 90%+ accuracy across 4 cell types. Deployed via Flask for real-time diagnostic predictions.",
        tech: ["Python", "TensorFlow", "Keras", "ResNet50", "Flask"],
        github: "https://github.com/madhavar18",
        live: null,
        highlight: "90% accuracy"
    },
    {
        name: "StudentOS",
        description: "Full-stack student productivity platform. Task management with urgency tracking, subtasks, and analytics. MERN stack with JWT auth, Redux state management, and ML-powered task prioritisation.",
        tech: ["React", "Node.js", "Express", "MongoDB", "Redux"],
        github: "https://github.com/madhavar18",
        live: null,
        highlight: "Active rebuild"
    },
    {
        name: "TrafficIntelligence",
        description: "Random Forest regression model predicting hourly traffic volume from weather and temporal features. Deployed as Flask API with real-time inference.",
        tech: ["Python", "Scikit-learn", "Flask", "Pandas", "NumPy"],
        github: "https://github.com/madhavar18",
        live: null,
        highlight: "ML deployed"
    }
];

const SKILLS = [
    { category: "Languages", items: ["Java", "Python", "JavaScript"] },
    { category: "Frontend", items: ["React", "Next.js", "Redux", "HTML/CSS"] },
    { category: "Backend", items: ["Node.js", "Express", "Spring Boot", "Flask"] },
    { category: "ML/Data", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"] },
    { category: "Database", items: ["MongoDB", "MySQL"] },
    { category: "Tools", items: ["Git", "Docker", "Postman", "Jupyter"] }
];

function App() {
    return (
        <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', color: '#1a1a1a' }}>

            {/* Hero */}
            <section style={{ marginBottom: '4rem', borderBottom: '1px solid #eee', paddingBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    Yangalasetty Madhava Rao
                </h1>
                <p style={{ fontSize: '1.15rem', color: '#444', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Full-stack and ML engineer building production applications in React, Node.js, Java, and Python.
                    Currently executing a structured 90-day program across Software Engineering, MERN stack, and Machine Learning.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <a href="mailto:madhavarao1817@gmail.com" style={linkStyle}>Email</a>
                    <a href="https://github.com/madhavar18" target="_blank" style={linkStyle}>GitHub</a>
                    <a href="#" style={linkStyle}>LinkedIn</a>
                    <a href="#" style={{ ...linkStyle, background: '#1a1a1a', color: 'white', borderColor: '#1a1a1a' }}>Download Resume</a>
                </div>
            </section>

            {/* Projects */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 style={sectionHeading}>Projects</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {PROJECTS.map(p => (
                        <div key={p.name} style={projectCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{p.name}</h3>
                                <span style={{ fontSize: '0.75rem', background: '#E6F1FB', color: '#0C447C', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>{p.highlight}</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.65', marginBottom: '0.75rem' }}>{p.description}</p>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                                {p.tech.map(t => <span key={t} style={techChip}>{t}</span>)}
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <a href={p.github} target="_blank" style={smallLink}>GitHub →</a>
                                {p.live && <a href={p.live} target="_blank" style={smallLink}>Live Demo →</a>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills */}
            <section style={{ marginBottom: '4rem' }}>
                <h2 style={sectionHeading}>Skills</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {SKILLS.map(s => (
                        <div key={s.category} style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{s.category}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                {s.items.map(item => <span key={item} style={techChip}>{item}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Currently building */}
            <section>
                <h2 style={sectionHeading}>Currently Building</h2>
                <div style={{ background: '#f8f9fa', borderRadius: '10px', padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.7' }}>
                        Executing a structured <strong>90-day engineering program</strong> building simultaneously across three domains:
                        Java DSA + Spring Boot (Software Engineering), MERN + Next.js + TypeScript (Full Stack),
                        and PyTorch + MLOps (Machine Learning). Every concept is applied to production projects
                        with daily GitHub commits and deployed demos.
                    </p>
                </div>
            </section>
        </div>
    );
}

const linkStyle = { padding: '0.5rem 1.25rem', border: '1px solid #ddd', borderRadius: '6px', textDecoration: 'none', color: '#1a1a1a', fontSize: '0.9rem', fontWeight: '500' };
const sectionHeading = { fontSize: '1.3rem', fontWeight: '600', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid #f0f0f0' };
const projectCard = { background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' };
const techChip = { fontSize: '0.75rem', background: '#f0f2f5', padding: '2px 8px', borderRadius: '4px', color: '#555' };
const smallLink = { fontSize: '0.85rem', color: '#378ADD', textDecoration: 'none', fontWeight: '500' };

export default App;