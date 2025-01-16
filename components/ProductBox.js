import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--bg-light, #f9f9f9); // Using CSS variables for consistent theming
  border-radius: 8px;
  padding: 10px;
`;

const WhiteBox = styled.div`
  background-color: var(--white, #fff);
  padding: 20px;
  min-height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;

  img {
    max-width: 100%;
    max-height: 120px;
    object-fit: contain; // Prevent image distortion
  }

  &:hover {
    transform: scale(1.02); // Slight zoom effect
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled(Link)`
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--text-dark, #333);
  text-decoration: none;
  margin: 0;
  text-align: center;

  &:hover {
    color: var(--accent-dark, #0070f3);
  }
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;

  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--text-dark, #333);
`;

const HoverButton = styled(Button)`
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--button-hover, rgb(50, 51, 53));
    color: #fff;
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = `/product/${_id}`;

  return (
    <ProductWrapper>
      <Link href={url} passHref>
        <WhiteBox>
          <img src={images?.[0] || "/placeholder.png"} alt={title || "Product Image"} />
        </WhiteBox>
      </Link>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <HoverButton
            block
            onClick={() => addProduct(_id)}
            primary
            outline
            aria-label={`Add ${title} to cart`}
          >
            Add to cart
          </HoverButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
