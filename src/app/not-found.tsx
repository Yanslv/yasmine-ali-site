import { notFoundPage } from "@/content/site-content";
import { MotionRoot } from "@/components/motion-root";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <MotionRoot>
      <section className="aurora flex min-h-[80svh] items-center pt-[120px] pb-20">
        <div className="container-editorial">
          <p className="eyebrow mb-6 text-accent">404</p>
          <h1 className="type-h2 max-w-[16ch] text-ink">{notFoundPage.title}</h1>
          <p className="mt-6 max-w-[44ch] text-lg text-muted">{notFoundPage.text}</p>
          <div className="mt-10">
            <ButtonLink link={{ label: notFoundPage.backHome, href: "/" }} />
          </div>
        </div>
      </section>
    </MotionRoot>
  );
}
