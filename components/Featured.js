import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
  padding-top: 100px; /* Matches the height of the header */
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: .8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

// Add hover effects for the buttons
const HoverButtonLink = styled(ButtonLink)`
  transition: all 0.3s ease;
  &:hover {
    background-color: #555;  // Change to grey on hover
    color: white;
    transform: scale(1.05);  // Slightly grow on hover
  }
     &:active {
    transform: scale(0.97); /* Slight shrink on click */
  }
`;

const HoverButton = styled(Button)`
  transition: all 0.3s ease;
  &:hover {
    background-color: #555;  // Change to grey on hover
    color: white;
    transform: scale(1.05);  // Slightly grow on hover
  }
     &:active {
    transform: scale(0.97); /* Slight shrink on click */
  }
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <HoverButtonLink href={'/product/' + product._id} outline={1} white={1}>
                  Read more
                </HoverButtonLink>
                <HoverButton white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </HoverButton>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://yannickwebdev-ecommerce.s3.amazonaws.com/1734277372714.png" alt="" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
