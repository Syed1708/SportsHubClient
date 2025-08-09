import Slider from "react-slick";

const testimonials = [
  {
    name: "Sarah Ahmed",
    feedback:
      "I love how easy it is to find and book events here. The community is awesome!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Michael Lee",
    feedback:
      "This platform helped me discover local sports I didn’t even know existed.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Johnson",
    feedback:
      "Managing my own events is super simple. Great experience overall!",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">What Users Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-md text-center"
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            <h4 className="text-lg font-semibold mt-4">{testimonial.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
