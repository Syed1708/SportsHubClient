import React from "react";

const slideData = [
  {
    id: "slide1",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide2",
    img: "https://images.unsplash.com/photo-1593013820725-ca0b6076576f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide3",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "slide4",
    img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function Slider() {
  return (
    <div className="carousel w-full py-3">
      {slideData.map((slide, index) => {
        const prevId = slideData[(index - 1 + slideData.length) % slideData.length].id;
        const nextId = slideData[(index + 1) % slideData.length].id;

        return (
          <div key={slide.id} id={slide.id} className="carousel-item relative w-full">
            <img src={slide.img} className="w-full h-160 object-cover " />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#${prevId}`} className="btn btn-circle">
                ❮
              </a> 
             <a href={`#${nextId}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
