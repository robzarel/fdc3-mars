import React, { useState, useEffect } from 'react';

type W = Window & typeof globalThis & { fdc3: any };

const useFdc3 = () => {
  const [fdc3, setFdc3] = useState<any>();

  useEffect(()=> {
    const startFdc3 = () => {
      setFdc3((window as W).fdc3);
    }
    
    if ((window as W).fdc3) {
      startFdc3();
    } else {
      window.addEventListener('fdc3Ready', startFdc3);
    }
    
    return () => {
      window.removeEventListener('fdc3Ready', startFdc3);
    }
  }, []);

  return fdc3;
}

export default useFdc3;