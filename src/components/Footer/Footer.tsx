import { cn } from '@/utils';
import { motion } from 'motion/react';
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
    <motion.footer
      className={cn(
        'bg-gradient-to-r from-primary-dark via-primary to-primary-dark'
      )}
    >
      <motion.div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div className="space-y-4 flex flex-col">
            {brand}
            <motion.p className="text-sm text-white leading-relaxed">
              {description}
            </motion.p>
            {/* Social Icons */}
            {socialLinks && (
              <motion.div className={cn('flex items-center gap-3')}>
                {socialLinks}
              </motion.div>
            )}
          </motion.div>

          {/* Explorar */}
          {exploreItems && (
            <motion.div>
              <motion.h3 className="font-semibold text-white mb-4">
                {exploreLabel}
              </motion.h3>
              <motion.ul className="space-y-3">
                {exploreItems &&
                  exploreItems.map((item, index) => (
                    <motion.li key={index}>{item}</motion.li>
                  ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Comunidad */}
          {communityItems && (
            <motion.div>
              <motion.h3 className="font-semibold text-white mb-4">
                {communityLabel}
              </motion.h3>
              <motion.ul className="space-y-3">
                {communityItems &&
                  communityItems.map((item, index) => (
                    <motion.li key={index}>{item}</motion.li>
                  ))}
              </motion.ul>
            </motion.div>
          )}

          {/* Legal */}
          {legalItems && (
            <motion.div>
              <motion.h3 className="font-semibold text-white mb-4">
                {legalLabel}
              </motion.h3>
              <motion.ul className="space-y-3">
                {legalItems &&
                  legalItems.map((item, index) => (
                    <motion.li key={index}>{item}</motion.li>
                  ))}
              </motion.ul>
            </motion.div>
          )}
        </motion.div>

        {/* Copyright */}
        <motion.div className="mt-12 pt-8 border-t border-gray-200 dark:border-stone-800">
          <motion.p className="text-sm text-center text-white">
            © {new Date().getFullYear()} EKORU. {copyRightText}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
}
