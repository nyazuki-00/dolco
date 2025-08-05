import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "@/libs/config";
import Image from "next/image";
import type { Track } from "@/types/track";

export default function TracksPage	() {
  const router = useRouter();
  const { ownerCode } = router.query;
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (typeof ownerCode !== "string") return;

    fetch(`${apiBaseUrl}/track/${ownerCode}`)
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error("履歴の取得に失敗", err));
  }, [router.isReady, ownerCode]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-pink-50 bg-opacity-90 p-6 overflow-y-auto z-50">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="bg-pink-200 hover:bg-pink-300 text-black px-4 py-2 rounded-lg shadow transition"
        >
          ← 戻る
        </button>
      </div>

      {/* メインタイトル */}
      <h2 className="text-xl font-bold text-center text-pink-700 mb-6 border border-pink-200 rounded-lg py-2 px-4 w-fit mx-auto">
        Music
      </h2>

      <div className="flex justify-center items-start mb-6 gap-4">
        {/* ドール */}
        <div className="flex flex-col items-center">
          <Image src="/doll.png" alt="doll" width={100} height={100} />
        </div>

        {/* 吹き出し */}
        <div className="bg-white shadow-lg p-4 rounded-xl w-64 z-50">
          {selectedTrack ? (
            <>
              <p className="text-sm text-gray-700">
                {selectedTrack.artist}の
                <span className="font-bold text-pink-500">
                  {selectedTrack.title}
                </span>
                だね。
              </p>
              <p className="text-sm text-gray-700 mt-1">
                オーナーが「
                {selectedTrack.memo || "..."}
                」って言ってた。
              </p>
              <p className="text-sm mt-1">この曲すき。</p>
            </>
          ) : (
            <p className="text-sm text-gray-700">
              お気に入りの曲を並べているの。<br />
              オーナーが教えてくれた。<br />
              どの曲が気になる？
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-6 items-start justify-center">
        {/* 曲一覧グリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-white shadow-md rounded-xl w-[120px] p-2 flex flex-col items-center text-center cursor-pointer"
              onClick={() => setSelectedTrack(track)}
            >
              <div className="w-[90px] h-[90px] relative rounded overflow-hidden mb-2">
                <Image
                  src={track.imageUrl}
                  alt={`${track.title}のアルバム画像`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p className="text-xs text-gray-500 truncate w-full">{track.artist}</p>
              <p className="text-xs text-gray-400 truncate w-full">{track.albumName}</p>
              <p className="text-sm font-semibold text-pink-600 truncate w-full">
                {track.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
