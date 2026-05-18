import { Link } from "react-router-dom";

function Home() {

  return (
    <div className="
      min-h-screen
      bg-[#0B1120]
      text-white
      flex
      flex-col
    ">

      {/* Navbar */}
      <nav className="
        flex
        items-center
        justify-between
        px-6 md:px-12
        py-5
        border-b
        border-gray-800
      ">

        <h1 className="
          text-2xl
          font-bold
          text-blue-500
        ">
          ResearchGPT
        </h1>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="
              px-4 py-2
              rounded-xl
              bg-gray-800
              hover:bg-gray-700
              transition
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              px-4 py-2
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              transition
            "
          >
            Register
          </Link>

        </div>

      </nav>

      {/* Hero */}
      <section className="
        flex-1
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
      ">

        <h1 className="
          text-4xl
          md:text-6xl
          font-bold
          leading-tight
          max-w-4xl
        ">

          AI-Powered Research
          <span className="text-blue-500">
            {" "}Analysis Platform
          </span>

        </h1>

        <p className="
          mt-6
          text-gray-400
          text-lg
          md:text-xl
          max-w-2xl
        ">

          Upload research papers,
          perform semantic querying,
          compare studies,
          and generate grounded AI insights.

        </p>

        <div className="
          mt-10
          flex
          flex-col
          sm:flex-row
          gap-4
        ">

          <Link
            to="/register"
            className="
              bg-blue-600
              hover:bg-blue-700
              px-6 py-4
              rounded-2xl
              text-lg
              font-medium
              transition
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              bg-gray-800
              hover:bg-gray-700
              px-6 py-4
              rounded-2xl
              text-lg
              font-medium
              transition
            "
          >
            Login
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="
        text-center
        text-gray-500
        py-6
        border-t
        border-gray-800
      ">

        ResearchGPT © 2026

      </footer>

    </div>
  );
}

export default Home;