// News Service - Fetches real-time career news from multiple sources

const NEWS_SOURCES = {

    GNEWS: {
        baseUrl: 'https://gnews.io/api/v4',

        apiKey: '58a0c7103d40f2eac9abb8a0335a3ac7', // Replace with your key
    },

    // NewsAPI - Popular news aggregator
    NEWSAPI: {
        baseUrl: 'https://newsapi.org/v2',

        apiKey: 'YOUR_NEWSAPI_KEY', // Replace with your key
    },

    // NewsData.io - Another alternative
    NEWSDATA: {
        baseUrl: 'https://newsdata.io/api/1',
        apiKey: 'YOUR_NEWSDATA_KEY', // Replace with your key
    }
};

// Career-related search keywords
const CAREER_KEYWORDS = {
    exams: ['JEE', 'NEET', 'CAT', 'UPSC', 'GATE', 'entrance exam', 'competitive exam'],
    scholarships: ['scholarship', 'financial aid', 'education grant', 'student funding'],
    jobs: ['hiring', 'recruitment', 'job opening', 'career opportunity', 'placement'],
    trends: ['career trends', 'job market', 'emerging careers', 'future jobs', 'skills demand']
};

// Fetch news from GNews API
export const fetchGNewsCareerNews = async () => {
    try {
        const query = 'career OR jobs OR education OR scholarship OR exam';
        const url = `${NEWS_SOURCES.GNEWS.baseUrl}/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=10&apikey=${NEWS_SOURCES.GNEWS.apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            return data.articles.map((article, index) => ({
                id: `gnews-${index}-${Date.now()}`,
                category: categorizeNews(article.title, article.description),
                title: article.title,
                summary: article.description || article.title,
                date: article.publishedAt,
                source: article.source.name,
                url: article.url,
                image: getEmojiForCategory(categorizeNews(article.title, article.description)),
                trending: index < 3, // Mark first 3 as trending
                featured: index === 0 // Mark first as featured
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching GNews:', error);
        return [];
    }
};

// Fetch news from NewsAPI
export const fetchNewsAPICareerNews = async () => {
    try {
        const query = '(career OR jobs OR education OR scholarship) AND (India OR IIT OR engineering)';
        const url = `${NEWS_SOURCES.NEWSAPI.baseUrl}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${NEWS_SOURCES.NEWSAPI.apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            return data.articles.map((article, index) => ({
                id: `newsapi-${index}-${Date.now()}`,
                category: categorizeNews(article.title, article.description),
                title: article.title,
                summary: article.description || article.content || article.title,
                date: article.publishedAt,
                source: article.source.name,
                url: article.url,
                image: getEmojiForCategory(categorizeNews(article.title, article.description)),
                trending: index < 3,
                featured: index === 0
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching NewsAPI:', error);
        return [];
    }
};

// Fetch news from NewsData.io
export const fetchNewsDataCareerNews = async () => {
    try {
        const query = 'career jobs education scholarship exam';
        const url = `${NEWS_SOURCES.NEWSDATA.baseUrl}/news?apikey=${NEWS_SOURCES.NEWSDATA.apiKey}&q=${encodeURIComponent(query)}&language=en&country=in`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            return data.results.map((article, index) => ({
                id: `newsdata-${index}-${Date.now()}`,
                category: categorizeNews(article.title, article.description),
                title: article.title,
                summary: article.description || article.content || article.title,
                date: article.pubDate,
                source: article.source_id,
                url: article.link,
                image: getEmojiForCategory(categorizeNews(article.title, article.description)),
                trending: index < 3,
                featured: index === 0
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching NewsData:', error);
        return [];
    }
};

// Categorize news based on keywords
const categorizeNews = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();

    // Check for exam-related keywords
    if (CAREER_KEYWORDS.exams.some(keyword => text.includes(keyword.toLowerCase()))) {
        return 'Exams';
    }

    // Check for scholarship keywords
    if (CAREER_KEYWORDS.scholarships.some(keyword => text.includes(keyword.toLowerCase()))) {
        return 'Scholarships';
    }

    // Check for job keywords
    if (CAREER_KEYWORDS.jobs.some(keyword => text.includes(keyword.toLowerCase()))) {
        return 'Jobs';
    }

    // Check for trend keywords
    if (CAREER_KEYWORDS.trends.some(keyword => text.includes(keyword.toLowerCase()))) {
        return 'Trends';
    }

    // Default to Trends
    return 'Trends';
};

// Get emoji based on category
const getEmojiForCategory = (category) => {
    const emojiMap = {
        'Exams': '📝',
        'Scholarships': '🎓',
        'Jobs': '💼',
        'Trends': '📊'
    };
    return emojiMap[category] || '📰';
};

// Main function to fetch all news
export const fetchAllCareerNews = async () => {
    try {
        // Try GNews first (usually most reliable)
        const gnewsArticles = await fetchGNewsCareerNews();
        if (gnewsArticles.length > 0) {
            return gnewsArticles;
        }

        // Fallback to NewsAPI
        const newsapiArticles = await fetchNewsAPICareerNews();
        if (newsapiArticles.length > 0) {
            return newsapiArticles;
        }

        // Fallback to NewsData
        const newsdataArticles = await fetchNewsDataCareerNews();
        if (newsdataArticles.length > 0) {
            return newsdataArticles;
        }

        // If all fail, return empty array (component will use mock data)
        return [];
    } catch (error) {
        console.error('Error fetching career news:', error);
        return [];
    }
};

// Fetch news with caching (to avoid hitting API limits)
export const fetchCareerNewsWithCache = async () => {
    const cacheKey = 'career_news_cache';
    const cacheTimeKey = 'career_news_cache_time';
    const cacheValidityMinutes = 60; // Cache valid for 1 hour

    try {
        // Check if we have cached data
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheTimeKey);

        if (cachedData && cacheTime) {
            const now = Date.now();
            const cacheAge = now - parseInt(cacheTime);
            const cacheValidityMs = cacheValidityMinutes * 60 * 1000;

            if (cacheAge < cacheValidityMs) {
                // Cache is still valid
                console.log('Using cached news data');
                return JSON.parse(cachedData);
            }
        }

        // Fetch fresh data
        console.log('Fetching fresh news data');
        const freshNews = await fetchAllCareerNews();

        if (freshNews.length > 0) {
            // Store in cache
            localStorage.setItem(cacheKey, JSON.stringify(freshNews));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
            return freshNews;
        }

        // If fresh fetch failed, return cached data even if expired
        if (cachedData) {
            console.log('Using expired cache as fallback');
            return JSON.parse(cachedData);
        }

        return [];
    } catch (error) {
        console.error('Error in fetchCareerNewsWithCache:', error);
        return [];
    }
};

// Clear cache manually
export const clearNewsCache = () => {
    localStorage.removeItem('career_news_cache');
    localStorage.removeItem('career_news_cache_time');
};

export default {
    fetchAllCareerNews,
    fetchCareerNewsWithCache,
    clearNewsCache,
    fetchGNewsCareerNews,
    fetchNewsAPICareerNews,
    fetchNewsDataCareerNews
};