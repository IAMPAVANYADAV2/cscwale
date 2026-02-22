export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">CSCWale</h1>
        <p className="mt-4 text-lg">
          Har Gaon ka Digital Dost — Online Services Ek Jagah
        </p>
        <a
          href="https://wa.me/919452657508"
          className="inline-block mt-6 bg-orange-500 px-6 py-3 rounded-lg font-semibold"
        >
          WhatsApp Karein
        </a>
      </section>

      {/* Services */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
          <div className="p-4 border rounded">Aadhaar Services</div>
          <div className="p-4 border rounded">Income / Caste</div>
          <div className="p-4 border rounded">PAN Card</div>
          <div className="p-4 border rounded">Bill Payment</div>
          <div className="p-4 border rounded">Govt Schemes</div>
          <div className="p-4 border rounded">Online Forms</div>
        </div>
      </section>

      {/* About */}
      <section className="bg-gray-100 py-12 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">About CSCWale</h2>
        <p>
          CSCWale ek digital initiative hai jo Bhadohi se shuru hua,
          jiska aim hai har aadmi tak fast aur trusted online services pahunchana.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        © 2026 CSCWale.com
      </footer>
    </main>
  );
}