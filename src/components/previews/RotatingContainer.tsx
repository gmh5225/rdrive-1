import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function RotatingContainer({ children, className, style }: Props) {
  let ref = useRef<HTMLDivElement>(null);
  let [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});

  let onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    let { clientX, clientY } = e;
    let { width, height, x, y } = ref.current.getBoundingClientRect();
    let mouseX = Math.abs(clientX - x);
    let mouseY = Math.abs(clientY - y);
    let rotateMin = -15;
    let rotateMax = 15;
    let rotateRange = rotateMax - rotateMin;

    let rotate = {
      x: rotateMax - (mouseY / height) * rotateRange,
      y: rotateMin + (mouseX / width) * rotateRange,
    };

    setHoverStyle({
      transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    });
  }, []);

  let onMouseLeave = useCallback(() => {
    setHoverStyle({
      transform: 'rotateX(0deg) rotateY(0deg)',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0)',
    });
  }, []);

  useEffect(() => {
    let { current } = ref;
    if (!current) return;
    current.addEventListener('mousemove', onMouseMove);
    current.addEventListener('mouseleave', onMouseLeave);
    return () => {
      if (!current) return;
      current.removeEventListener('mousemove', onMouseMove);
      current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return (
    <div
      className={`py-2 transition-all duration-200 ease-out hover:z-10 xl:mb-0 xl:hover:scale-[1.15] ${className || ''}`}
      style={{ perspective: '600px', ...style }}
      ref={ref}
    >
      <div
        style={{ ...hoverStyle }}
        className="flex overflow-hidden transition-all items-center justify-center duration-200 ease-out hover:bg-cyan-100/50 hover:dark:bg-[#0D1117] rounded-lg shadow-cyan-100/50 hover:shadow-lg"
      >
        {children}
      </div>
    </div>
  );
}


// import React, { useCallback, useEffect, useRef } from 'react';
// import { RootState, useAppDispatch, useAppSelector  } from '../../redux/store'

// import { setHoverStyle } from '../../redux/features/rotatingContainerSlice';

// interface Props {
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
// }

// export function RotatingContainer({ children, className, style }: Props) {
//   let ref = useRef<HTMLDivElement>(null);
//   let dispatch = useAppDispatch();
//   let hoverStyle = useAppSelector ((state: RootState) => state.rotatingContainer.hoverStyle);

//   let onMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!ref.current) return;

//       let { clientX, clientY } = e;
//       let { width, height, x, y } = ref.current.getBoundingClientRect();
//       let mouseX = Math.abs(clientX - x);
//       let mouseY = Math.abs(clientY - y);
//       let rotateMin = -15;
//       let rotateMax = 15;
//       let rotateRange = rotateMax - rotateMin;

//       let rotate = {
//         x: rotateMax - (mouseY / height) * rotateRange,
//         y: rotateMin + (mouseX / width) * rotateRange,
//       };

//       dispatch(
//         setHoverStyle({
//           transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
//           boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//         })
//       );
//     },
//     [dispatch]
//   );

//   let onMouseLeave = useCallback(() => {
//     dispatch(
//       setHoverStyle({
//         transform: 'rotateX(0deg) rotateY(0deg)',
//         boxShadow: '0 2px 5px rgba(0, 0, 0, 0)',
//       })
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     let { current } = ref;
//     if (!current) return;
//     current.addEventListener('mousemove', onMouseMove);
//     current.addEventListener('mouseleave', onMouseLeave);
//     return () => {
//       if (!current) return;
//       current.removeEventListener('mousemove', onMouseMove);
//       current.removeEventListener('mouseleave', onMouseLeave);
//     };
//   }, [onMouseMove, onMouseLeave]);

//   return (
//     <div
//       className={`py-2 transition-all duration-200 ease-out hover:z-10 xl:mb-0 xl:hover:scale-[1.15] ${className || ''}`}
//       style={{ perspective: '600px', ...style }}
//       ref={ref}
//     >
//       <div
//         style={{ ...hoverStyle }}
//         className="flex overflow-hidden transition-all items-center justify-center duration-200 ease-out hover:bg-cyan-100/50 hover:dark:bg-[#0D1117] rounded-lg shadow-cyan-100/50 hover:shadow-lg"
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
