import React, { useState } from 'react';
import { X, Upload, Camera, FileText, Mic } from 'lucide-react';
import { Button } from './Button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (type: string, file?: File) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload('file', e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload('file', e.target.files[0]);
    }
  };

  const uploadOptions = [
    { icon: Upload, label: 'Upload File', description: 'PDF, images, or documents', type: 'file' },
    { icon: Camera, label: 'Take Photo', description: 'Capture handwritten notes', type: 'camera' },
    { icon: FileText, label: 'Paste Text', description: 'Copy & paste your notes', type: 'text' },
    { icon: Mic, label: 'Voice Note', description: 'Record audio lecture', type: 'voice' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--bg)] border border-white/10 rounded-[var(--radius-card)] shadow-[var(--shadow-far)] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-[var(--text-primary)]">Upload Your Notes</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Drag & Drop Area */}
          <div
            className={`mb-6 p-8 border-2 border-dashed rounded-[var(--radius-card)] text-center transition-all duration-[var(--duration-medium)] ${
              dragActive
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                : 'border-white/20 hover:border-[var(--color-primary)]/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mx-auto mb-4 text-[var(--text-secondary)]" />
            <p className="text-[var(--text-primary)] mb-2">Drop files here or click to browse</p>
            <p className="text-[var(--text-secondary)]">Supports PDF, PNG, JPG, DOCX</p>
            <input
              type="file"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              accept=".pdf,.png,.jpg,.jpeg,.docx"
            />
            <label htmlFor="file-upload">
              <Button variant="secondary" className="mt-4" onClick={() => {}}>
                Browse Files
              </Button>
            </label>
          </div>

          {/* Upload Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => option.type === 'file' ? document.getElementById('file-upload')?.click() : onUpload(option.type)}
                className="flex items-start gap-4 p-4 rounded-xl bg-[var(--card-bg)] border border-white/5 hover:border-[var(--color-primary)]/50 transition-all duration-[var(--duration-medium)] hover:shadow-[var(--shadow-near)] text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                  <option.icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-[var(--text-primary)] mb-1">{option.label}</div>
                  <div className="text-[var(--text-secondary)]">{option.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in var(--duration-medium) var(--ease-micro) forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in var(--duration-medium) ease-out forwards;
        }
      `}</style>
    </div>
  );
}
