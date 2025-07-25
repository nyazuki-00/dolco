import { useState, useEffect } from "react";
import Image from "next/image";
import Header from '@/components/Header';
import SearchBox from "@/components/SearchBox";
import TrackList from "@/components/TrackList";
import TrackConfirm from "@/components/TrackConfirm";

export default function Home() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [message, setMessage] = useState("こんにちは、わたしに音楽を教えてくれる？");
  const API_BASE_URL = "http://localhost:3000";

  const handleTrackSubmit = async (query: string) => {
    const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setTracks(data.tracks.items);
    setSelectedTrack(null);
  };

  const handleTrackConfirm = () => {
    if (selectedTrack) {
      setMessage(`わかった... ${selectedTrack.name} 聴くね`);
      setShowSearch(false);
      setTracks([]);
      setQuery("");
      setSelectedTrack(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!res.ok) throw new Error("ユーザー取得失敗");
  
        const data = await res.json();
        setUser(data);
        setMessage(`${data.name}、今日は何をして遊ぶ？`);
      } catch (error) {
        setMessage("こんにちは、わたしに音楽を教えてくれる？");
      }
    };
  
    fetchUser();
  }, []);

  return (
    <main className="pt-16 min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <Header />
      <Image src="/doll.png" alt="doll" width={150} height={150} />
      <p className="bg-white px-4 py-2 mt-4 rounded shadow text-sm text-center max-w-xs">
        {message}
      </p>

      <div className="mt-6 flex gap-4">
        <button
          className="bg-pink-300 text-black px-4 py-2 rounded-md"
          onClick={() => setShowSearch(true)}
        >
          音楽を教える
        </button>
        <button className="bg-blue-200 px-4 py-2 rounded shadow">写真を見せる</button>
      </div>

      {showSearch && (
        <SearchBox query={query} setQuery={setQuery} onSubmit={handleTrackSubmit} />
      )}

      <TrackList tracks={tracks} selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} />

      {selectedTrack && (
        <TrackConfirm selectedTrack={selectedTrack} onConfirm={handleTrackConfirm} />
      )}
    </main>
  );
}
