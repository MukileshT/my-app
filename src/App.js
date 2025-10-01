import React, { useState, useEffect } from 'react';

export default function CTFAuthPortal() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    team: ''
  });
  const [matrixRain, setMatrixRain] = useState([]);

  useEffect(() => {
    // Generate matrix rain effect
    const columns = Math.floor(window.innerWidth / 20);
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops.push({
        x: i * 20,
        y: Math.random() * -1000,
        speed: Math.random() * 3 + 2
      });
    }
    setMatrixRain(drops);

    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > window.innerHeight ? -20 : drop.y + drop.speed
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', formData);
    } else {
      console.log('Register:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      team: ''
    });
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

        body {
          font-family: 'Share Tech Mono', monospace;
          overflow-x: hidden;
        }

        .ctf-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          background: #000000;
          overflow: hidden;
        }

        .matrix-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .matrix-char {
          position: absolute;
          color: #00ff41;
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          opacity: 0.5;
          text-shadow: 0 0 8px #00ff41;
        }

        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(transparent, #00ff41, transparent);
          animation: scan 8s linear infinite;
          opacity: 0.1;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        .auth-wrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
          z-index: 10;
        }

        @keyframes glitchAnim {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .auth-card {
          background: rgba(0, 0, 0, 0.85);
          border: 2px solid #00ff41;
          border-radius: 0;
          box-shadow:
            0 0 20px rgba(0, 255, 65, 0.3),
            inset 0 0 20px rgba(0, 255, 65, 0.05);
          padding: 40px;
          position: relative;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00ff41, #00aa2b, #00ff41);
          z-index: -1;
          border-radius: 0;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .auth-card:hover::before {
          opacity: 0.5;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .corner-accent {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #00ff41;
        }

        .corner-tl {
          top: -2px;
          left: -2px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: -2px;
          right: -2px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: -2px;
          left: -2px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: -2px;
          right: -2px;
          border-left: none;
          border-top: none;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          font-weight: 900;
          color: #00ff41;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 5px;
          text-shadow:
            0 0 10px #00ff41,
            0 0 20px #00ff41,
            0 0 30px #00ff41;
          animation: textGlow 2s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow:
              0 0 10px #00ff41,
              0 0 20px #00ff41,
              0 0 30px #00ff41;
          }
          50% {
            text-shadow:
              0 0 15px #00ff41,
              0 0 30px #00ff41,
              0 0 45px #00ff41;
          }
        }

        .auth-subtitle {
          font-size: 0.75rem;
          color: #00ff41;
          opacity: 0.7;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #00ff41;
          margin-bottom: 30px;
          font-size: 0.75rem;
          color: #00ff41;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: #00ff41;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          color: #00ff41;
          font-size: 0.875rem;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-label::before {
          content: '> ';
          color: #00ff41;
        }

        .form-input {
          width: 100%;
          padding: 12px 15px;
          background: rgba(0, 255, 65, 0.05);
          border: 1px solid #00ff41;
          color: #00ff41;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-input::placeholder {
          color: rgba(0, 255, 65, 0.3);
        }

        .form-input:focus {
          background: rgba(0, 255, 65, 0.1);
          box-shadow:
            0 0 10px rgba(0, 255, 65, 0.3),
            inset 0 0 10px rgba(0, 255, 65, 0.1);
          border-color: #00ff41;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: transparent;
          border: 2px solid #00ff41;
          color: #00ff41;
          font-family: 'Orbitron', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #00ff41;
          transition: left 0.3s ease;
          z-index: -1;
        }

        .submit-btn:hover::before {
          left: 0;
        }

        .submit-btn:hover {
          color: #000000;
          box-shadow: 0 0 20px #00ff41;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 25px 0;
          color: #00ff41;
          opacity: 0.5;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #00ff41;
        }

        .divider-text {
          padding: 0 15px;
          font-size: 0.75rem;
        }

        .toggle-section {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 255, 65, 0.2);
        }

        .toggle-text {
          color: #00ff41;
          opacity: 0.7;
          font-size: 0.875rem;
          margin-bottom: 10px;
        }

        .toggle-btn {
          background: transparent;
          border: 1px solid #00ff41;
          color: #00ff41;
          padding: 8px 20px;
          font-family: 'Share Tech Mono', monospace;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 1px;
        }

        .toggle-btn:hover {
          background: #00ff41;
          color: #000000;
          box-shadow: 0 0 15px #00ff41;
        }

        .terminal-prompt {
          color: #00ff41;
          font-size: 0.75rem;
          margin-top: 20px;
          opacity: 0.6;
          text-align: center;
        }

        @media (max-width: 640px) {
          .auth-card {
            padding: 30px 25px;
          }

          .auth-title {
            font-size: 1.5rem;
            letter-spacing: 2px;
          }

          .status-bar {
            font-size: 0.65rem;
          }
        }
      `}</style>

      <div className="ctf-container">
        {/* Matrix Rain Background */}
        <div className="matrix-bg">
          {matrixRain.map((drop, i) => (
            <div
              key={i}
              className="matrix-char"
              style={{
                left: `${drop.x}px`,
                top: `${drop.y}px`
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>

        {/* Scan Line Effect */}
        <div className="scan-line"></div>

        {/* Grid Overlay */}
        <div className="grid-overlay"></div>

        {/* Auth Card */}
        <div className="auth-wrapper">
          <div className="auth-card">
            {/* Corner Accents */}
            <div className="corner-accent corner-tl"></div>
            <div className="corner-accent corner-tr"></div>
            <div className="corner-accent corner-bl"></div>
            <div className="corner-accent corner-br"></div>

            {/* Header */}
            <div className="auth-header">
              <h1 className="auth-title">
                {isLogin ? 'ACCESS' : 'REGISTER'}
              </h1>
              <p className="auth-subtitle">CTF PORTAL v2.0</p>
            </div>

            {/* Status Bar */}
            <div className="status-bar">
              <div className="status-item">
                <div className="status-dot"></div>
                <span>SECURE</span>
              </div>
              <div className="status-item">
                <span>ENCRYPTED</span>
              </div>
              <div className="status-item">
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Form */}
            <div>
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="elite_hacker"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="hacker@ctf.com"
                  className="form-input"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Team Name</label>
                  <input
                    type="text"
                    name="team"
                    value={formData.team}
                    onChange={handleInputChange}
                    placeholder="cyber_warriors"
                    className="form-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••"
                  className="form-input"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••••"
                    className="form-input"
                  />
                </div>
              )}

              <button onClick={handleSubmit} className="submit-btn">
                {isLogin ? 'INITIATE ACCESS' : 'CREATE ACCOUNT'}
              </button>
            </div>

            {/* Toggle Section */}
            <div className="toggle-section">
              <p className="toggle-text">
                {isLogin ? 'New to the arena?' : 'Already have access?'}
              </p>
              <button onClick={toggleMode} className="toggle-btn">
                {isLogin ? 'Register Now' : 'Login Here'}
              </button>
            </div>

            {/* Terminal Prompt */}
            <div className="terminal-prompt">
              root@ctf:~$ {isLogin ? 'authenticate' : 'register'} --secure
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
