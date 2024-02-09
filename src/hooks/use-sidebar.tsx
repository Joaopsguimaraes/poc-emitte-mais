import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface UseSideBarProps {
  isCollapse: boolean
  handleToggleCollapse: () => void
  isMobileSidebarOpen: boolean
  handleToggleMobileSidebar: (state?: boolean) => void
}

export const useSidebar = create(
  persist(
    devtools<UseSideBarProps>((set) => ({
      handleToggleCollapse: () => {
        set(({ isCollapse }) => ({ isCollapse: !isCollapse }))
      },
      handleToggleMobileSidebar: (state?: boolean) => {
        set(({ isMobileSidebarOpen }) => ({
          isMobileSidebarOpen:
            typeof state !== 'undefined' ? state : !isMobileSidebarOpen,
        }))
      },
      isCollapse: false,
      isMobileSidebarOpen: false,
    })),
    {
      name: 'sidebar-storage',
    },
  ),
)
