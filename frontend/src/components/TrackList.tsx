import Image from "next/image";

type Props = {
  tracks: any[];
  selectedTrack: any;
  setSelectedTrack: (track: any) => void;
};

export default function TrackList({ tracks, selectedTrack, setSelectedTrack }: Props) {
  if (tracks.length === 0) return null;

  return (
    <div className="mt-4 space-y-2 w-full max-w-sm">
      {tracks.map((track) => (
        <button
          key={track.id}
          className={`flex items-center w-full text-left px-4 py-2 rounded gap-3 ${
            selectedTrack?.id === track.id
              ? "bg-pink-300 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => setSelectedTrack(track)}
        >
          <Image
            src={track.album.images[0]?.url}
            alt="album"
            width={40}
            height={40}
            className="rounded"
          />
          <div className="text-sm">
            <div className="font-bold">{track.name}</div>
            <div className="text-xs">{track.artists[0]?.name}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
