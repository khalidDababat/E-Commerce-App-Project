import React, { useState, useRef, MouseEvent } from 'react';
import './Category.scss';


const Category = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [categories] = useState([
    "الكل",
    "السعادة والدلال",
    "وجبات التوفير العائلية",
    "لفات وسندويشات",
    "بايجت / باشكا",
    "صحون سفري شاورما ونجبر",
    "سلطات وجبات",
    "صوصات",
    "مشروبات وعصائر"
  ]);


  const [active, setActive] = useState('الكل');

  const startDragging = (e: MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const stopDragging = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className='categories-container'
      ref={sliderRef}
      onMouseDown={startDragging}
      onMouseLeave={stopDragging}
      onMouseUp={stopDragging}
      onMouseMove={onMouseMove}
      style={{ cursor: isDown ? 'grabbing' : 'grab' }}
    >
      {categories.map((item) => (
        <button
          key={item}
          className={`category-item ${active === item ? 'active' : ''}`}
          onClick={() => setActive(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Category;
