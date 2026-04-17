'use client';
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const USDT_ADDRESS = "DLtut1ryErBD2Tw4a2G3nJs1FCrHo69cYrCC6DzYk5Uf";   // ← Change this
const BTC_ADDRESS = "bc1qlxvxk0nrzghhzawl3fhuxtrnqrgerza8czmatm";           // ← Change this

export default function Home() {
  const [is18, setIs18] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [playingVideo, setPlayingVideo] = useState<any>(null);

  // Free Videos
  const freeVideos = [
    { 
      id: 1, 
      title: "Free Sample 1 - Teaser", 
      thumb: "https://picsum.photos/id/1015/300/200", 
      duration: "02:30",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
    },
    { 
      id: 2, 
      title: "Free Sample 2 - Short Clip", 
      thumb: "https://picsum.photos/id/133/300/200", 
      duration: "01:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
    },
  ];

  // Premium Videos
  const premiumVideos = [
    { id: 3, title: "Premium - Passionate Night", thumb: "https://picsum.photos/id/201/300/200", duration: "15:20" },
    { id: 4, title: "Premium - Wild Desire", thumb: "https://picsum.photos/id/206/300/200", duration: "12:45" },
    { id: 5, title: "Premium - Secret Encounter", thumb: "https://picsum.photos/id/180/300/200", duration: "18:10" },
  ];

  const openDonationModal = (video: any) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  if (!is18) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-10 max-w-md">
          <h1 className="text-6xl font-bold mb-6 text-red-500">🔞 XXXVault</h1>
          <p className="mb-10 text-xl">This website contains adult 18+ material.<br/>You must be 18 or older to enter.</p>
          <button 
            onClick={() => setIs18(true)}
            className="bg-red-600 hover:bg-red-700 px-16 py-6 rounded-2xl text-2xl font-bold transition-all"
          >
            YES, I AM 18+
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 p-5 flex justify-center items-center sticky top-0 bg-zinc-950 z-50">
        <h1 className="text-4xl font-bold text-red-500">XXXVault</h1>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-green-500">✅ Free Videos (Watch Now)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {freeVideos.map(video => (
            <div key={video.id} className="bg-zinc-900 rounded-2xl overflow-hidden">
              <div className="relative">
                {playingVideo?.id === video.id ? (
                  <video controls autoPlay className="w-full aspect-video" src={video.videoUrl} />
                ) : (
                  <>
                    <img src={video.thumb} className="w-full aspect-video object-cover" />
                    <button 
                      onClick={() => setPlayingVideo(video)}
                      className="absolute inset-0 flex items-center justify-center bg-black/60 hover:bg-black/40"
                    >
                      <div className="bg-red-600 rounded-full p-6 text-4xl">▶</div>
                    </button>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-6 text-yellow-500">🔒 Premium Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {premiumVideos.map(video => (
            <div key={video.id} className="bg-zinc-900 rounded-2xl overflow-hidden group">
              <div className="relative">
                <img src={video.thumb} alt={video.title} className="w-full aspect-video object-cover" />
                <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 text-xs rounded">{video.duration}</div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold mb-4">{video.title}</h3>
                <button 
                  onClick={() => openDonationModal(video)}
                  className="w-full bg-gradient-to-r from-purple-600 to-red-600 py-4 rounded-xl font-bold text-lg hover:brightness-110"
                >
                  💰 Donate to Unlock
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Donation Modal - Horizontal QR Codes */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4">
          <div className="bg-zinc-900 rounded-3xl max-w-2xl w-full p-8">
            <h3 className="text-2xl font-bold mb-2">Unlock "{selectedVideo.title}"</h3>
            <p className="text-gray-400 mb-8">Send any amount you want</p>

            <div className="grid grid-cols-2 gap-8">
              {/* USDT */}
              <div className="text-center">
                <p className="text-green-400 font-medium mb-3">USDT (TRC20) - Recommended</p>
                <div className="bg-black p-3 rounded-xl text-xs break-all mb-4 font-mono">{USDT_ADDRESS}</div>
                <div className="bg-white p-3 rounded-2xl inline-block">
                  <QRCodeCanvas value={USDT_ADDRESS} size={180} />
                </div>
              </div>

              {/* BTC */}
              <div className="text-center">
                <p className="text-orange-400 font-medium mb-3">Bitcoin (BTC)</p>
                <div className="bg-black p-3 rounded-xl text-xs break-all mb-4 font-mono">{BTC_ADDRESS}</div>
                <div className="bg-white p-3 rounded-2xl inline-block">
                  <QRCodeCanvas value={BTC_ADDRESS} size={180} />
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-10">
              After payment, send screenshot of transaction to your Telegram or Email.<br/>
              I will unlock the video for you.
            </p>

            <button 
              onClick={() => setShowModal(false)}
              className="mt-8 w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
