import { useState } from "react";

// 게임 데이터
const gamesData = [
  {
    id: 1,
    title: "위쳐 3: 와일드 헌트",
    image: "/api/placeholder/250/150",
    tags: ["RPG", "오픈월드", "액션", "판타지", "싱글플레이어"],
  },
  {
    id: 2,
    title: "엘든 링",
    image: "/api/placeholder/250/150",
    tags: ["RPG", "오픈월드", "액션", "다크판타지", "소울라이크"],
  },
  {
    id: 3,
    title: "스타크래프트 2",
    image: "/api/placeholder/250/150",
    tags: ["전략", "RTS", "SF", "멀티플레이어"],
  },
  {
    id: 4,
    title: "발로란트",
    image: "/api/placeholder/250/150",
    tags: ["FPS", "전술", "액션", "멀티플레이어", "경쟁게임"],
  },
  {
    id: 5,
    title: "동물의 숲",
    image: "/api/placeholder/250/150",
    tags: ["시뮬레이션", "캐주얼", "생활시뮬레이션", "귀여운"],
  },
  {
    id: 6,
    title: "FIFA 24",
    image: "/api/placeholder/250/150",
    tags: ["스포츠", "축구", "시뮬레이션", "멀티플레이어"],
  },
  {
    id: 7,
    title: "마인크래프트",
    image: "/api/placeholder/250/150",
    tags: ["샌드박스", "생존", "어드벤처", "크래프팅", "멀티플레이어"],
  },
  {
    id: 8,
    title: "오버워치 2",
    image: "/api/placeholder/250/150",
    tags: ["FPS", "팀플레이", "히어로슈터", "멀티플레이어"],
  },
];

// 인기 태그 데이터
const popularTags = [
  "RPG", "액션", "전략", "어드벤처", "시뮬레이션", 
  "스포츠", "FPS", "멀티플레이어", "오픈월드", "인디"
];

// 게임 카드 컴포넌트 (props: 3개)
const GameCard = ({ game, isHighlighted, onCardClick }) => {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-1 ${isHighlighted ? 'ring-2 ring-blue-500' : ''}`}
      onClick={() => onCardClick(game)}
    >
      <img 
        src={game.image} 
        alt={game.title} 
        className="w-full h-40 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{game.title}</h3>
        <div className="flex flex-wrap gap-1">
          {game.tags.map(tag => (
            <span key={tag} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// 태그 컴포넌트
const TagButton = ({ tag, isActive, onClick }) => {
  return (
    <button
      className={`px-3 py-1 rounded-full text-sm ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
      onClick={() => onClick(tag)}
    >
      {tag}
    </button>
  );
};

// 검색 컴포넌트
const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="게임 태그를 입력하세요"
        className="flex-grow p-2 border border-gray-300 rounded"
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        검색
      </button>
    </div>
  );
};

// 메인 앱 컴포넌트
export default function GameTagSearch() {
  // State 정의: 3개
  const [searchQuery, setSearchQuery] = useState("");  // 검색어
  const [filteredGames, setFilteredGames] = useState(gamesData);  // 필터링된 게임 목록
  const [selectedGame, setSelectedGame] = useState(null);  // 선택된 게임
  
  // 검색 함수
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredGames(gamesData);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = gamesData.filter(game => 
      game.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    setFilteredGames(results);
  };
  
  // 태그 클릭 함수
  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    const results = gamesData.filter(game => 
      game.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    setFilteredGames(results);
  };
  
  // 게임 카드 클릭 함수
  const handleGameCardClick = (game) => {
    setSelectedGame(game.id === selectedGame?.id ? null : game);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-900 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">게임 태그 검색</h1>
        <p>원하는 태그로 게임을 검색해보세요!</p>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">게임 검색</h2>
          
          <SearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
            onSearch={handleSearch} 
          />
          
          <div className="mt-4">
            <h3 className="font-medium mb-2">인기 태그</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <TagButton 
                  key={tag} 
                  tag={tag} 
                  isActive={searchQuery === tag} 
                  onClick={handleTagClick} 
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">검색 결과</h2>
          
          {filteredGames.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  isHighlighted={selectedGame?.id === game.id}
                  onCardClick={handleGameCardClick} 
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}