import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Quad",
  description: "Terms and conditions for using Quad.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-campus-bg px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-campus-muted hover:text-campus-primary transition-colors mb-10"
        >
          ← Back to Quad
        </Link>

        <h1 className="text-4xl font-extrabold text-campus-primary mb-2">
          Terms of Service
        </h1>
        <p className="text-campus-muted text-sm mb-12">
          Last updated: June 18, 2026
        </p>

        <div className="flex flex-col gap-10 text-campus-muted leading-relaxed text-[15px]">

          <section>
            <p>
              By downloading or using Quad, you agree to these Terms of Service.
              If you do not agree, do not use the app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              1. What Quad is
            </h2>
            <p>
              Quad is a student productivity app that extracts deadlines, grade
              breakdowns, and course information from syllabi using AI, and helps
              you track your grades throughout the semester. Quad is a tool to
              assist you — always verify critical deadlines against your original
              syllabus and your institution&rsquo;s official course materials.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              2. Eligibility
            </h2>
            <p>
              You must be at least 13 years old to use Quad. By creating an
              account you represent that you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              3. Your account
            </h2>
            <p>
              You are responsible for maintaining the security of your account
              credentials and for all activity that occurs under your account.
              Notify us immediately at{" "}
              <a
                href="mailto:herbasf22@gmail.com"
                className="text-campus-primary hover:underline"
              >
                herbasf22@gmail.com
              </a>{" "}
              if you suspect unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              4. Acceptable use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc list-outside ml-5 flex flex-col gap-2">
              <li>Upload content you do not have the right to share</li>
              <li>Attempt to reverse-engineer, scrape, or abuse the service</li>
              <li>Use Quad to violate any applicable law or regulation</li>
              <li>
                Share your account credentials with others or create accounts
                on behalf of others without their knowledge
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              5. AI-generated content
            </h2>
            <p>
              Quad uses AI to extract information from syllabi. Extracted
              deadlines, grade weights, and course details may contain errors.
              We are not responsible for any academic consequences resulting from
              reliance on AI-extracted information. Always cross-check important
              dates with your professor or institution.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              6. Intellectual property
            </h2>
            <p>
              The Quad app, brand, and all original content are owned by Quad.
              You retain full ownership of the syllabi and data you upload.
              By uploading a syllabus, you grant Quad a limited license to
              process it solely for the purpose of providing the extraction
              service to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              7. Disclaimer of warranties
            </h2>
            <p>
              Quad is provided &ldquo;as is&rdquo; without warranties of any kind,
              express or implied. We do not guarantee that the service will be
              uninterrupted, error-free, or that extracted information will be
              accurate or complete.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              8. Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Quad shall not be liable
              for any indirect, incidental, or consequential damages arising from
              your use of the app, including missed deadlines or grade impacts
              resulting from inaccurate AI extraction.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              9. Termination
            </h2>
            <p>
              You may delete your account at any time from the Profile tab in
              the app. We reserve the right to suspend or terminate accounts
              that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              10. Changes to these terms
            </h2>
            <p>
              We may update these terms as the app evolves. Material changes will
              be communicated via the app or email. Continued use after changes
              take effect constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              11. Contact
            </h2>
            <p>
              Questions about these terms:{" "}
              <a
                href="mailto:herbasf22@gmail.com"
                className="text-campus-primary hover:underline font-medium"
              >
                herbasf22@gmail.com
              </a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-campus-border text-sm text-campus-muted flex gap-6">
          <Link href="/" className="hover:text-campus-primary transition-colors">
            Home
          </Link>
          <Link href="/privacy" className="hover:text-campus-primary transition-colors">
            Privacy Policy
          </Link>
        </div>

      </div>
    </main>
  );
}
