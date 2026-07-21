import React, { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const dragRegionStyle: CSSProperties = { WebkitAppRegion: 'drag' } as CSSProperties;
const noDragRegionStyle: CSSProperties = { WebkitAppRegion: 'no-drag' } as CSSProperties;

function Navbar() {
  return (
    <header
      style={dragRegionStyle}
      className="flex h-16 shrink-0 items-center justify-between border-b border-violet-800/50 bg-violet-950 py-3 pl-6 pr-36"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 text-white shadow-sm">
          <FontAwesomeIcon icon={faCodeBranch} className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h1 className="text-base font-semibold text-violet-50">Hachikage</h1>
          <p className="text-xs text-violet-400">Automatiza tu flujo de Git &amp; GitHub</p>
        </div>
      </div>

      <span
        style={noDragRegionStyle}
        className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 shadow-sm"
      >
        Modelo: Auto
      </span>
    </header>
  );
}

export default Navbar;
