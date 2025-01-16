import styled from "styled-components";
import Button from "@/components/Button"; // Assuming this is a styled component
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  img {
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-weight: bold;
  font-size: .8rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
  
  
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 10px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: left;
  }
`;

// Add styles to the button component for hover effect
const HoverButton = styled(Button)`
  transition: all 0.3s ease;  // Smooth transition for changes
  &:hover {
    background-color:rgb(50, 51, 53);  // Blue color on hover
    color: #fff;  // White text on hover
    transform: scale(1.03);  // Slightly increase the size
  }
     &:active {
    transform: scale(0.97); /* Slight shrink on click */
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + _id;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <HoverButton block onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </HoverButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
