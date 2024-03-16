import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
};

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    class Options {
      constructor(
        public rootMargin: string,
        public threshold: number,
        public root: null
      ) {}
    }
    const options = new Options("0px", 1.0, null);

    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    //   root: null,
    // };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
