import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  X, 
  Check, 
  Sparkles, 
  Loader2, 
  Eye,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

interface ImageUploadInputProps {
  label: string;
  value?: string;
  onChange: (newValue: string) => void;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  recommendedSize?: string;
  placeholder?: string;
  presets?: string[];
  helperText?: string;
}

// Preset collection of high-res robotics & tech photos
const DEFAULT_PRESETS = [
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80', // Autonomous Robot
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80', // Robot Arm / Engineering
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80', // Circuit / Electronics
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Microcontroller Board
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', // Tech Workspace / Coding
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80', // Cyber Tech Graphic
  'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80'  // Trophy / Award
];

// Helper: compress image file using canvas to keep size tiny (~20KB) and fast
async function compressImageFile(file: File, maxDim = 800, quality = 0.70): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw with high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to webp if supported, else jpeg
        try {
          const webpData = canvas.toDataURL('image/webp', quality);
          if (webpData.startsWith('data:image/webp')) {
            resolve(webpData);
            return;
          }
        } catch (_) {}

        const jpegData = canvas.toDataURL('image/jpeg', quality);
        resolve(jpegData);
      };
      img.onerror = () => reject(new Error('이미지를 읽을 수 없습니다.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('파일 읽기 오류'));
    reader.readAsDataURL(file);
  });
}

// Uploads image to server backend if available, otherwise returns compressed data URL
async function uploadImageToServer(dataUrl: string, filename: string): Promise<string> {
  try {
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl, filename })
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.success && json?.url) {
        return json.url;
      }
    }
  } catch (_) {
    // Backend upload endpoint not available (e.g. static Vercel host); retain compressed data URL
  }
  return dataUrl;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  value = '',
  onChange,
  aspectRatio = 'video',
  recommendedSize,
  placeholder = 'https://... 또는 내 컴퓨터에서 사진 선택',
  presets = DEFAULT_PRESETS,
  helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [inputUrl, setInputUrl] = useState(value);
  const [imgError, setImgError] = useState(false);

  // Sync internal url state
  React.useEffect(() => {
    setInputUrl(value);
    setImgError(false);
  }, [value]);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WebP, GIF 등)만 업로드할 수 있습니다.');
      return;
    }

    setIsCompressing(true);
    try {
      const compressedDataUrl = await compressImageFile(file, 960, 0.75);
      const finalUrl = await uploadImageToServer(compressedDataUrl, file.name);
      onChange(finalUrl);
      setInputUrl(finalUrl);
      setImgError(false);
    } catch (err) {
      console.error('Image processing failed:', err);
      alert('이미지 업로드 및 변환에 실패했습니다.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClear = () => {
    onChange('');
    setInputUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDataUrl = value?.startsWith('data:image/');

  return (
    <div className="space-y-2 text-left">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-['Outfit'] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#7864f6]" />
          <span>{label}</span>
        </label>
        {recommendedSize && (
          <span className="text-[10px] text-slate-400 font-mono">
            권장: {recommendedSize}
          </span>
        )}
      </div>

      {/* Main Container */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 space-y-3">
        {/* Preview and Upload Dropzone */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Thumbnail Preview Area */}
          <div className="sm:col-span-4 relative group">
            <div 
              className={`w-full overflow-hidden rounded-xl bg-slate-200 border border-slate-300 relative flex items-center justify-center ${
                aspectRatio === 'video' ? 'aspect-video' : 
                aspectRatio === 'square' ? 'aspect-square' : 
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'h-32'
              }`}
            >
              {isCompressing ? (
                <div className="flex flex-col items-center gap-1.5 text-xs text-[#7864f6] font-semibold">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>최적화 중...</span>
                </div>
              ) : value && !imgError ? (
                <>
                  <img
                    src={value}
                    alt={label}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 rounded-lg bg-white/90 text-slate-800 hover:bg-white text-xs font-bold shadow-md cursor-pointer"
                      title="사진 변경"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs shadow-md cursor-pointer"
                      title="이미지 삭제"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center text-slate-400">
                  <ImageIcon className="w-8 h-8 mb-1 stroke-[1.5] text-slate-300" />
                  <span className="text-[10px] font-semibold">
                    {imgError ? '이미지 로드 실패' : '이미지 없음'}
                  </span>
                </div>
              )}
            </div>
            {isDataUrl && (
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-emerald-300 backdrop-blur-xs">
                내 컴퓨터 파일
              </div>
            )}
          </div>

          {/* Upload Controls & URL input Area */}
          <div className="sm:col-span-8 space-y-2">
            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMode('upload')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'upload' 
                    ? 'bg-[#7864f6] text-white shadow-xs' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>내 사진 업로드</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('url')}
                className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'url' 
                    ? 'bg-[#7864f6] text-white shadow-xs' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>URL 링크 입력</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  showPresets
                    ? 'bg-purple-100 text-[#7864f6] border border-purple-300'
                    : 'bg-white text-slate-500 border border-slate-200 hover:text-slate-700'
                }`}
                title="추천 로봇 사진 선택"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">추천</span>
              </button>
            </div>

            {/* Hidden native file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            {/* Mode 1: Drag & Drop Local Upload */}
            {mode === 'upload' && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-3 text-center transition-all cursor-pointer ${
                  isDragging
                    ? 'border-[#7864f6] bg-[#7864f6]/10 scale-[0.99]'
                    : 'border-slate-300 bg-white hover:border-[#7864f6] hover:bg-purple-50/30'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FolderOpen className="w-4 h-4 text-[#7864f6]" />
                  <span className="text-xs font-bold text-slate-700">
                    사진 파일 선택 또는 여기에 드래그
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  PNG, JPG, WebP 자동 최적화 저장 지원
                </p>
              </div>
            )}

            {/* Mode 2: Direct URL Input */}
            {mode === 'url' && (
              <div className="flex items-center gap-1.5">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                    onChange(e.target.value);
                  }}
                  placeholder={placeholder}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-[#7864f6]"
                />
                {inputUrl && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600 text-xs cursor-pointer"
                    title="초기화"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Preset Gallery Picker */}
        {showPresets && (
          <div className="pt-2 border-t border-slate-200/80 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                추천 고화질 로봇 &amp; 공학 사진 프리셋
              </span>
              <span className="text-[10px] text-slate-400">클릭 시 즉시 적용</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {presets.map((presetUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(presetUrl);
                    setImgError(false);
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    value === presetUrl ? 'border-[#7864f6] ring-2 ring-[#7864f6]/30' : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img
                    src={presetUrl}
                    alt={`Preset ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {value === presetUrl && (
                    <div className="absolute inset-0 bg-[#7864f6]/40 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {helperText && (
          <p className="text-[10px] text-slate-500 italic">
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
};
