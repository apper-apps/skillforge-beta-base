import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navigationItems = [
    { name: 'Browse', path: '/', icon: 'Grid3x3' },
    { name: 'My Learning', path: '/my-learning', icon: 'BookOpen' },
    { name: 'Schedule', path: '/schedule', icon: 'Calendar' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Search functionality would be implemented here
    console.log('Searching for:', query);
  };

return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
              <ApperIcon name="GraduationCap" size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">SkillForge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? 'text-white bg-white/20 backdrop-blur-sm'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search workshops..."
              className="w-full"
            />
          </div>

          {/* Mobile Menu Button */}
<button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ApperIcon name={isMenuOpen ? 'X' : 'Menu'} size={24} className="text-white" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search workshops..."
            className="w-full"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
className="lg:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 border-t border-white/20 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-white bg-white/20 backdrop-blur-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <ApperIcon name={item.icon} size={16} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;