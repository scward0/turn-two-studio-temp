import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const TurnTwoLanding = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const comingSoonRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [currentTime, setCurrentTime] = useState('');

  // Update time for Salt Lake City
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const saltLakeTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Denver',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(saltLakeTime.toLowerCase());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Custom cursor with particles
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
      }
      
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      }
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create particle trail with correct positioning to center on cursor dot
      if (Math.random() > 0.8) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX - 3, // Center on the 4px cursor dot
          y: e.clientY - 3, // Center on the 4px cursor dot
          opacity: 1
        };
        
        setParticles(prev => [...prev.slice(-10), newParticle]);
      }
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.closest('button') || e.target.closest('a')) {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Particle cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          opacity: particle.opacity - 0.05
        })).filter(particle => particle.opacity > 0)
      );
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set([logoRef.current, comingSoonRef.current, headlineRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 50
    });

    // Animation sequence
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(comingSoonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.3")
    .to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=0.5")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7")
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");

    // Floating animation for logo
    gsap.to(logoRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2
    });

  }, []);

  const TurnTwoLogo = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      width="237.524" 
      height="65.024" 
      viewBox="0 0 237.524 65.024"
      className="w-60 h-auto"
    >
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_8267" width="237.524" height="65.024" fill="none"/>
        </clipPath>
      </defs>
      <g id="Group_22680" transform="translate(0 0)">
        <g id="Group_22679" transform="translate(0 0)" clipPath="url(#clip-path)">
          <path id="Path_30721" d="M51.544,18.675H85.422a2.217,2.217,0,0,0,1.9-1.155l1.719-3.361a1.03,1.03,0,0,0-.917-1.5H54.813a.19.19,0,0,1-.169-.275L60.209,1.5A1.028,1.028,0,0,0,59.293,0H53.545a1.023,1.023,0,0,0-.916.56l-6.132,12a.187.187,0,0,1-.168.1H2.991a1.026,1.026,0,0,0-.916.56L.244,16.809a1.417,1.417,0,0,0-.126,1.3,1.35,1.35,0,0,0,1.259.592c4.635.187,20.151,1.579,25.192,11.661,1.866,3.733,3.736,12.645-4.7,30.38l-1.323,2.78a1.028,1.028,0,0,0,.916,1.5h5.747a1.024,1.024,0,0,0,.917-.56L51.376,18.777a.19.19,0,0,1,.168-.1m-8.593.553L35.349,34.1a.182.182,0,0,1-.2.1.171.171,0,0,1-.15-.158A17.728,17.728,0,0,0,23.885,19.32a.188.188,0,0,1-.122-.222.168.168,0,0,1,.183-.146H42.783a.18.18,0,0,1,.161.091.183.183,0,0,1,.007.184" transform="translate(0 0)" fill="#299afd"/>
          <path id="Path_30722" d="M45.849,41.059a.338.338,0,0,1,.227.265c.537,2.478,2.941,4.145,5.979,4.145,5.676,0,11.167-3.021,16.324-8.976a39.021,39.021,0,0,0,6.58-9.38l.755-1.467a1.254,1.254,0,0,1,1.386-.667l.045.01c.526.155.984.269,1.457.366a1.056,1.056,0,0,1,.757.639,1.262,1.262,0,0,1-.085,1.177c-3.727,5.945-4.284,7.649-4.858,10.446l-.155.74a5.636,5.636,0,0,0,.98,4.894,6.913,6.913,0,0,0,5.517,2.218,11.217,11.217,0,0,0,5.654-1.79c.01-.006.018,0,.028-.01.483-.277.483.077.483.077l0-.006a1.713,1.713,0,0,0,.241.772,1.536,1.536,0,0,0,1.313.755h4.338a1.549,1.549,0,0,0,1.333-.8C99.523,35,106.105,27.214,110.4,23.569c.071-.039,1.545-1.273,2.536-.824s.632,1.629-.114,2.976c-.831,1.534-1.793,3.165-2.495,4.354-3.624,6.163-4.773,10.747-3.323,13.256.819,1.417,2.4,2.136,4.7,2.136,5.086,0,11.445-4.2,17.906-11.836a1.724,1.724,0,0,0,.379-1.417,1.639,1.639,0,0,0-.777-1.146l-1.394-.816a1.5,1.5,0,0,0-1.928.354c-4.561,5.435-8.221,8.428-10.305,8.428-.531,0-.685-.165-.757-.29-.786-1.386,2.816-7.6,5.6-12.153,2.19-3.7,2.77-6.656,1.677-8.548-.523-.91-1.711-1.992-4.4-1.992-2.838,0-6.036,1.391-9.505,4.136a.617.617,0,0,1-.827-.007.862.862,0,0,1-.184-1.093l.042-.074a1.727,1.727,0,0,0-.024-1.717,1.54,1.54,0,0,0-1.325-.773H101.8a1.551,1.551,0,0,0-1.371.862c-.467.908-1.167,2.258-2.023,3.9-.126.23-.262.485-.406.78l-.864,1.655a69.628,69.628,0,0,1-9.19,12.648c-2.112,2.387-3.083,2.665-4.582,2.665a1.048,1.048,0,0,1-.858-.345,1.825,1.825,0,0,1-.2-1.507c.523-2.483,2.725-5.789,7.878-13.1a2.08,2.08,0,0,0,.138-2.179,1.87,1.87,0,0,0-1.69-1.03h0A11.318,11.318,0,0,1,79.574,16.8a1.84,1.84,0,0,0-1.829-.721l-5.022,1.033a1.956,1.956,0,0,0-1.479,1.527C70.071,24.013,69.4,25.5,66.383,29.569c-.392.535-.763,1.018-1.116,1.469-4.3,5.007-8.28,8-10.655,8a.912.912,0,0,1-.748-.288,1.661,1.661,0,0,1-.143-1.362c.381-1.776,3.887-7.977,6.981-13.448,1.14-2.016,2.23-3.944,3.1-5.539a1.3,1.3,0,0,0-.027-1.29,1.172,1.172,0,0,0-1.008-.584H57.776a1.186,1.186,0,0,0-1.047.659C49.665,30.865,43.883,39.034,40.26,39.034a.912.912,0,0,1-.748-.288,1.652,1.652,0,0,1-.141-1.36c.458-2.121,3.708-8.5,9.657-18.966a1.3,1.3,0,0,0-.01-1.3,1.171,1.171,0,0,0-1.012-.593H42.45a1.191,1.191,0,0,0-1.045.653c-1.464,2.784-2.737,5.172-3.84,7.246-4.265,8.008-6.03,11.322-6.74,14.607a5.078,5.078,0,0,0,.88,4.429,6.318,6.318,0,0,0,5.05,2.011c2.856,0,5.728-1.415,8.778-4.328a.32.32,0,0,1,.315-.082" transform="translate(14.924 7.808)" fill="#299afd"/>
          <path id="Path_30723" d="M126.973,14.76h24.978a2.3,2.3,0,0,0,1.956-1.215l1.717-3.36a1.134,1.134,0,0,0-1.011-1.65H100.331a1.134,1.134,0,0,0-1.011.618L97.5,12.717a1.515,1.515,0,0,0-.138,1.424,1.249,1.249,0,0,0,.923.593l17.674.022a1.1,1.1,0,0,1,.893.4.722.722,0,0,1,.012.663l-.1.192L99.521,49.9a1.133,1.133,0,0,0,1.009,1.65h5.747a1.13,1.13,0,0,0,1.011-.618L125.41,15.655a1.9,1.9,0,0,1,1.562-.895" transform="translate(47.314 4.153)" fill="#299afd"/>
          <path id="Path_30724" d="M181.3,19.3c-1.464-1.939-3.932-2.963-7.136-2.963-6.254,0-13.1,5.17-16.727,11.878l-.012,0S155.3,32.6,152.592,33c-1.86.12-1.024-1.121-1.024-1.121h0c3.141-5.746,6.105-11.584,7.344-14.05a1.456,1.456,0,0,0,.192-.764c-.058-.72-.887-.831-1.127-.831a.089.089,0,0,1-.022,0h-.036l-3.348.006h-1.316c-.013,0-.024,0-.037,0-.693.03-1.033.846-1.033.846s-.012.018-.018.03C145.48,30.5,140.357,38,137.033,38a.932.932,0,0,1-.791-.317,1.621,1.621,0,0,1-.128-1.265c.557-2.734,5.2-12.1,8.477-17.973l.367-.662a1.018,1.018,0,0,0-.815-1.536h-5.191a1.808,1.808,0,0,0-1.484,1.033c-.01.019-.019.028-.03.045-.5.984-1.011,1.973-1.576,3.009-6.135,11.527-10.692,18.138-13.653,18.138a.931.931,0,0,1-.791-.317,1.627,1.627,0,0,1-.125-1.265c.59-2.868,6.529-13.533,9.719-19.263l.269-.482s.5-.9-.565-.9h-6.76a1.08,1.08,0,0,0-.889.572v0c-1.443,2.778-2.7,5.169-3.786,7.232-4.161,7.91-5.884,11.185-6.556,14.438a5.134,5.134,0,0,0,.822,4.179,6.221,6.221,0,0,0,5.169,2.224c2.443,0,4.906-1.188,7.632-3.7a.936.936,0,0,1,1.516.3,4.878,4.878,0,0,0,.773,1.253,6.9,6.9,0,0,0,5.425,2.151s.3,0,.812-.031l.067,0c2.3-.164,8.648-1.087,12.911-6.18l.012,0a.505.505,0,0,1,.459-.2l.009-.007a15.358,15.358,0,0,0,2.685.235,8.2,8.2,0,0,0,2.8-.519.949.949,0,0,1,1.244.773,7.608,7.608,0,0,0,1.377,3.21c1.488,1.977,3.923,3.022,7.041,3.022,3.437,0,7.185-1.653,10.549-4.559l.01-.007c.15-.131.3-.269.446-.4A33.426,33.426,0,0,0,181.5,29.886a22.08,22.08,0,0,0,.98-3.419c.575-2.9.167-5.374-1.185-7.162m-6.326,5.511c-1.073,5.382-6.106,13.95-10.044,13.95a1.765,1.765,0,0,1-1.5-.672,3.974,3.974,0,0,1-.343-3.108c.954-4.759,6.26-14.084,10.411-14.084a1.46,1.46,0,0,1,1.255.535c.462.612.54,1.782.22,3.379" transform="translate(54.791 7.901)" fill="#299afd"/>
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          cursor: none !important;
        }
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid #299AFD;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.3s ease;
          transform: translate(-20px, -20px);
        }
        
        .cursor-dot {
          position: fixed;
          width: 4px;
          height: 4px;
          background: #299AFD;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-2px, -2px);
        }
        
        .particle {
          position: fixed;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #299AFD, #FF97FE);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          animation: particleFade 1s linear forwards;
        }
        
        @keyframes particleFade {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #299AFD 0%, #FF97FE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .button-hover {
          transition: all 0.3s ease;
        }
        
        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(41, 154, 253, 0.3);
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      
      {/* Particle Trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity
          }}
        />
      ))}

      <div 
        ref={containerRef} 
        className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden"
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-pink-50/30"></div>
        
        <div className="text-center relative z-10 max-w-6xl mx-auto">
          {/* Logo */}
          <div ref={logoRef} className="flex justify-center mb-6">
            <TurnTwoLogo />
          </div>
          
          {/* Coming Soon Badge */}
          <div ref={comingSoonRef} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-blue-100 rounded-full mb-12">
            <span className="text-sm font-medium gradient-text uppercase tracking-wider">
              Coming Soon
            </span>
          </div>

          {/* Main Headline */}
          <div ref={headlineRef} className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-black leading-tight mb-2" style={{ fontFamily: '"ff-more-web-pro-condensed", serif', fontWeight: 300, fontStyle: 'normal' }}>
              Brave brands move forward.
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-black leading-tight" style={{ fontFamily: '"ff-more-web-pro-condensed", serif', fontWeight: 300, fontStyle: 'normal' }}>
              We help them build momentum.
            </h2>
          </div>

          {/* Subtitle */}
          <p 
            ref={subtitleRef} 
            className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Turn Two is a <span className="font-semibold text-black">creative growth studio</span> uniting branding, marketing, and production.
          </p>

          {/* CTA Button */}
          <div ref={buttonRef}>
            <a
              href="mailto:stuart@turntwostudio.com"
              className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full text-base button-hover no-underline"
              style={{ backgroundColor: '#299AFD', textDecoration: 'none' }}
            >
              EMAIL TURN TWO
            </a>
          </div>
        </div>
      </div>
      
      {/* Location & Time - Fixed to bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-black font-bold z-20">
        <span>Salt Lake City</span>
        <span className="mx-3">{currentTime}</span>
      </div>
    </>
  );
};

export default TurnTwoLanding;