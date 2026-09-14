import React, { useState, useEffect } from 'react';
import {
    Newspaper, TrendingUp, Award, Briefcase, GraduationCap,
    Calendar, ExternalLink, Filter, Search, Clock, Sparkles,
    Bell, Bookmark, Share2, ChevronRight, RefreshCw
} from 'lucide-react';
import { fetchCareerNewsWithCache, clearNewsCache } from '../services/newsService';

const CareerNewsFeed = ({ darkMode }) => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [displayCount, setDisplayCount] = useState(6);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [usingMockData, setUsingMockData] = useState(false);

    const categories = [
        { id: 'All', icon: Newspaper },
        { id: 'Exams', icon: GraduationCap },
        { id: 'Scholarships', icon: Award },
        { id: 'Jobs', icon: Briefcase },
        { id: 'Trends', icon: TrendingUp }
    ];

    // Simulated news data fallback
    const mockNewsData = [
        {
            id: 1,
            category: 'Exams',
            title: 'JEE Main 2026 Registration Opens - Apply Now',
            summary: 'NTA has announced JEE Main 2026 session registration. Official notifications and eligibility criteria published.',
            date: '2026-01-16',
            source: 'NTA Official',
            url: '#',
            image: '📝',
            trending: true
        },
        {
            id: 2,
            category: 'Scholarships',
            title: 'PM National Scholarship Scheme 2026 for Students',
            summary: 'Eligible undergraduate students in science, engineering, and commerce can apply for academic financial grants.',
            date: '2026-01-15',
            source: 'Ministry of Education',
            url: '#',
            image: '🎓',
            featured: true
        },
        {
            id: 3,
            category: 'Trends',
            title: 'Top 10 Emerging AI and Robotics Careers in 2026',
            summary: 'Industry survey reveals 42% growth in demand for generative AI engineers, robotics specialists, and prompt architects.',
            date: '2026-01-14',
            source: 'Tech India Insights',
            url: '#',
            image: '🤖',
            trending: true
        },
        {
            id: 4,
            category: 'Jobs',
            title: 'Global Tech Hiring Accelerates for Cloud & Security Roles',
            summary: 'Major software firms announce expansion in engineering hubs across Bangalore, Hyderabad, and Pune.',
            date: '2026-01-13',
            source: 'NASSCOM Report',
            url: '#',
            image: '💼'
        }
    ];

    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const realNews = await fetchCareerNewsWithCache();
                if (realNews && realNews.length > 0) {
                    setNews(realNews);
                    setFilteredNews(realNews);
                    setUsingMockData(false);
                } else {
                    setNews(mockNewsData);
                    setFilteredNews(mockNewsData);
                    setUsingMockData(true);
                }
            } catch (error) {
                setNews(mockNewsData);
                setFilteredNews(mockNewsData);
                setUsingMockData(true);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    const refreshNews = async () => {
        setIsRefreshing(true);
        clearNewsCache();
        try {
            const freshNews = await fetchCareerNewsWithCache();
            if (freshNews && freshNews.length > 0) {
                setNews(freshNews);
                setUsingMockData(false);
                alert('✅ News refreshed successfully!');
            } else {
                alert('⚠️ Unable to fetch fresh news. Using cached data.');
            }
        } catch (error) {
            alert('❌ Failed to refresh news.');
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        let filtered = news;
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.summary.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredNews(filtered);
    }, [selectedCategory, searchQuery, news]);

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const handleBookmark = (newsId) => {
        setBookmarkedItems(prev => prev.includes(newsId) ? prev.filter(id => id !== newsId) : [...prev, newsId]);
    };

    const handleShare = (newsItem) => {
        const shareText = `${newsItem.title}\n\n${newsItem.summary}\n\nSource: ${newsItem.source}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText);
            alert(`"${newsItem.title}" copied to clipboard!`);
        }
    };

    const handleRead = (newsItem) => {
        alert(`📰 ${newsItem.title}\n\n${newsItem.summary}\n\nSource: ${newsItem.source}\nDate: ${getTimeAgo(newsItem.date)}`);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-black text-white'}`}>
                        <Newspaper className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>
                                Career News & Exam Alerts
                            </h2>
                            {!usingMockData && (
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}>
                                    LIVE
                                </span>
                            )}
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Latest entrance exams, college announcements, and industry hiring trends
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={refreshNews}
                        disabled={isRefreshing}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800' : 'bg-white border-zinc-300 text-black hover:bg-zinc-100'}`}
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold btn-interactive ${notificationsEnabled
                            ? (darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                            : (darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-black')
                            }`}
                    >
                        <Bell className="w-3.5 h-3.5" />
                        <span>{notificationsEnabled ? 'Alerts ON' : 'Notify Me'}</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                <input
                    type="text"
                    placeholder="Search career news, exams, scholarships..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none ${darkMode
                        ? 'bg-[#18181b] border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-400'
                        : 'bg-white border-zinc-300 text-black placeholder-zinc-400 focus:border-black'
                        }`}
                />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border btn-interactive ${isSelected
                                ? (darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                                : (darkMode ? 'bg-[#121215] border-zinc-800 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:text-black')
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{category.id}</span>
                        </button>
                    );
                })}
            </div>

            {/* News Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredNews.slice(0, displayCount).map(item => {
                    const isBookmarked = bookmarkedItems.includes(item.id);

                    return (
                        <div
                            key={item.id}
                            className={`rounded-3xl p-6 border transition-all hover-lift flex flex-col justify-between ${darkMode
                                ? 'bg-[#121215] border-zinc-800 hover:border-zinc-600'
                                : 'bg-white border-zinc-200 hover:border-zinc-400 shadow-sm'
                                }`}
                        >
                            <div>
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{item.image}</span>
                                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'}`}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleBookmark(item.id)}
                                        className={`p-1.5 rounded-lg border btn-interactive ${isBookmarked
                                            ? (darkMode ? 'bg-white text-black' : 'bg-black text-white')
                                            : (darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-500')
                                            }`}
                                    >
                                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                <h3 className={`text-base font-black mb-2 transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
                                    {item.title}
                                </h3>

                                <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    {item.summary}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3 text-zinc-500 text-[11px]">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{getTimeAgo(item.date)}</span>
                                    <span>•</span>
                                    <span>{item.source}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleShare(item)}
                                        className={`p-1.5 rounded-lg border btn-interactive ${darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-black'}`}
                                    >
                                        <Share2 className="w-3 h-3" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleRead(item)}
                                        className={`px-3 py-1 rounded-lg font-bold border btn-interactive text-xs ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-white hover:text-black' : 'bg-black text-white hover:bg-zinc-800'}`}
                                    >
                                        Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredNews.length > displayCount && (
                <div className="text-center pt-4">
                    <button
                        onClick={() => setDisplayCount(prev => prev + 6)}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold border btn-interactive hover-lift ${darkMode ? 'bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800' : 'bg-white border-zinc-300 text-black hover:bg-zinc-100 shadow-sm'}`}
                    >
                        Load More Articles ({filteredNews.length - displayCount} remaining)
                    </button>
                </div>
            )}
        </div>
    );
};

export default CareerNewsFeed;