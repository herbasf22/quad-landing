export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-campus-bg px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-campus-primary mb-4">Privacy Policy</h1>
        <p className="text-campus-muted text-sm mb-10">Last updated: June 2026</p>

        <div className="flex flex-col gap-8 text-campus-muted leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">What we collect</h2>
            <p>When you join the Quad waitlist, we collect your email address. We use it solely to notify you when Quad launches and to send relevant product updates. We do not sell your data.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">Syllabus data</h2>
            <p>When you upload a syllabus, it is processed to extract deadlines and course information. Uploaded documents are not stored beyond the time needed to complete extraction.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-2">Third-party services</h2>
            <p>Quad integrates with Google Calendar and Apple Calendar at your direction. We do not access your calendar data without your explicit authorization.</p>
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
