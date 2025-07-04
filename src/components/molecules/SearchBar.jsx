import { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search workshops...", className = '' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon="Search"
          iconPosition="left"
          className="w-full"
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        icon="Search"
        disabled={!query.trim()}
      >
        Search
      </Button>
      
      {query && (
        <Button
          type="button"
          variant="ghost"
          icon="X"
          onClick={handleClear}
        />
      )}
    </form>
  );
};

export default SearchBar;