import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const hoverCard = {
  whileHover: {
    scale: 1.05,
    y: -8,
    transition: { duration: 0.3 }
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden transition-all duration-500 ${
        darkMode ? "bg-[#050816] text-white" : "bg-[#f5f7fb] text-gray-900"
      }`}
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="relative z-10">

        {/* NAV */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full border backdrop-blur-md hover:scale-105 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* HERO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center px-6 pt-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Task Management
            <span className="block text-blue-500 mt-2">
              Made Smarter 🚀
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto opacity-70">
            Organize tasks, track progress, and boost productivity with a modern SaaS workflow system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">

            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-blue-500/40 transition-all"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 border rounded-full hover:scale-105 hover:bg-gray-200/40 transition-all"
            >
              Create Account
            </button>

          </div>
        </motion.div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-10 lg:px-20 mt-16 pb-20">

          {[
            ["📌 Task Management", "Create, update, delete and organize tasks easily."],
            ["📊 Analytics Dashboard", "Track productivity with charts & insights."],
            ["⚡ Fast Workflow", "Smooth Kanban drag & drop system."],
            ["🔍 Smart Search", "Instant search across all tasks."],
            ["🏷️ Filters System", "Filter tasks by status easily."],
            ["🔔 Notifications", "Get alerts for deadlines & updates."],
            ["☁️ Cloud Sync", "Access your tasks anywhere."],
            ["🔐 Secure Login", "Firebase authentication protection."],
            ["🎨 Clean UI", "Modern Apple-style interface."],
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              {...hoverCard}
              className={`p-6 rounded-2xl border backdrop-blur-xl cursor-pointer ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white border-gray-200 shadow-md hover:shadow-xl"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{item[0]}</h3>
              <p className="text-sm opacity-70">{item[1]}</p>
            </motion.div>
          ))}

        </div>

        {/* PRICING */}
        <div className="mt-24 px-6 md:px-16 text-center">
          <h2 className="text-3xl font-bold mb-10">Pricing</h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["Free", "$0", "Basic features", false],
              ["Pro", "$9/mo", "Best for individuals", true],
              ["Team", "$19/mo", "For teams & collaboration", false],
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                {...hoverCard}
                className={`p-8 rounded-2xl border cursor-pointer ${
                  plan[3]
                    ? "bg-blue-500 text-white shadow-2xl"
                    : darkMode
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-white shadow-md hover:shadow-xl"
                }`}
              >
                <h3 className="text-xl font-bold">{plan[0]}</h3>
                <p className="text-3xl my-4">{plan[1]}</p>
                <p className="text-sm opacity-80 mb-4">{plan[2]}</p>

                <button className="px-5 py-2 rounded-full bg-white text-blue-500 hover:scale-105 transition">
                  Choose Plan
                </button>
              </motion.div>
            ))}

          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="mt-24 px-6 md:px-16 text-center pb-20">
          <h2 className="text-3xl font-bold mb-10">What Users Say</h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["Ali Khan", "This app boosted my productivity massively!"],
              ["Sara Ahmed", "Clean UI and super smooth experience."],
              ["Usman Tariq", "Best task manager I’ve ever used."]
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                {...hoverCard}
                className={`p-6 rounded-2xl cursor-pointer ${
                  darkMode
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white shadow-md hover:shadow-xl"
                }`}
              >
                <p className="italic mb-3">"{item[1]}"</p>
                <h4 className="text-sm opacity-70">— {item[0]}</h4>
              </motion.div>
            ))}

          </div>
        </div>

        {/* ABOUT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="px-6 md:px-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="max-w-3xl mx-auto opacity-70">
            We build modern productivity tools with premium UI, smooth animations,
            and powerful features inspired by Apple & SaaS products.
          </p>
        </motion.div>

        {/* CONTACT */}
        <div className="mt-24 px-6 md:px-16 pb-20 text-center">
          <h2 className="text-3xl font-bold mb-10">Contact Us</h2>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className={`max-w-xl mx-auto p-6 rounded-2xl ${
              darkMode ? "bg-white/5" : "bg-white shadow-md"
            } flex flex-col gap-4`}
          >
            <input className="border p-3 rounded-lg" placeholder="Your Name" />
            <input className="border p-3 rounded-lg" placeholder="Email" />
            <textarea className="border p-3 rounded-lg" rows="4" placeholder="Message" />

            <button className="bg-blue-500 text-white py-2 rounded-lg hover:scale-105 transition">
              Send Message
            </button>
          </motion.form>
        </div>

      </div>
    </div>
  );
};

export default Home;