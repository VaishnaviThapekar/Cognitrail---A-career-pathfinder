import { useEffect } from 'react';

const CustomScrollbar = ({ darkMode }) => {
    useEffect(() => {
        let scrollTimeout;

        const handleScroll = () => {
            document.body.classList.add('is-scrolling');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <style>{`
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: ${darkMode ? 'rgba(24, 24, 27, 0.4)' : 'rgba(228, 228, 231, 0.4)'};
        border-radius: 10px;
        margin: 10px 0;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${darkMode ? '#52525b' : '#a1a1aa'};
        border-radius: 10px;
        border: 2px solid ${darkMode ? '#18181b' : '#f4f4f5'};
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      body.is-scrolling ::-webkit-scrollbar-thumb {
        opacity: 1;
      }
      
      body:hover ::-webkit-scrollbar-thumb {
        opacity: 0.6;
      }
      
      body.is-scrolling:hover ::-webkit-scrollbar-thumb {
        opacity: 1;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        opacity: 1 !important;
        background: ${darkMode ? '#71717a' : '#71717a'};
      }
      
      * {
        scrollbar-width: thin;
        scrollbar-color: ${darkMode ? '#52525b rgba(24, 24, 27, 0.4)' : '#a1a1aa rgba(228, 228, 231, 0.4)'};
      }
      
      html {
        scroll-behavior: smooth;
        overflow-x: hidden;
      }
      
      body {
        overflow-x: hidden;
      }
    `}</style>
    );
};

export default CustomScrollbar;