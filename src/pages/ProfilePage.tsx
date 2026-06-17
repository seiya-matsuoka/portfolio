import type { ReactNode } from 'react';
import { FiMail } from 'react-icons/fi';
import { SiGithub } from 'react-icons/si';
import { Link } from 'react-router';
import { TagList } from '../components/common/TagList';
import { profile } from '../data/profile';

type ProfileSectionProps = {
  title: string;
  children: ReactNode;
};

function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <section className="py-6 md:py-8">
      <h2
        className="border-b pb-2 text-xl font-semibold tracking-tight md:text-2xl"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-fg)' }}
      >
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProfilePage() {
  return (
    <div className="py-10 md:py-14">
      <header className="pb-4 md:pb-6">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{profile.name}</h1>
      </header>

      <ProfileSection title="About">
        <div className="space-y-2 leading-7" style={{ color: 'var(--color-muted)' }}>
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Tech Stack">
        <div className="space-y-5">
          {profile.techStacks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--color-fg)' }}>
                {group.title}
              </h3>
              <TagList items={group.items} className="mt-2" />
            </div>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Current Focus">
        <ul className="space-y-2 text-sm leading-7" style={{ color: 'var(--color-muted)' }}>
          {profile.currentFocus.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden="true">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </ProfileSection>

      <ProfileSection title="Portfolio">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {profile.portfolioLinks.map((section) => (
            <Link
              key={section.href}
              to={section.href}
              className="group rounded-lg border p-4 outline-offset-2 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-card)',
                color: 'var(--color-fg)',
              }}
            >
              <span className="text-sm font-semibold">{section.title}</span>
              <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-muted)' }}>
                {section.description}
              </p>
              <span className="mt-3 inline-flex text-sm font-medium group-hover:underline">
                View page →
              </span>
            </Link>
          ))}
        </div>
      </ProfileSection>

      <ProfileSection title="Contact">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${profile.contact.email}`}
            className="btn-secondary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
          >
            <FiMail className="h-4 w-4" aria-hidden="true" />
            <span>Email</span>
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm outline-offset-2 focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
          >
            <SiGithub className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </ProfileSection>

      <ProfileSection title="English Summary">
        <div
          lang="en"
          className="space-y-2 text-sm leading-7"
          style={{ color: 'var(--color-muted)' }}
        >
          {profile.englishSummary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ProfileSection>
    </div>
  );
}
