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
        background: ${darkMode ? 'rgba(5, 28, 62, 0.4)' : 'rgba(235, 243, 250, 0.6)'};
        border-radius: 10px;
        margin: 10px 0;
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${darkMode ? '#0265A6' : '#6096BA'};
        border-radius: 10px;
        border: 2px solid ${darkMode ? '#051C3E' : '#EBF3FA'};
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      body.is-scrolling ::-webkit-scrollbar-thumb {
        opacity: 1;
      }
      
      body:hover ::-webkit-scrollbar-thumb {
        opacity: 0.7;
      }
      
      body.is-scrolling:hover ::-webkit-scrollbar-thumb {
        opacity: 1;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        opacity: 1 !important;
        background: ${darkMode ? '#6096BA' : '#0265A6'};
      }
      
      * {
        scrollbar-width: thin;
        scrollbar-color: ${darkMode ? '#0265A6 rgba(5, 28, 62, 0.4)' : '#6096BA rgba(235, 243, 250, 0.6)'};
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