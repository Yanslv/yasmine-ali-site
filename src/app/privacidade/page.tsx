import type { Metadata } from "next";
import { privacyPage, seo } from "@/content/site-content";
import { MotionRoot } from "@/components/motion-root";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: seo.privacy.title,
  description: seo.privacy.description,
};

export default function PrivacyPage() {
  return (
    <MotionRoot>
      <section className="aurora min-h-[70svh] pt-[120px] pb-20 md:pt-[168px]">
        <div className="container-editorial max-w-3xl">
          <h1 className="type-h2 text-ink">{privacyPage.title}</h1>
          <div className="mt-10 grid gap-5">
            {privacyPage.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[62ch] text-lg text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink link={{ label: privacyPage.backHome, href: "/" }} variant="secondary" />
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
