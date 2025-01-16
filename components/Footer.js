import styled from "styled-components";
import Link from "next/link";

const FooterContainer = styled.footer`
  background-color: #222; // Matches the dark theme
  color: #aaa;
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
  gap: 40px;

  a {
    color: #aaa;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #fff;
    }
  }
`;

const FooterBrand = styled.div`
  font-size: 1rem;

  span {
    color: #555; // Slightly different shade for style
  }
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 20px; // Increased gap for better spacing

  a {
    color: #aaa;
    transition: color 0.3s ease;

    &:hover {
      color: #fff;
    }
  }

  img {
    width: 24px; // Adjust size for visibility
    height: 24px;
    transition: transform 0.3s ease; // Smooth scaling on hover
  }

  img:hover {
    transform: scale(1.2); // Slight scaling effect on hover
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterBrand>
          Paintables <span>© {new Date().getFullYear()}</span>
        </FooterBrand>

        <FooterNav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
        </FooterNav>

        <FooterSocial>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src="/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src="/twitter.svg" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src="/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img src="/youtube.svg" alt="YouTube" />
          </a>
        </FooterSocial>
      </FooterWrapper>
    </FooterContainer>
  );
}
