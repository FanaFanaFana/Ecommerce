import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
  position: fixed; /* Always stays at the top */
  top: 0;
  width: 100%; /* Ensure it spans the entire width */
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center; /* Align logo and brand name horizontally */
  flex-grow: 1;
  margin-left: -32px; /* Shift logo and brand name a bit to the left */
`;

const Logo = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px; /* Add space between the logo and brand name */
  &:hover {
    transform: scale(1.02); /* Slight scaling effect on hover */
  }
  &:active {
    transform: scale(0.98); /* Slight shrink on click */
  }
`;

const LogoText = styled.span`
  color: #fff;
  font-size: 18px; /* Adjust font size as needed */
  &:hover {
    color: grey; /* Change the brand name color to grey on hover */
  }
  &:active {
    transform: scale(0.98); /* Slight shrink on click */
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
`;

const StyledNav = styled.nav`
  ${(props) => (props.mobileNavActive ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #aaa;
  text-decoration: none;
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 5px;
  gap: 8px;
  &:hover {
    background-color: #333;
    color: white;
  }
  @media screen and (min-width: 768px) {
    padding: 8px 12px;
  }
  &:active {
    transform: scale(0.97); /* Slight shrink on click */
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [svgLogo, setSvgLogo] = useState(null);

  useEffect(() => {
    fetch('/logopng.svg') // Ensure this path is correct
      .then((res) => res.text())
      .then((svgText) => {
        // Replace all `fill` attributes with `white`
        const updatedSvg = svgText.replace(/fill="[^"]*"/g, 'fill="white"');
        setSvgLogo(updatedSvg);
      });
  }, []);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <LogoWrapper>
            <Logo href="/">
              {/* Inline SVG */}
              <div
                dangerouslySetInnerHTML={{
                  __html: svgLogo || '', // Render SVG once fetched
                }}
              />
              <LogoText>Paintables</LogoText>
            </Logo>
          </LogoWrapper>

          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">All products</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/cart">
              Cart ({cartProducts.length}) {/* Display number of items */}
            </NavLink>
          </StyledNav>

          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
