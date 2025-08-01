import { useState, useEffect } from "react";
import { apiBaseUrl } from "@/libs/config";
import Image from "next/image";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import TrackList from "@/components/TrackList";
import TrackConfirm from "@/components/TrackConfirm";
import MusicHistoryModal from "@/components/MusicHistoryModal";
import type { Music } from "@/types/music";

export default function Home() {
  const [user, setUser] = useState<{ name: string, ownerCode: string } | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [showMusicHistory, setShowMusicHistory] = useState(false);
  const [message, setMessage] = useState("こんにちは、わたしに音楽を教えてくれる？");
  const [musicHistory, setMusicHistory] = useState<Music[]>([]);

  const handleTrackSubmit = async (query: string) => {
    const res = await fetch(`${apiBaseUrl}/music/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setTracks(data.tracks.items);
    setSelectedTrack(null);
  };

  const handleTrackConfirm = () => {
    if (selectedTrack) {
      setMessage(`ふーん... ${selectedTrack.name} 聴くね`);
      setShowSearch(false);
      setQuery("");
      setTracks([]);
      setSelectedTrack(null);
    }
  };

  const handleCancelSearch = () => {
    setShowSearch(false);
    setQuery("");
    setTracks([]);
    setSelectedTrack(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    const ownerCode = user?.ownerCode;
    if (!ownerCode || !showMusicHistory) return;
  
    fetch(`${apiBaseUrl}/music/${ownerCode}`)
      .then((res) => res.json())
      .then((data) => setMusicHistory(data))
      .catch((err) => console.error("音楽履歴の取得に失敗", err));
  }, [user?.ownerCode, showMusicHistory]);

  return (
    <main className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <Header />
      <Image
        src="/shelf.png"
        alt="music history"
        width={200}
        height={200}
        className="absolute top-20 left-20 cursor-pointer"
        onClick={() => setShowMusicHistory(true)}
      />

    {showMusicHistory && (
      <MusicHistoryModal
        musicHistory={musicHistory}
        onClose={() => setShowMusicHistory(false)}
      />
    )}

      <Image src="/doll.png" alt="doll" width={150} height={150} />
      <p className="bg-white px-4 py-2 mt-4 rounded shadow text-sm text-center max-w-xs">
        {showSearch ? "どんな音楽？" : message}
      </p>

      <div className="mt-6 flex gap-4">
        {!showSearch && (
          <>
            <button
              className="bg-pink-300 text-black px-4 py-2 rounded-md"
              onClick={() => setShowSearch(true)}
            >
              音楽を教える
            </button>
            <button className="bg-blue-200 px-4 py-2 rounded shadow">写真を見せる</button>
          </>
        )}

        {showSearch && (
          <button
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={handleCancelSearch}
          >
            やっぱやめる
          </button>
        )}
      </div>

      {showSearch && (
        <SearchBox query={query} setQuery={setQuery} onSubmit={handleTrackSubmit} />
      )}

      <TrackList
        tracks={tracks}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
      />

      {selectedTrack && (
        <TrackConfirm selectedTrack={selectedTrack} onConfirm={handleTrackConfirm} />
      )}
    </main>
  );
}
