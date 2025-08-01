import { useState } from "react";
import { apiBaseUrl } from "@/libs/config";

type Props = {
  selectedTrack: any;
  onConfirm: () => void;
};

export default function TrackConfirm({ selectedTrack, onConfirm }: Props) {
  const token = localStorage.getItem("token");
  const [memo, setMemo] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleConfirm = async () => {
    try {
      await fetch(`${apiBaseUrl}/music`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          spotifyId: selectedTrack.id,
          title: selectedTrack.name,
          artist: selectedTrack.artists?.[0]?.name ?? "",
          imageUrl: selectedTrack.album?.images?.[0]?.url ?? "",
          spotifyUrl: selectedTrack.external_urls?.spotify ?? "",
          albumName: selectedTrack.album?.name ?? "",
          memo,
          tags,
        }),
      });
      onConfirm();
    } catch (error) {
      console.error("Error posting music:", error);
    }
  };

  return (
    <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow flex flex-col items-center gap-2">
      <textarea
        placeholder="メモ（自由記入）"
        className="border border-pink-300 bg-pink-50 rounded-md p-3 text-base w-full"
        rows={3}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <input
        type="text"
        placeholder="タグを入力してEnter"
        className="border border-pink-200 bg-white rounded-md p-2 text-sm w-full"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagInput}
      />
      <div className="flex flex-wrap gap-2 w-full">
        {tags.map((tag, index) => (
          <span key={index} className="bg-pink-200 px-2 py-1 rounded text-sm">
            #{tag}
          </span>
        ))}
      </div>
  
      <button
        className="bg-pink-300 text-black px-4 py-2 rounded-md hover:bg-pink-400"
        onClick={handleConfirm}
      >
        これ聴いてみて！
      </button>
      <a
        href={selectedTrack.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-600 underline"
      >
        🎵 Spotifyで開く
      </a>
    </div>
  );  
}
