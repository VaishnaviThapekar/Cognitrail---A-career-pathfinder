import { useEffect } from 'react';

const CustomScrollbar = ({ darkMode }) => {
    useEffect(() => {
        let scrollTimeout;
        let isScrolling = false;

        const handleScroll = () => {
            // Add scrolling class
            document.body.classList.add('is-scrolling');
            isScrolling = true;

            // Clear previous timeout
            clearTimeout(scrollTimeout);

            // Remove scrolling class after 1 second of no scrolling
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
                isScrolling = false;
            }, 1000);
        };

        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <style>{`
      /* Enhanced Scrollbar with Auto-Hide Animation */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: ${darkMode ? 'rgba(39, 39, 87, 0.2)' : 'rgba(229, 231, 235, 0.5)'};
        border-radius: 10px;
        margin: 10px 0;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${darkMode
                ? 'linear-gradient(180deg, #505081 0%, #8686AC 100%)'
                : 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)'
            };
        border-radius: 10px;
        border: 2px solid ${darkMode ? 'rgba(15, 20, 25, 0.3)' : 'rgba(255, 255, 255, 0.5)'};
        box-shadow: ${darkMode
                ? '0 0 10px rgba(134, 134, 172, 0.3)'
                : '0 0 10px rgba(139, 92, 246, 0.3)'
            };
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      /* Show scrollbar when scrolling */
      body.is-scrolling ::-webkit-scrollbar-thumb {
        opacity: 1;
        transform: scaleY(1);
      }
      
      /* Show scrollbar on hover */
      body:hover ::-webkit-scrollbar-thumb {
        opacity: 0.6;
      }
      
      body.is-scrolling:hover ::-webkit-scrollbar-thumb {
        opacity: 1;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        opacity: 1 !important;
        background: ${darkMode
                ? 'linear-gradient(180deg, #8686AC 0%, #a0a0c8 100%)'
                : 'linear-gradient(180deg, #4f46e5 0%, #7c3aed 100%)'
            };
        box-shadow: ${darkMode
                ? '0 0 20px rgba(134, 134, 172, 0.5)'
                : '0 0 20px rgba(139, 92, 246, 0.5)'
            };
        border-width: 1px;
      }
      
      ::-webkit-scrollbar-thumb:active {
        background: ${darkMode
                ? 'linear-gradient(180deg, #a0a0c8 0%, #b0b0d8 100%)'
                : 'linear-gradient(180deg, #4338ca 0%, #6b21a8 100%)'
            };
      }
      
      /* Firefox scrollbar */
      * {
        scrollbar-width: thin;
        scrollbar-color: ${darkMode ? '#505081 rgba(39, 39, 87, 0.2)' : '#8b5cf6 rgba(229, 231, 235, 0.5)'};
      }
      
      /* Smooth scroll */
      html {
        scroll-behavior: smooth;
        overflow-x: hidden;
      }
      
      body {
        overflow-x: hidden;
        transition: all 0.3s ease;
      }
      
      /* Scrollbar corner */
      ::-webkit-scrollbar-corner {
        background: transparent;
      }
      
      /* Additional animations */
      @keyframes scrollbar-glow {
        0%, 100% { 
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }
        50% { 
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
        }
      }
      
      body.is-scrolling ::-webkit-scrollbar-thumb {
        animation: scrollbar-glow 2s ease-in-out infinite;
      }
    `}</style>
    );
};

export default CustomScrollbar;