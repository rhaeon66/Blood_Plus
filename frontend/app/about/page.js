export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-secondary mb-4">About BloodPlus</h1>
        <p className="text-lg text-gray-600">
          BloodPlus is a modern, innovative platform dedicated to connecting blood donors with those in urgent need of blood transfusions.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To revolutionize blood donation in Bangladesh by creating a seamless digital platform that connects generous donors with patients in need, saving lives through efficient blood management and rapid response systems.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
          <p className="text-gray-600">
            A Bangladesh where no one suffers from blood shortage, where every donor is recognized, and where lives are saved through technology, compassion, and community cooperation.
          </p>
        </div>
      </section>

      {/* Why Blood Donation Matters */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-secondary mb-8">Why Blood Donation Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Saves Lives</h3>
            <p className="text-gray-600">
              A single unit of blood can save up to three lives during medical emergencies and surgeries.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Emergency Support</h3>
            <p className="text-gray-600">
              Blood is critical during accidents, childbirth complications, and cancer treatments.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Community Health</h3>
            <p className="text-gray-600">
              Regular blood donations strengthen community resilience and healthcare infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Blood Group Information */}
      <section className="mb-16 bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-3xl font-bold text-secondary mb-8">Blood Groups</h2>
        <p className="text-gray-600 mb-6">
          Understanding blood types is essential for safe transfusions. Here's what you need to know:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg text-secondary mb-4">Universal Donor: O- Blood</h3>
            <p className="text-gray-600">
              O- blood can be given to anyone, making it the most valuable type in emergencies.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-secondary mb-4">Universal Recipient: AB+ Blood</h3>
            <p className="text-gray-600">
              AB+ blood recipients can receive from any blood type.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg mb-8">
          Join thousands of blood donors in Bangladesh. Register now and help save lives in your community.
        </p>
        <a
          href="/auth/register"
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
        >
          Become a Donor Today
        </a>
      </section>
    </div>
  );
}
