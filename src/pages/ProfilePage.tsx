import type { ReactNode } from 'react';
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
      <header className="flex items-start justify-between gap-4 pb-4 md:pb-6">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{profile.name}</h1>
        <p
          className="shrink-0 pt-1 text-right text-xs leading-5 md:text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          Last updated: {profile.updatedAt}
        </p>
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
        <div className="space-y-2 text-sm leading-7" style={{ color: 'var(--color-muted)' }}>
          <p>
            <span className="font-semibold" style={{ color: 'var(--color-fg)' }}>
              Email:{' '}
            </span>
            <a
              href={`mailto:${profile.contact.email}`}
              className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
              style={{ color: 'var(--color-accent)' }}
            >
              {profile.contact.email}
            </a>
          </p>
          <p>
            <span className="font-semibold" style={{ color: 'var(--color-fg)' }}>
              GitHub:{' '}
            </span>
            <a
              href={profile.contact.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-[color:var(--color-ring)]"
              style={{ color: 'var(--color-accent)' }}
            >
              {profile.contact.githubLabel}
            </a>
          </p>
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
