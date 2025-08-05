import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { apiBaseUrl } from "@/libs/config";
import { useLoginUserContext } from "@/contexts/LoginUserContext";
import Image from "next/image";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import TrackList from "@/components/TrackList";
import TrackConfirm from "@/components/TrackConfirm";

export default function Home() {
  const router = useRouter();
  const { loginUser } = useLoginUserContext();
  const { ownerCode: routeOwnerCode } = router.query;
  const [ownerCode, setOwnerCode] = useState<string | null>(null);
  const [isMyRoom, setIsMyRoom] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [message, setMessage] = useState("こんにちは、わたしに音楽を教えてくれる？");

  const handleTrackSubmit = async (query: string) => {
    const res = await fetch(`${apiBaseUrl}/track/search?q=${encodeURIComponent(query)}`);
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
    if (!loginUser || !ownerCode) return;
    const isMine = loginUser.ownerCode === ownerCode;
    setIsMyRoom(isMine);

    if (isMine) {
      setMessage(`${loginUser.name}、今日は何をして遊ぶ？`);
    } else {
      setMessage(`ようこそ、${loginUser.name}さん。オーナーのこと知りたい？`);
    }
  }, [loginUser, ownerCode]);

  useEffect(() => {
    if (typeof routeOwnerCode === "string") {
      setOwnerCode(routeOwnerCode);
    }
  }, [routeOwnerCode]);

  return (
    <main className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4">
      <Header />

      <div className="flex gap-4 overflow-x-auto w-full justify-center mb-6">
        <Image
          src="/shelf.png"
          alt="track shelf"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={() => router.push(`/users/${ownerCode}/tracks`)}
        />
        <Image
          src="/shelf.png"
          alt="track shelf"
          width={200}
          height={200}
          className="cursor-pointer"
          onClick={() => router.push(`/users/${ownerCode}/tracks`)}
        />
      </div>

      <Image src="/doll.png" alt="doll" width={150} height={150} />

      <p className="bg-white px-4 py-2 mt-4 rounded shadow text-sm text-center max-w-xs">
        {showSearch ? "どんな音楽？" : message}
      </p>

      <div className="mt-6 flex gap-4">
        {!showSearch && isMyRoom && (
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
