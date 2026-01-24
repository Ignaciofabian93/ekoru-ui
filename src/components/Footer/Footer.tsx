export interface FooterProps {
  brand?: React.ReactNode;
  socialLinks?: Array<React.ReactNode>;
  description?: string;
  exploreLabel?: string;
  communityLabel?: string;
  legalLabel?: string;
  exploreItems?: Array<React.ReactNode>;
  communityItems?: Array<React.ReactNode>;
  legalItems?: Array<React.ReactNode>;
  copyRightText?: string;
}

export default function Footer({
  brand,
  socialLinks,
  description,
  exploreItems,
  exploreLabel = 'Explore',
  communityItems,
  communityLabel = 'Community',
  legalItems,
  legalLabel = 'Legal',
  copyRightText = `All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 flex flex-col">
            {brand}
            <p className="text-sm text-white leading-relaxed">{description}</p>
            {/* Social Icons */}
            {socialLinks && (
              <div className="flex items-center gap-3">{socialLinks}</div>
            )}
          </div>

          {/* Explorar */}
          {exploreItems && (
            <div>
              <h3 className="font-semibold text-white mb-4">{exploreLabel}</h3>
              <ul className="space-y-3">
                {exploreItems &&
                  exploreItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Comunidad */}
          {communityItems && (
            <div>
              <h3 className="font-semibold text-white mb-4">
                {communityLabel}
              </h3>
              <ul className="space-y-3">
                {communityItems &&
                  communityItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Legal */}
          {legalItems && (
            <div>
              <h3 className="font-semibold text-white mb-4">{legalLabel}</h3>
              <ul className="space-y-3">
                {legalItems &&
                  legalItems.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-stone-800">
          <p className="text-sm text-center text-white">
            © {new Date().getFullYear()} EKORU. {copyRightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
