type Props = {
  query: string;
  setQuery: (q: string) => void;
  onSubmit: (q: string) => void;
};

export default function SearchBox({ query, setQuery, onSubmit }: Props) {
  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <input
          className="border px-3 py-1 rounded-md w-64"
          type="text"
          placeholder="アーティスト名や曲名を入力"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-white border px-3 py-1 rounded-md hover:bg-gray-100"
          onClick={() => onSubmit(query)}
        >
          🔍
        </button>
      </div>
    </div>
  );
}
