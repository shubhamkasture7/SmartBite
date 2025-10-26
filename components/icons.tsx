
import React from 'react';

export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export const FireIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.5 6.5a4.3 4.3 0 0 1 4.3 4.3c0 1.2-1.3 3.6-2.2 4.8a8.6 8.6 0 0 1-4.2 0c-.9-1.2-2.2-3.6-2.2-4.8a4.3 4.3 0 0 1 4.3-4.3" />
    <path d="M10 14.5c-1.2 0-2.2-1-2.2-2.2 0-.6.5-1.7 1-2.3a4.3 4.3 0 0 1 2.5-1" />
    <path d="M12 4c1.5 1.5 2 3.5 2 4.5" />
    <path d="M14 6.5c.5.5 1 1.5 1 2.5" />
  </svg>
);

export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);
