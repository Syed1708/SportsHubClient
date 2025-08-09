import { animate, color, motion } from "framer-motion";
import { Link } from "react-router";

export default function Hero() {
  return (
    <div
      className="hero h-100 "
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { duration: 2 },
            }}
            className="mb-5 text-5xl font-bold"
          >
            <motion.span
              animate={{
                color: ["#ff5733", "#52ff33", "#339cff", "#ff33f0"],
                transition: { duration: 2, repeat: Infinity },
              }}
            >
              Welcome To SportsHub!
            </motion.span>
          </motion.h1>
          <p className="mb-5">
            Every Sport. Every Player. One Platform ⚽ 🏀 🏈 ⚾ 🎾 🏐 🥊 🏋️ 🏃 🥇 
          </p>
          <button className="btn btn-success rounded-full">
           <Link to="/events">Browse Events</Link> 
          </button>
        </div>
      </div>
    </div>
  );
}
