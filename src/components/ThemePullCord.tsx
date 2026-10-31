import PullCord from './kokonutui/pull-cord'
import { useTheme } from '../context/ThemeContext'
import { playClickPop, playEtherealChime } from '../utils/sound'

/**
 * Top-left ceiling hanging lamp with physical pull cord.
 * Controls the portfolio lighting theme (Dark Mode <-> Light Mode).
 */
export default function ThemePullCord() {
  const { isLight, setTheme } = useTheme()

  return (
    <aside
      className="fixed top-0 left-3 sm:left-6 md:left-8 z-50 pointer-events-none select-none transition-transform duration-300"
      aria-label="Interactive Lighting Theme Lamp"
    >
      <div
        className="w-[78px] h-[156px] sm:w-[88px] sm:h-[176px] pointer-events-auto"
        title="Pull the cord to toggle theme"
      >
        <PullCord
          checked={isLight}
          onCheckedChange={(checked) => {
            setTheme(checked ? 'light' : 'dark')
            if (checked) {
              playEtherealChime(880, 0.04)
            } else {
              playClickPop(0.05)
            }
          }}
          label="Portfolio Lighting Switch"
        />
      </div>
    </aside>
  )
}
