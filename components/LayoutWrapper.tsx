'use client';

import { usePathname } from 'next/navigation';
import { CosmicNav } from './CosmicNav';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === '/' || pathname === '/create-id';

  return (
    <>
      {!hideNav && <CosmicNav />}
      <div className={hideNav ? '' : 'pt-20'}>{children}</div>
    </>
  );
}
