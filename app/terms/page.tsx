export default function TermsPage() {
  return (
    <main className="min-h-screen bg-campus-bg px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-campus-primary mb-4">Terms of Service</h1>
        <p className="text-campus-muted text-sm mb-10">Last updated: June 2026</p>

        <div className="flex flex-col gap-8 text-campus-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">Use of Quad</h2>
            <p>Quad is a tool to help students organize their coursework. You agree to use it only for lawful purposes and not to upload materials you do not have the right to share.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">Beta disclaimer</h2>
            <p>Quad is currently in beta. The service is provided as-is. We make no guarantees about accuracy of extracted information — always verify important deadlines against your original syllabus.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">Intellectual property</h2>
            <p>Quad and its content are owned by Quad. You retain ownership of any syllabi you upload.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">Contact</h2>
            <p>Questions? Email <a href="mailto:herbasf22@gmail.com" className="text-campus-primary hover:underline">herbasf22@gmail.com</a></p>
          </section>
        </div>
      </div>
    </main>
  );
}
