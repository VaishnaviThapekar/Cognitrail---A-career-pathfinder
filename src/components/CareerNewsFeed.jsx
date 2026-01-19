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
        { id: 'All', icon: Newspaper, color: 'indigo' },
        { id: 'Exams', icon: GraduationCap, color: 'blue' },
        { id: 'Scholarships', icon: Award, color: 'yellow' },
        { id: 'Jobs', icon: Briefcase, color: 'green' },
        { id: 'Trends', icon: TrendingUp, color: 'purple' }
    ];

    // Fetch real-time news on component mount
    useEffect(() => {
        const loadNews = async () => {
            setLoading(true);
            try {
                const realNews = await fetchCareerNewsWithCache();

                if (realNews && realNews.length > 0) {
                    setNews(realNews);
                    setFilteredNews(realNews);
                    setUsingMockData(false);
                    console.log('✅ Loaded real-time career news:', realNews.length, 'articles');
                } else {
                    // Fallback to mock data if API fails
                    setNews(mockNewsData);
                    setFilteredNews(mockNewsData);
                    setUsingMockData(true);
                    console.log('⚠️ Using mock data (API unavailable)');
                }
            } catch (error) {
                console.error('Error loading news:', error);
                setNews(mockNewsData);
                setFilteredNews(mockNewsData);
                setUsingMockData(true);
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    // Refresh news manually
    const refreshNews = async () => {
        setIsRefreshing(true);
        clearNewsCache(); // Clear cache to force fresh fetch

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
            console.error('Error refreshing news:', error);
            alert('❌ Failed to refresh news. Please try again later.');
        } finally {
            setIsRefreshing(false);
        }
    };

    // Simulated news data - In production, this would come from an API
    const mockNewsData = [
        {
            id: 1,
            category: 'Exams',
            title: 'JEE Main 2026 Registration Opens - Apply Now',
            summary: 'NTA has announced JEE Main 2026 session 1 registration. Last date to apply is March 15, 2026.',
            date: '2026-01-16',
            source: 'NTA Official',
            url: '#',
            image: '📝',
            trending: true
        },
        {
            id: 2,
            category: 'Scholarships',
            title: 'PM Scholarship Scheme: ₹3000/month for Meritorious Students',
            summary: 'Government announces new scholarship for students scoring above 85% in 12th. Applications open until February 28.',
            date: '2026-01-15',
            source: 'Education Ministry',
            url: '#',
            image: '🎓',
            featured: true
        },
        {
            id: 3,
            category: 'Trends',
            title: 'AI & Machine Learning Jobs Surge by 47% in 2026',
            summary: 'Latest report shows exponential growth in AI career opportunities. Average salary: ₹12-25 LPA for freshers.',
            date: '2026-01-14',
            source: 'NASSCOM Report',
            url: '#',
            image: '🤖',
            trending: true
        },
        {
            id: 4,
            category: 'Jobs',
            title: 'ISRO Announces 200+ Scientist Positions',
            summary: 'Indian Space Research Organization opens applications for engineers and scientists. Apply before January 31.',
            date: '2026-01-13',
            source: 'ISRO Careers',
            url: '#',
            image: '🚀',
            featured: true
        },
        {
            id: 5,
            category: 'Exams',
            title: 'NEET UG 2026: Important Dates Announced',
            summary: 'NTA releases NEET UG schedule. Exam date: May 4, 2026. Registration starts February 1.',
            date: '2026-01-12',
            source: 'NTA',
            url: '#',
            image: '⚕️'
        },
        {
            id: 6,
            category: 'Trends',
            title: 'Top 10 Emerging Careers for 2026-2030',
            summary: 'Data Scientists, Cybersecurity Experts, and Renewable Energy Engineers top the list.',
            date: '2026-01-11',
            source: 'LinkedIn Jobs Report',
            url: '#',
            image: '📊',
            trending: true
        },
        {
            id: 7,
            category: 'Scholarships',
            title: 'Google Scholarship for Women in Tech: $10,000',
            summary: 'Google announces scholarship for female students pursuing CS/IT. Deadline: March 1, 2026.',
            date: '2026-01-10',
            source: 'Google.org',
            url: '#',
            image: '💻'
        },
        {
            id: 8,
            category: 'Jobs',
            title: 'TCS, Infosys, Wipro to Hire 100K+ Freshers',
            summary: 'IT giants announce massive campus hiring drive. Package: ₹3.5-7 LPA. Registration open.',
            date: '2026-01-09',
            source: 'Industry News',
            url: '#',
            image: '💼'
        },
        {
            id: 9,
            category: 'Exams',
            title: 'CAT 2026: Exam Pattern Changes Announced',
            summary: 'IIMs introduce new question types in quantitative section. Check updated syllabus.',
            date: '2026-01-08',
            source: 'IIM Bangalore',
            url: '#',
            image: '📚'
        },
        {
            id: 10,
            category: 'Trends',
            title: 'Remote Work Revolution: 60% Jobs Now Offer WFH',
            summary: 'Post-pandemic shift continues. Companies embrace hybrid models permanently.',
            date: '2026-01-07',
            source: 'Work Trends 2026',
            url: '#',
            image: '🏠'
        }
    ];

    useEffect(() => {
        let filtered = news;

        // Filter by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filter by search query
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
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getCategoryColor = (category) => {
        const cat = categories.find(c => c.id === category);
        return cat?.color || 'gray';
    };

    const handleBookmark = (newsId) => {
        setBookmarkedItems(prev => {
            if (prev.includes(newsId)) {
                // Remove bookmark
                return prev.filter(id => id !== newsId);
            } else {
                // Add bookmark
                return [...prev, newsId];
            }
        });
    };

    const handleShare = (newsItem) => {
        const shareText = `${newsItem.title}\n\n${newsItem.summary}\n\nSource: ${newsItem.source}`;

        if (navigator.share) {
            // Use native share if available (mobile)
            navigator.share({
                title: newsItem.title,
                text: shareText,
                url: window.location.href
            }).catch(() => {
                // Fallback to clipboard
                copyToClipboard(shareText, newsItem.title);
            });
        } else {
            // Fallback to clipboard
            copyToClipboard(shareText, newsItem.title);
        }
    };

    const copyToClipboard = (text, title) => {
        navigator.clipboard.writeText(text).then(() => {
            alert(`"${title}" copied to clipboard! Share it anywhere you like.`);
        }).catch(() => {
            alert('Unable to copy. Please try again.');
        });
    };

    const handleRead = (newsItem) => {
        // In production, this would open the full article
        // For now, show an alert with the summary
        alert(`📰 ${newsItem.title}\n\n${newsItem.summary}\n\nSource: ${newsItem.source}\nDate: ${getTimeAgo(newsItem.date)}\n\nIn the full version, this would open the complete article.`);
    };

    const loadMoreNews = () => {
        setDisplayCount(prev => prev + 6);
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        if (!notificationsEnabled) {
            alert('🔔 Notifications enabled! You\'ll receive updates about new career opportunities, exams, and scholarships.');
        } else {
            alert('🔕 Notifications disabled.');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${darkMode ? 'bg-[#272757]' : 'bg-indigo-50'
                        }`}>
                        <Newspaper className={`w-6 h-6 ${darkMode ? 'text-[#8686AC]' : 'text-indigo-600'
                            }`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                Career News & Updates
                            </h2>
                            {!usingMockData && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-white"></span>
                                    LIVE
                                </span>
                            )}
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            {usingMockData ? 'Sample news (enable API for real-time updates)' : 'Latest opportunities, exams, and trends'}
                            {bookmarkedItems.length > 0 && (
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${darkMode ? 'bg-[#505081] text-white' : 'bg-indigo-600 text-white'
                                    }`}>
                                    {bookmarkedItems.length} bookmarked
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Refresh Button */}
                    <button
                        onClick={refreshNews}
                        disabled={isRefreshing}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${darkMode
                            ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC]'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                            } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Refresh news"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span className="font-semibold text-sm hidden md:inline">
                            {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </span>
                    </button>

                    {/* Notifications Button */}
                    <button
                        onClick={toggleNotifications}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${notificationsEnabled
                            ? darkMode
                                ? 'bg-[#505081] text-white'
                                : 'bg-indigo-600 text-white'
                            : darkMode
                                ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC]'
                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                            }`}
                    >
                        <Bell className={`w-4 h-4 ${notificationsEnabled ? 'animate-pulse' : ''}`} />
                        <span className="font-semibold text-sm hidden md:inline">
                            {notificationsEnabled ? 'On' : 'Notify'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl transition-all ${darkMode
                        ? 'bg-[#1a1f2e] border-[#272757] text-white placeholder-gray-500'
                        : 'bg-white border-indigo-100 text-gray-900 placeholder-gray-400'
                        } border focus:outline-none focus:ring-2 focus:ring-[#505081]`}
                />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
                {categories.map(category => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${isSelected
                                ? darkMode
                                    ? 'bg-[#272757] text-[#8686AC] border-2 border-[#505081]'
                                    : 'bg-indigo-600 text-white shadow-lg'
                                : darkMode
                                    ? 'bg-[#1a1f2e] border border-[#272757] text-gray-400 hover:bg-[#272757]'
                                    : 'bg-white border border-indigo-100 text-gray-600 hover:bg-indigo-50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {category.id}
                        </button>
                    );
                })}
            </div>

            {/* News Grid */}
            {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div
                            key={i}
                            className={`rounded-2xl p-6 animate-pulse ${darkMode ? 'bg-[#1a1f2e]' : 'bg-gray-100'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                    }`}></div>
                                <div className={`h-6 w-20 rounded-full ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                    }`}></div>
                            </div>
                            <div className={`h-5 rounded mb-3 ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                }`}></div>
                            <div className={`h-4 rounded mb-2 ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                }`}></div>
                            <div className={`h-4 rounded w-3/4 ${darkMode ? 'bg-[#272757]' : 'bg-gray-200'
                                }`}></div>
                        </div>
                    ))}
                </div>
            ) : filteredNews.length === 0 ? (
                <div className="text-center py-12">
                    <Newspaper className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'
                        }`} />
                    <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        No news found matching your criteria
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredNews.slice(0, displayCount).map(item => {
                        const isBookmarked = bookmarkedItems.includes(item.id);

                        return (
                            <div
                                key={item.id}
                                className={`group rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${darkMode
                                    ? 'bg-[#1a1f2e] border border-[#272757] hover:border-[#505081]'
                                    : 'bg-white border border-indigo-100 hover:border-indigo-300 shadow-lg'
                                    }`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-4xl">{item.image}</span>
                                        <div>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${darkMode
                                                ? 'bg-[#272757] text-[#8686AC]'
                                                : 'bg-indigo-50 text-indigo-700'
                                                }`}>
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    {(item.trending || item.featured) && (
                                        <div className="flex gap-1">
                                            {item.trending && (
                                                <TrendingUp className="w-5 h-5 text-orange-500" />
                                            )}
                                            {item.featured && (
                                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className={`text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#8686AC] transition-colors ${darkMode ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {item.title}
                                </h3>

                                {/* Summary */}
                                <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    {item.summary}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-opacity-10 border-gray-500">
                                    <div className="flex items-center gap-4 text-xs">
                                        <div className={`flex items-center gap-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                            <Clock className="w-3 h-3" />
                                            {getTimeAgo(item.date)}
                                        </div>
                                        <div className={`${darkMode ? 'text-gray-500' : 'text-gray-500'
                                            }`}>
                                            {item.source}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBookmark(item.id);
                                            }}
                                            className={`p-1.5 rounded-lg transition-all ${isBookmarked
                                                ? darkMode
                                                    ? 'bg-[#505081] text-[#8686AC]'
                                                    : 'bg-indigo-600 text-white'
                                                : darkMode
                                                    ? 'hover:bg-[#272757] text-gray-500'
                                                    : 'hover:bg-indigo-50 text-gray-400'
                                                }`}
                                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this'}
                                        >
                                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare(item);
                                            }}
                                            className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#272757]' : 'hover:bg-indigo-50'
                                                }`}
                                            title="Share this news"
                                        >
                                            <Share2 className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'
                                                }`} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRead(item);
                                            }}
                                            className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${darkMode
                                                ? 'bg-[#272757] hover:bg-[#505081] text-[#8686AC]'
                                                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                                                }`}
                                            title="Read full article"
                                        >
                                            <span className="text-xs font-semibold">Read</span>
                                            <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Load More */}
            {filteredNews.length > displayCount && (
                <div className="text-center pt-4">
                    <button
                        onClick={loadMoreNews}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${darkMode
                            ? 'bg-[#1a1f2e] border border-[#272757] text-white hover:bg-[#272757]'
                            : 'bg-white border border-indigo-200 text-gray-900 hover:bg-indigo-50 shadow-lg'
                            }`}
                    >
                        Load More News ({filteredNews.length - displayCount} remaining)
                    </button>
                </div>
            )}

            {/* Show message when all loaded */}
            {filteredNews.length > 0 && displayCount >= filteredNews.length && filteredNews.length > 6 && (
                <div className="text-center pt-4">
                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        ✨ You've reached the end! Check back later for more updates.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CareerNewsFeed;