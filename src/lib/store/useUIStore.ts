import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isPDFViewerOpen: boolean;
  isEmailFormOpen: boolean;
  isSubscribeFormOpen: boolean;
  currentPDFUrl: string | null;
  currentNewsletterTitle: string | null;

  viewMode: 'map' | 'detail' | 'feed';
  isSidebarOpen: boolean;
  displayResolution: '1080p' | '4k' | '8k';

  openPDFViewer: (pdfUrl: string, title?: string) => void;
  closePDFViewer: () => void;
  openEmailForm: () => void;
  closeEmailForm: () => void;
  openSubscribeForm: () => void;
  closeSubscribeForm: () => void;
  setViewMode: (mode: 'map' | 'detail' | 'feed') => void;
  toggleSidebar: () => void;
  setDisplayResolution: (resolution: '1080p' | '4k' | '8k') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isPDFViewerOpen: false,
      isEmailFormOpen: false,
      isSubscribeFormOpen: false,
      currentPDFUrl: null,
      currentNewsletterTitle: null,
      viewMode: 'map',
      isSidebarOpen: true,
      displayResolution: '1080p',

      openPDFViewer: (pdfUrl, title) =>
        set({
          isPDFViewerOpen: true,
          currentPDFUrl: pdfUrl,
          currentNewsletterTitle: title || null,
        }),
      closePDFViewer: () =>
        set({
          isPDFViewerOpen: false,
          currentPDFUrl: null,
          currentNewsletterTitle: null,
        }),
      openEmailForm: () => set({ isEmailFormOpen: true }),
      closeEmailForm: () => set({ isEmailFormOpen: false }),
      openSubscribeForm: () => set({ isSubscribeFormOpen: true }),
      closeSubscribeForm: () => set({ isSubscribeFormOpen: false }),
      setViewMode: (mode) => set({ viewMode: mode }),
      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),
      setDisplayResolution: (resolution) => set({ displayResolution: resolution }),
    }),
    {
      name: 'missions-ui-storage',
      partialize: (state) => ({ isSidebarOpen: state.isSidebarOpen }),
    }
  )
);
