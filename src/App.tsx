import React, { useState, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { DemoSection } from './components/DemoSection';
import { ConceptMap } from './components/ConceptMap';
import { FlashcardPlayer } from './components/FlashcardPlayer';
import { PricingSection } from './components/PricingSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { UploadModal } from './components/UploadModal';
import { DocumentViewer } from './components/DocumentViewer';
import { FeatureWindow } from './components/FeatureWindow';
import { ProfileSection } from './components/ProfileSection';

export default function App() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState('');
  const [bottomNavTab, setBottomNavTab] = useState('home');

  // Refs for smooth scrolling
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      features: featuresRef,
      demo: demoRef,
      pricing: pricingRef,
      download: downloadRef,
      contact: contactRef
    };

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (refs[section]) {
      refs[section].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpload = (type: string, file?: File) => {
    console.log('Upload type:', type, 'File:', file);
    setUploadModalOpen(false);

    // Simulate document upload and open viewer
    setCurrentDocument(file?.name || `${type}_document.pdf`);
    setDocumentViewerOpen(true);
  };

  const handlePrimaryClick = () => {
    setUploadModalOpen(true);
  };

  const handleSecondaryClick = () => {
    handleNavigate('demo');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Navigation */}
      <TopBar onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="pb-20 md:pb-0">
        {/* Hero Section */}
        <Hero
          onPrimaryClick={handlePrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />

        {/* Features Section */}
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>

        {/* Demo Section */}
        <div ref={demoRef}>
          <DemoSection />
        </div>

        {/* Concept Map Demo */}
        <ConceptMap />

        {/* Flashcard Demo */}
        <FlashcardPlayer />

        {/* Pricing Section */}
        <div ref={pricingRef}>
          <PricingSection />
        </div>

        {/* Integrations & Download */}
        <div ref={downloadRef}>
          <IntegrationsSection />
        </div>

        {/* Contact Section */}
        <div ref={contactRef}>
          <ContactSection />
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Feature Windows */}
      <FeatureWindow
        title="Upload Documents"
        isOpen={bottomNavTab === 'uploads'}
        onClose={() => setBottomNavTab('home')}
      >
        <div className="p-4">
          <h3 className="text-[var(--text-primary)] mb-4">Upload New Document</h3>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={() => handleUpload('pdf')} className="p-6 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] hover:bg-white/10 transition-colors text-left">
              Upload PDF
            </button>
            <button onClick={() => handleUpload('image')} className="p-6 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] hover:bg-white/10 transition-colors text-left">
              Scan Image
            </button>
            <button onClick={() => handleUpload('voice')} className="p-6 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] hover:bg-white/10 transition-colors text-left">
              Record Voice Note
            </button>
          </div>
        </div>
      </FeatureWindow>

      <FeatureWindow
        title="AI Assistant"
        isOpen={bottomNavTab === 'ai'}
        onClose={() => setBottomNavTab('home')}
      >
        <ConceptMap />
      </FeatureWindow>

      <FeatureWindow
        title="Revise"
        isOpen={bottomNavTab === 'revise'}
        onClose={() => setBottomNavTab('home')}
      >
        <FlashcardPlayer />
      </FeatureWindow>

      <FeatureWindow
        title="Profile"
        isOpen={bottomNavTab === 'profile'}
        onClose={() => setBottomNavTab('home')}
      >
        <ProfileSection />
      </FeatureWindow>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={bottomNavTab} onTabChange={setBottomNavTab} />

      {/* Modals */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
      />

      {documentViewerOpen && (
        <DocumentViewer
          documentName={currentDocument}
          onClose={() => setDocumentViewerOpen(false)}
          onExplain={(text) => console.log('Explain:', text)}
        />
      )}
    </div>
  );
}
