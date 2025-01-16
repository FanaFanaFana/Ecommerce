import styled from "styled-components";
import Link from "next/link";

const FooterContainer = styled.footer`
  background-color: var(--bg-dark, #222); // Use CSS variables for colors
  color: var(--text-muted, #aaa);
  padding: 5px 0;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 50px;
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap; // Wrap links for smaller screens
  gap: 20px;

  a {
    color: var(--text-muted, #aaa);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--text-light, #fff);
    }
  }
`;

const FooterBrand = styled.div`
  font-size: 1rem;

  span {
    color: var(--accent-muted, #555);
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: var(--text-muted, #aaa);
    transition: color 0.3s ease;

    &:hover {
      color: var(--text-light, #fff);
    }
  }

  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.2);
  }
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterBrand>
          Paintables <span>© {currentYear}</span>
        </FooterBrand>

        <FooterNav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </FooterNav>

        <FooterSocial>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            title="Visit us on Facebook"
          >
            <img src="/facebook.svg" alt="Facebook" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            title="Follow us on Twitter"
          >
            <img src="/twitter.svg" alt="Twitter" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            title="Check out our Instagram"
          >
            <img src="/instagram.svg" alt="Instagram" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            title="Subscribe to our YouTube channel"
          >
            <img src="/youtube.svg" alt="YouTube" />
          </a>
        </FooterSocial>
      </FooterWrapper>
    </FooterContainer>
  );
}
