// components/BannerSlider.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542319281-2a3772c20dfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "City Marathon 2025",
      desc: "Join thousands of runners this summer!"
    },
    {
      image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Football Championship",
      desc: "Register your team for the tournament."
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1675721094347-08f1f4ccb2b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Mountain Bike Rally",
      desc: "Push your limits on rugged trails."
    }
  ];

  return (
    <div className="w-full mx-auto my-12">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i}>
            <div
              className="relative h-[400px] bg-cover bg-center flex items-center justify-center text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className=" p-6 rounded-xl text-center max-w-xl">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p>{slide.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
