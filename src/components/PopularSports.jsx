const popularSports = [
  {
    name: "Football",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80",
    players: "11 per team",
  },
  {
    name: "Basketball",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
    players: "5 per team",
  },
  {
    name: "Tennis",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    players: "Singles / Doubles",
  },
  {
    name: "Cricket",
    image: "https://images.unsplash.com/photo-1631194758628-71ec7c35137e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    players: "11 per team",
  },
];


const PopularSports = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl font-bold text-center mb-10">Popular Sports</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {popularSports.map((sport) => (
          <div
            key={sport.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img src={sport.image} alt={sport.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{sport.name}</h3>
              <p className="text-sm text-gray-600">{sport.players}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSports;
