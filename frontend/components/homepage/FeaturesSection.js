export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-heading-lg text-secondary mb-4">Why Choose BloodPlus?</h2>
          <p className="text-lg text-secondary-light max-w-2xl mx-auto">
            The most trusted platform for blood donation in Bangladesh. Here's what makes us different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="premium-card p-8 hover-lift group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                <span className="text-3xl">⚡</span>
              </div>
            </div>
            <h3 className="text-heading-sm text-secondary mb-3">Easy Donation</h3>
            <p className="text-secondary-light leading-relaxed">
              Simple process to register and become a blood donor in just a few minutes. No hidden fees, no complexity.
            </p>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-semibold text-primary">→ Get started instantly</p>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="premium-card p-8 hover-lift group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                <span className="text-3xl">🔍</span>
              </div>
            </div>
            <h3 className="text-heading-sm text-secondary mb-3">Find Donors Fast</h3>
            <p className="text-secondary-light leading-relaxed">
              Advanced search and matching system to find compatible donors by blood group, location, and availability.
            </p>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-semibold text-primary">→ Search in real-time</p>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="premium-card p-8 hover-lift group">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-red rounded-button flex items-center justify-center group-hover:shadow-red-glow transition-all duration-300">
                <span className="text-3xl">💚</span>
              </div>
            </div>
            <h3 className="text-heading-sm text-secondary mb-3">Save Lives Now</h3>
            <p className="text-secondary-light leading-relaxed">
              Make a real difference by donating blood when it's needed most. Every donation saves up to 3 lives.
            </p>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-semibold text-primary">→ Impact lives today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}