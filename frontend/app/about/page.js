import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="pt-16 pb-8 md:pt-20 md:pb-12 hero-gradient relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          
          <h1 className="text-display-lg text-secondary mb-6 leading-tight">
            About
            <span className="text-primary-gradient"> BloodPlus</span>
          </h1>
          <p className="text-xl text-secondary-light mb-8 max-w-2xl leading-relaxed">
            BloodPlus is a modern, innovative platform dedicated to connecting compassionate blood donors with those in urgent need of life-saving transfusions across Bangladesh.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-heading-lg text-secondary mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-secondary-light max-w-2xl mx-auto">
              Driving change through technology, compassion, and community cooperation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="premium-card p-8 hover-lift">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-4">Our Mission</h3>
              <p className="text-secondary-light leading-relaxed">
                To revolutionize blood donation in Bangladesh by creating a seamless digital platform that connects generous donors with patients in need, saving lives through efficient blood management and rapid response systems.
              </p>
            </div>
            <div className="premium-card p-8 hover-lift">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center">
                  <span className="text-3xl">🌟</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-4">Our Vision</h3>
              <p className="text-secondary-light leading-relaxed">
                A Bangladesh where no one suffers from blood shortage, where every donor is recognized, and where lives are saved through technology, compassion, and community cooperation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>

      {/* Why Blood Donation Matters */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-heading-lg text-secondary mb-4">Why Blood Donation Matters</h2>
            <p className="text-lg text-secondary-light max-w-2xl mx-auto">
              Every donation is a gift of life with far-reaching impact
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="premium-card p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                  <span className="text-3xl">💪</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-3">Saves Lives</h3>
              <p className="text-secondary-light leading-relaxed">
                A single unit of blood can save up to three lives during medical emergencies and surgeries.
              </p>
            </div>
            <div className="premium-card p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                  <span className="text-3xl">🚑</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-3">Emergency Support</h3>
              <p className="text-secondary-light leading-relaxed">
                Blood is critical during accidents, childbirth complications, and cancer treatments.
              </p>
            </div>
            <div className="premium-card p-8 hover-lift group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                  <span className="text-3xl">🤝</span>
                </div>
              </div>
              <h3 className="text-heading-sm text-secondary mb-3">Community Health</h3>
              <p className="text-secondary-light leading-relaxed">
                Regular blood donations strengthen community resilience and healthcare infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>

      {/* Blood Group Information */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-heading-lg text-secondary mb-4">Understanding Blood Groups</h2>
            <p className="text-lg text-secondary-light max-w-2xl mx-auto">
              Blood type compatibility is crucial for safe transfusions
            </p>
          </div>
          <div className="premium-card p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border-b md:border-b-0 md:border-r border-border pb-8 md:pb-0 md:pr-8">
                <h3 className="text-heading-sm text-secondary mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔴</span> Universal Donor: O-
                </h3>
                <p className="text-secondary-light leading-relaxed">
                  O- blood can be given to anyone, making it the most valuable and critical type in emergency situations. These donors are true lifesavers.
                </p>
              </div>
              <div>
                <h3 className="text-heading-sm text-secondary mb-4 flex items-center gap-3">
                  <span className="text-3xl">💚</span> Universal Recipient: AB+
                </h3>
                <p className="text-secondary-light leading-relaxed">
                  AB+ blood recipients can receive from any blood type, giving them flexibility in emergency situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading-lg text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of blood donors in Bangladesh. Every donation counts and helps save lives in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-white text-primary px-8 py-4 rounded-button text-lg font-semibold hover:bg-bg-primary transition-all duration-300 hover:shadow-lg inline-block"
            >
              Become a Donor Today
            </Link>
            <Link
              href="/blood-requests"
              className="border-2 border-white text-white px-8 py-4 rounded-button text-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-block"
            >
              Browse Blood Requests
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
