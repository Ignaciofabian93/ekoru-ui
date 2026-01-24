import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  type LucideIcon,
} from 'lucide-react';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

// Helper components for consistent styling
const SocialIconLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) => (
  <a
    href={href}
    className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
  >
    {children}
  </a>
);

const BrandLogo = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold text-white">{children}</h2>
);

export const Default: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Plataforma de economía circular, consumo consciente y comunidad.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
      <SocialIconLink key="twitter" href="#" icon={Twitter} label="Twitter" />,
      <SocialIconLink
        key="linkedin"
        href="#"
        icon={Linkedin}
        label="LinkedIn"
      />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios
      </FooterLink>,
      <FooterLink key="secondhand" href="#">
        Segunda mano
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="initiatives" href="#">
        Iniciativas
      </FooterLink>,
      <FooterLink key="events" href="#">
        Eventos
      </FooterLink>,
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad
      </FooterLink>,
      <FooterLink key="help" href="#">
        Ayuda
      </FooterLink>,
      <FooterLink key="contact" href="#">
        Contacto
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const WithoutSocialIcons: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Plataforma de economía circular, consumo consciente y comunidad.',
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios
      </FooterLink>,
      <FooterLink key="secondhand" href="#">
        Segunda mano
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="initiatives" href="#">
        Iniciativas
      </FooterLink>,
      <FooterLink key="events" href="#">
        Eventos
      </FooterLink>,
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad
      </FooterLink>,
      <FooterLink key="help" href="#">
        Ayuda
      </FooterLink>,
      <FooterLink key="contact" href="#">
        Contacto
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const MinimalLinks: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Plataforma de economía circular, consumo consciente y comunidad.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const WithoutDescription: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
      <SocialIconLink key="twitter" href="#" icon={Twitter} label="Twitter" />,
      <SocialIconLink
        key="linkedin"
        href="#"
        icon={Linkedin}
        label="LinkedIn"
      />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios
      </FooterLink>,
      <FooterLink key="secondhand" href="#">
        Segunda mano
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="initiatives" href="#">
        Iniciativas
      </FooterLink>,
      <FooterLink key="events" href="#">
        Eventos
      </FooterLink>,
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad
      </FooterLink>,
      <FooterLink key="help" href="#">
        Ayuda
      </FooterLink>,
      <FooterLink key="contact" href="#">
        Contacto
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const OnlyBrandAndLinks: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Privacidad
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const TwoColumns: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Plataforma de economía circular, consumo consciente y comunidad.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
      <SocialIconLink key="twitter" href="#" icon={Twitter} label="Twitter" />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const CustomBrand: Story = {
  args: {
    brand: (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-2xl">🌱</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">EKORU</h2>
          <p className="text-xs text-white/60">Eco Marketplace</p>
        </div>
      </div>
    ),
    description:
      'Plataforma de economía circular, consumo consciente y comunidad.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
      <SocialIconLink key="twitter" href="#" icon={Twitter} label="Twitter" />,
      <SocialIconLink
        key="linkedin"
        href="#"
        icon={Linkedin}
        label="LinkedIn"
      />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios
      </FooterLink>,
      <FooterLink key="secondhand" href="#">
        Segunda mano
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="initiatives" href="#">
        Iniciativas
      </FooterLink>,
      <FooterLink key="events" href="#">
        Eventos
      </FooterLink>,
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad
      </FooterLink>,
      <FooterLink key="help" href="#">
        Ayuda
      </FooterLink>,
      <FooterLink key="contact" href="#">
        Contacto
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const EnglishVersion: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Circular economy platform, conscious consumption and community.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
      <SocialIconLink key="twitter" href="#" icon={Twitter} label="Twitter" />,
      <SocialIconLink
        key="linkedin"
        href="#"
        icon={Linkedin}
        label="LinkedIn"
      />,
    ],
    exploreLabel: 'Explore',
    exploreItems: [
      <FooterLink key="market" href="#">
        Marketplace
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Stores
      </FooterLink>,
      <FooterLink key="services" href="#">
        Services
      </FooterLink>,
      <FooterLink key="secondhand" href="#">
        Second Hand
      </FooterLink>,
    ],
    communityLabel: 'Community',
    communityItems: [
      <FooterLink key="initiatives" href="#">
        Initiatives
      </FooterLink>,
      <FooterLink key="events" href="#">
        Events
      </FooterLink>,
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impact
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Terms & Conditions
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Privacy Policy
      </FooterLink>,
      <FooterLink key="help" href="#">
        Help
      </FooterLink>,
      <FooterLink key="contact" href="#">
        Contact
      </FooterLink>,
    ],
    copyRightText: 'All rights reserved.',
  },
};

export const LongContent: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Plataforma de economía circular, consumo consciente y comunidad. Conectamos personas comprometidas con el medio ambiente y un futuro sostenible.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
      <SocialIconLink key="twitter" href="#" icon={Twitter} label="Twitter" />,
      <SocialIconLink
        key="linkedin"
        href="#"
        icon={Linkedin}
        label="LinkedIn"
      />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado de productos sostenibles
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas verificadas
      </FooterLink>,
      <FooterLink key="services" href="#">
        Servicios ecológicos
      </FooterLink>,
      <FooterLink key="secondhand" href="#">
        Segunda mano certificada
      </FooterLink>,
      <FooterLink key="rental" href="#">
        Alquiler de productos
      </FooterLink>,
      <FooterLink key="repair" href="#">
        Servicios de reparación
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="initiatives" href="#">
        Iniciativas verdes
      </FooterLink>,
      <FooterLink key="events" href="#">
        Eventos y talleres
      </FooterLink>,
      <FooterLink key="blog" href="#">
        Blog y noticias
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Reporte de impacto
      </FooterLink>,
      <FooterLink key="forum" href="#">
        Foro comunitario
      </FooterLink>,
    ],
    legalLabel: 'Legal',
    legalItems: [
      <FooterLink key="terms" href="#">
        Términos y condiciones de uso
      </FooterLink>,
      <FooterLink key="privacy" href="#">
        Política de privacidad y datos
      </FooterLink>,
      <FooterLink key="cookies" href="#">
        Política de cookies
      </FooterLink>,
      <FooterLink key="help" href="#">
        Centro de ayuda
      </FooterLink>,
      <FooterLink key="contact" href="#">
        Contacto y soporte
      </FooterLink>,
      <FooterLink key="about" href="#">
        Acerca de nosotros
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const MinimalFooter: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    copyRightText: 'Todos los derechos reservados.',
  },
};

export const NoLegalSection: Story = {
  args: {
    brand: <BrandLogo>EKORU</BrandLogo>,
    description:
      'Plataforma de economía circular, consumo consciente y comunidad.',
    socialLinks: [
      <SocialIconLink
        key="facebook"
        href="#"
        icon={Facebook}
        label="Facebook"
      />,
      <SocialIconLink
        key="instagram"
        href="#"
        icon={Instagram}
        label="Instagram"
      />,
    ],
    exploreLabel: 'Explorar',
    exploreItems: [
      <FooterLink key="market" href="#">
        Mercado
      </FooterLink>,
      <FooterLink key="stores" href="#">
        Tiendas
      </FooterLink>,
    ],
    communityLabel: 'Comunidad',
    communityItems: [
      <FooterLink key="blog" href="#">
        Blog
      </FooterLink>,
      <FooterLink key="impact" href="#">
        Impacto
      </FooterLink>,
    ],
    copyRightText: 'Todos los derechos reservados.',
  },
};
