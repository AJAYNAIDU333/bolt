import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { 
  Newspaper, 
  Settings, 
  LogOut, 
  Menu as MenuIcon, 
  Bookmark,
  Instagram,
  Facebook,
  Share2,
  MessageCircle
} from 'lucide-react';

// Sample articles data with real Unsplash images
const articlesData = [
  {
    category: "technology",
    title: "New AI Breakthrough Announced",
    summary: "A cutting-edge breakthrough in artificial intelligence promises to revolutionize machine learning.",
    sentiment: "positive",
    explanation: "Innovation in AI creates new opportunities.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    link: "https://www.bbc.com/news/technology"
  },
  {
    category: "technology",
    title: "Tech Giant Releases Latest Gadget",
    summary: "The latest gadget features innovative design and smart functionality.",
    sentiment: "positive",
    explanation: "Consumers are excited about its features.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/tech"
  },
  {
    category: "cricket",
    title: "India Clinches Series Win",
    summary: "In a thrilling series, India wins with a last-ball finish.",
    sentiment: "positive",
    explanation: "Excitement peaks as the team triumphs.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/sports/cricket"
  },
  {
    category: "cricket",
    title: "Rising Star Shines in Domestic League",
    summary: "A promising young player captivates audiences with an impressive performance.",
    sentiment: "positive",
    explanation: "A bright future in cricket is on the horizon.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/sports/cricket"
  },
  {
    category: "politics",
    title: "Election Campaign Heats Up",
    summary: "Candidates ramp up their campaigns as elections draw near.",
    sentiment: "neutral",
    explanation: "Voters remain divided over policies.",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=60",
    link: "https://www.bbc.com/news/politics"
  },
  {
    category: "politics",
    title: "New Policy Reforms Announced",
    summary: "Government unveils reforms aimed at boosting economic growth.",
    sentiment: "positive",
    explanation: "Reforms receive positive feedback.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/politics"
  },
  {
    category: "sports",
    title: "Local Marathon Draws Record Participation",
    summary: "The annual marathon saw record numbers as runners took to the streets.",
    sentiment: "positive",
    explanation: "Community spirit shines through.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/sports"
  },
  {
    category: "sports",
    title: "Championship Final Ends in Controversy",
    summary: "Controversial referee decisions overshadow the final.",
    sentiment: "negative",
    explanation: "Disputes spark debates.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/sports"
  },
  {
    category: "business",
    title: "Market Sees Steady Growth",
    summary: "The stock market recorded steady growth amid positive economic data.",
    sentiment: "positive",
    explanation: "Investors are optimistic.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
    link: "https://www.bbc.com/news/business"
  },
  {
    category: "business",
    title: "Major Merger in the Tech Sector",
    summary: "Two tech giants have merged, promising to reshape the industry.",
    sentiment: "positive",
    explanation: "Industry experts weigh in.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/business"
  },
  {
    category: "world",
    title: "Global Leaders Meet for Summit",
    summary: "World leaders convene to discuss pressing international issues.",
    sentiment: "neutral",
    explanation: "The summit is expected to produce mixed outcomes.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop&q=60",
    link: "https://www.bbc.com/news/world"
  },
  {
    category: "world",
    title: "Historic Peace Agreement Signed",
    summary: "A landmark peace agreement has ended decades of conflict.",
    sentiment: "positive",
    explanation: "A hopeful step towards stability.",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=60",
    link: "https://www.bbc.com/news/world"
  },
  {
    category: "education",
    title: "New Education Reforms Introduced",
    summary: "Sweeping reforms aim to modernize the education system.",
    sentiment: "positive",
    explanation: "Reforms are welcomed by educators.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
    link: "https://timesofindia.indiatimes.com/education"
  },
  {
    category: "education",
    title: "Online Learning Platforms Expand",
    summary: "Digital learning platforms report significant growth amid rising demand.",
    sentiment: "positive",
    explanation: "The shift to online education shows promise.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
    link: "https://www.bbc.com/news/education"
  }
];

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [articleStatuses, setArticleStatuses] = useState(
    articlesData.map(() => ({ read: false, saved: false }))
  );

  // For registration fields
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const categories = [
    'all', 'technology', 'cricket', 'politics', 
    'sports', 'business', 'world', 'education'
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articlesData 
    : articlesData.filter(article => article.category === activeCategory);

  const savedArticles = articlesData.filter((_, index) => articleStatuses[index].saved);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setCurrentView('dashboard');
    } else {
      alert('Please enter your email and password.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regEmail && regPassword && regPassword === regConfirm) {
      alert('Account created successfully! Please sign in.');
      setCurrentView('login');
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

  const toggleArticleStatus = (index: number, key: 'read' | 'saved') => {
    setArticleStatuses(prev => {
      const newStatuses = [...prev];
      newStatuses[index] = { 
        ...newStatuses[index], 
        [key]: !newStatuses[index][key] 
      };
      return newStatuses;
    });
  };

  const handleShare = (link: string) => {
    // In a real app, this would use the actual sharing APIs
    const shareOptions = [
      { name: 'Instagram', icon: Instagram, action: () => window.open(`https://instagram.com/share?url=${link}`) },
      { name: 'Facebook', icon: Facebook, action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${link}`) },
      { name: 'WhatsApp', icon: MessageCircle, action: () => window.open(`https://wa.me/?text=${link}`) }
    ];

    return (
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="px-3 py-1 rounded-md text-sm bg-gray-300 text-gray-700 hover:bg-gray-400 flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          Share
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {shareOptions.map((option) => (
              <Menu.Item key={option.name}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700`}
                    onClick={option.action}
                  >
                    <option.icon className="h-4 w-4" />
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    );
  };

  const MobileMenu = () => (
    <div className={`${
      isMenuOpen ? 'block' : 'hidden'
    } md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50`}>
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <span className="sr-only">Close menu</span>
              ×
            </button>
          </div>
          <nav className="space-y-6">
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Newspaper className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentView('saved');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Bookmark className="h-5 w-5" />
              Saved Articles
            </button>
            <button
              onClick={() => {
                setCurrentView('preferences');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Settings className="h-5 w-5" />
              News Preferences
            </button>
            <button
              onClick={() => {
                setCurrentView('login');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </nav>
        </div>
      </div>
    </div>
  );

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => setCurrentView('register')}
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="regEmail" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="regEmail"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="regPassword" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="regPassword"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="regConfirm" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="regConfirm"
                  type="password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                className="text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => setCurrentView('login')}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view with articles and additional actions
  return (
    <div className="min-h-screen bg-[#EEEEEE] flex flex-col">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">News Digest</span>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <Newspaper className="h-5 w-5" />
                Dashboard
              </button>
              <button 
                onClick={() => setCurrentView('saved')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <Bookmark className="h-5 w-5" />
                Saved Articles
              </button>
              <button 
                onClick={() => setCurrentView('preferences')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <Settings className="h-5 w-5" />
                News Preferences
              </button>
              <button 
                onClick={() => setCurrentView('login')}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && (
          <>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Articles */}
            <div className="space-y-6">
              {filteredArticles.map((article, index) => (
                <div key={index} className="bg-[#E8E9EB] rounded-lg shadow-md overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          article.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          article.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.sentiment.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{article.summary}</p>
                      <p className="text-sm text-gray-500 mb-4">{article.explanation}</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleArticleStatus(index, 'read')}
                          className={`px-3 py-1 rounded-md text-sm ${
                            articleStatuses[index].read ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'
                          }`}
                        >
                          {articleStatuses[index].read ? 'Read' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => toggleArticleStatus(index, 'saved')}
                          className={`px-3 py-1 rounded-md text-sm ${
                            articleStatuses[index].saved ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'
                          }`}
                        >
                          {articleStatuses[index].saved ? 'Saved' : 'Save'}
                        </button>
                        {handleShare(article.link)}
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentView === 'saved' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Saved Articles</h2>
            {savedArticles.length === 0 ? (
              <p className="text-gray-600">No saved articles yet.</p>
            ) : (
              savedArticles.map((article, index) => (
                <div key={index} className="bg-[#E8E9EB] rounded-lg shadow-md overflow-hidden">
                  {/* Same article layout as in dashboard */}
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h2>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          article.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                          article.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {article.sentiment.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{article.summary}</p>
                      <p className="text-sm text-gray-500 mb-4">{article.explanation}</p>
                      <div className="flex flex-wrap gap-2">
                        {handleShare(article.link)}
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {currentView === 'preferences' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">News Preferences</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Topics</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Technology, Health"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Keywords</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., AI, COVID-19"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Sources</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., BBC, CNN"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Preferences
              </button>
            </form>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p>&copy; 2025 News Digest. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;