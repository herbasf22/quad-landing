import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Quad",
  description: "How Quad collects, uses, and protects your data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-campus-muted text-sm mb-12">
          Last updated: June 18, 2026
        </p>

        <div className="flex flex-col gap-10 text-campus-muted leading-relaxed text-[15px]">

          <section>
            <p>
              Quad (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;the app&rdquo;) is a
              student productivity tool that helps you organize your semester from
              your syllabi. This policy explains what data we collect, why we collect
              it, and how we protect it.
            </p>
          </section>

          {/* 1 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              1. Data we collect
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-campus-text mb-1">Account data</p>
                <p>
                  When you create an account we collect your email address and a
                  hashed password. You may optionally provide your name and
                  education level during onboarding — this is stored to personalize
                  the experience.
                </p>
              </div>
              <div>
                <p className="font-semibold text-campus-text mb-1">
                  Class and academic data
                </p>
                <p>
                  We store the class names, professor details, deadlines, and grade
                  information you enter or import. This data is tied to your account
                  and is used solely to provide the app&rsquo;s features.
                </p>
              </div>
              <div>
                <p className="font-semibold text-campus-text mb-1">
                  Syllabus files
                </p>
                <p>
                  When you upload a syllabus (PDF or photo), it is sent to our
                  AI extraction service to identify deadlines and course details.
                  The file itself is not stored after extraction is complete —
                  only the structured data (deadlines, class info) is saved to
                  your account.
                </p>
              </div>
              <div>
                <p className="font-semibold text-campus-text mb-1">
                  Preferences and settings
                </p>
                <p>
                  App settings such as your notification preferences and current
                  semester are stored locally on your device and in your account
                  profile.
                </p>
              </div>
              <div>
                <p className="font-semibold text-campus-text mb-1">
                  Notification permissions
                </p>
                <p>
                  If you enable deadline reminders, we request notification
                  permission on your device. We do not collect or transmit your
                  device token to our servers — notifications are scheduled
                  locally on your device.
                </p>
              </div>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              2. How we use your data
            </h2>
            <ul className="list-disc list-outside ml-5 flex flex-col gap-2">
              <li>To provide and operate the Quad app and its features</li>
              <li>To sync your classes and deadlines across sessions</li>
              <li>To calculate and display your grades and GPA</li>
              <li>To send local deadline reminders you have configured</li>
              <li>
                To improve the app — we may review anonymized, aggregated
                usage patterns (never individual academic data)
              </li>
            </ul>
            <p className="mt-4 font-semibold text-campus-text">
              We do not sell your data. Ever.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              3. Third-party services
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-campus-text mb-1">
                  Supabase (database &amp; authentication)
                </p>
                <p>
                  Your account and academic data is stored in Supabase, a
                  secure cloud database provider. Data is encrypted at rest and
                  in transit. Supabase does not use your data for any purpose
                  other than storage.{" "}
                  <a
                    href="https://supabase.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-campus-primary hover:underline"
                  >
                    Supabase Privacy Policy →
                  </a>
                </p>
              </div>
              <div>
                <p className="font-semibold text-campus-text mb-1">
                  Anthropic (AI syllabus extraction)
                </p>
                <p>
                  Syllabus files you upload are processed by Anthropic&rsquo;s
                  Claude AI to extract deadlines and course information. Files
                  are transmitted securely and are not used to train Anthropic&rsquo;s
                  models under our API agreement.{" "}
                  <a
                    href="https://www.anthropic.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-campus-primary hover:underline"
                  >
                    Anthropic Privacy Policy →
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              4. Data retention
            </h2>
            <p>
              Your data is retained as long as your account is active. If you
              delete your account, all associated data — classes, deadlines,
              grades, and profile information — is permanently deleted within
              30 days.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              5. Your rights
            </h2>
            <ul className="list-disc list-outside ml-5 flex flex-col gap-2">
              <li>
                <span className="font-medium text-campus-text">Access:</span>{" "}
                You can view all data Quad holds about you within the app.
              </li>
              <li>
                <span className="font-medium text-campus-text">Deletion:</span>{" "}
                You can delete your account at any time from the Profile tab in
                the app. This permanently removes all your data.
              </li>
              <li>
                <span className="font-medium text-campus-text">Portability:</span>{" "}
                You can export your deadline data to Apple Calendar or Google
                Calendar at any time from the Classes tab.
              </li>
            </ul>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              6. Children&rsquo;s privacy
            </h2>
            <p>
              Quad is intended for users 13 and older. We do not knowingly collect
              personal information from children under 13. If you believe a child
              under 13 has created an account, please contact us and we will delete
              the account promptly.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              7. Security
            </h2>
            <p>
              All data is transmitted over HTTPS. Passwords are never stored in
              plain text. We use industry-standard security practices through our
              infrastructure providers. No method of transmission over the internet
              is 100% secure — if you discover a security issue, please contact us
              immediately.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              8. Changes to this policy
            </h2>
            <p>
              We may update this policy as the app evolves. If we make material
              changes, we will notify you via the app or by email. Continued use
              of Quad after changes take effect constitutes acceptance of the
              updated policy.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-lg font-bold text-campus-text mb-3">
              9. Contact
            </h2>
            <p>
              Questions, concerns, or data deletion requests:{" "}
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
          <Link href="/terms" className="hover:text-campus-primary transition-colors">
            Terms of Service
          </Link>
        </div>

      </div>
    </main>
  );
}
