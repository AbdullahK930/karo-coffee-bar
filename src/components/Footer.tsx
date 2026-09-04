import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "./Logo";
import { site, mapsDirectionsUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-sm text-text-muted">{site.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted">Visit</h3>
            <p className="mt-3 max-w-[16rem] text-text">{site.address}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted">Hours</h3>
            <p className="mt-3 text-text">{site.hours}</p>
            <a href={site.phoneHref} className="mt-1 block text-text transition-colors hover:text-[#f2994a]">
              {site.phone}
            </a>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-text-muted">Follow</h3>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 text-text transition-colors hover:text-[#e85d9c]"
            >
              <InstagramLogo size={17} />
              {site.instagramHandle}
            </a>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-text transition-colors hover:text-[#f2994a]"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6 text-xs text-text-muted lg:px-8">
        © {new Date().getFullYear()} Káro Coffee Bar.
      </div>
    </footer>
  );
}
