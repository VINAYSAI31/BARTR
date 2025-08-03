import { BsArrowRight } from 'react-icons/bs';

const steps = [
  {
    title: 'Post & Discover',
    description:
      'Share your skills or find exactly what you need. Our smart tagging system connects you with the perfect trading opportunities.',
    tags: ['#design', '#coding', '#tutoring', '#language'],
  },
  {
    title: 'Smart Matching',
    description:
      'Our algorithm finds compatible traders based on skills, availability, and reputation. Get matched with verified users instantly.',
    tags: ['#verified', '#instant', '#compatible', 'Learn More'],
  },
  {
    title: 'Complete Trade',
    description:
      'Exchange skills safely with our secure platform. Build your reputation and unlock premium trading opportunities.',
    tags: ['#secure', '#reputation', '#growth', 'Learn More'],
  },
];

const Working = () => {
  return (
    <section
      id="Steps"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute bg-[#6366f1] inset-0 opacity-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className="text-center mb-20"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#6366f1]">
            Three Simple Steps to <br /> Trading Success
          </h2>
          <p className="text-lg sm:text-xl text-[#ffffff] max-w-2xl mx-auto">
            From posting your first skill to completing successful trades, we've
            made the process seamless and secure.
          </p>
        </div>

        {/* Steps - Cards Layout */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 neon-card group relative overflow-hidden rounded-2xl border border-[#6366f1] bg-transparent px-4 py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-[#6366f1] opacity-10 group-hover:opacity-[0.15]" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-[#6366f1] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-[#ffffff] mb-4">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#ffffff] border-opacity-20 text-[#ffffff] bg-[#6366f1] bg-opacity-5 font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;