import hero from "../../../src/assets/learn.png";
import learn from "../../../src/assets/learning.jpg";
import adlin from "../../../src/assets/adlin.jpg";
import ranjani from "../../../src/assets/ranjani.jpg";
import nithya from "../../../src/assets/nithya.jpg";
import contact from "../../../src/assets/contact.jpg";
function Ecommerce() {
  return (
    <>
      {/* Navbar */}
      <nav className="text-black-400 bg-white sticky top-0 shadow-lg h-12">
        <div className="container mx-auto flex justify-between ">
          <h1 className="text-4xl ml-2 font-extrabold text-black-400 ">
            Code<span className="text-yellow-300">Nest</span>
          </h1>
          <ul className="hidden md:flex space-x-7  mt-3 mr-10">
            <li>
              <a href="#home" className="hover:text-gray-300 ">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-gray-300">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            <button className="bg-blue-400 text-white px-2 py-1 mt-0 mb-1 rounded">
              Login
            </button>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        id="home"
        className="herosection flex items-center justify-between px-10 py-12"
      >
        <div id="hero" className="hero-content w-1/2 mb-0.5">
          <h1 className="font-extrabold text-black-400 mt-0 text-5xl leading-tight">
            Every expert was once a{" "}
            <span className="text-yellow-300 font-medium">Beginner</span>. Start
            your journey today!
          </h1>
          <button className="bg-yellow-300 mt-10 ml-40 text-2xl text-white px-2 py-1 rounded">
            Get Started
          </button>
        </div>

        <div className="hero-img w-1/2 flex justify-center">
          <img src={hero} alt="Learning" className="w-200 h-auto" />
        </div>
      </div>

      {/* Hero Section 2 */}
      <div className="herosection2 grid grid-cols-1 md:grid-cols-2 items-center px-10 py-0">
        <div className="hero-img flex justify-center">
          <img src={learn} alt="Learning" className="w-72 md:w-96 h-auto" />
        </div>

        <div className="hero-content text-center md:text-left">
          <h1 className="font-bold text-blue-400 text-4xl md:text-5xl leading-tight">
            Unlock Your Potential with CodeNest Learning!
          </h1>
          <p className="text-gray-600 text-2xl mt-4">
            Gain real-world skills with interactive lessons, hands-on projects,
            and expert guidance.
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div id="about" className="cards py-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Why Learn With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 mt-10">
          {[
            {
              title: "Interactive Learning",
              desc: "Engaging courses with hands-on projects and real-world examples.",
            },
            {
              title: "Expert Instructors",
              desc: "Learn from industry professionals with years of experience.",
            },
            {
              title: "Flexible Learning",
              desc: "Study anytime, anywhere, at your own pace.",
            },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-500">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="testimonials bg-gray-100 py-10 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          See What Our Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: adlin,
              name: "Adlin Wiseley",
              role: "Software Engineer",
              feedback:
                "This platform changed my career! The courses are well-structured and easy to follow.",
            },
            {
              img: ranjani,
              name: "Siva Ranjani",
              role: "UI/UX Designer",
              feedback:
                "The interactive lessons and real-world projects helped me land my first job!",
            },
            {
              img: nithya,
              name: "Nithya",
              role: "Data Analyst",
              feedback:
                "I love the flexibility of learning at my own pace. Highly recommended!",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-400"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">"{testimonial.feedback}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="contact py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full">
            <img
              src={contact}
              alt="Contact Us"
              className="w-300 h-auto rounded-lg"
            />
          </div>

          <div className="w-full bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Get in Touch With Us
            </h2>
            <form className="space-y-4">
              {[
                {
                  label: "Full Name",
                  type: "text",
                  placeholder: "Enter your name",
                },
                {
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your email",
                },
              ].map((input, index) => (
                <div key={index}>
                  <label className="text-gray-600 font-semibold">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-600 font-semibold">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ecommerce;
