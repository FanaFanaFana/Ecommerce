import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useRouter } from "next/router";

// Flexbox container to structure the entire page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the page covers the full viewport height */
`;

// Content wrapper to push the footer to the bottom
const ContentWrapper = styled.div`
  flex-grow: 1; /* Allows this section to take up available space */
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  padding-top: 80px; /* Matches the height of the header */
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductName = styled.div`
  margin-top: 10px;  // Space between the image and name
  font-size:1.2rem;
  margin-left:2px;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

// Styled Button with hover effect
const StyledButton = styled(Button)`
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgb(57, 58, 59); /* Change this to the color you prefer */
    transform: scale(1.02); /* Slightly enlarge the button */
  }
  &:active {
    transform: scale(0.97); /* Slight shrink on click */
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Thanks for your order!</h1>
                <p>We will email you when your order is sent.</p>
              </Box>
            </ColumnsWrapper>
          </Center>
        </ContentWrapper>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h2>Cart</h2>
              {cartProducts.length === 0 ? (
                <div>
                  <p>Your cart is empty</p>
                  <StyledButton onClick={() => router.push("/")} block>
                    Back to Home
                  </StyledButton>
                </div>
              ) : (
                <>
                  {products.length > 0 && (
                    <Table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product._id}>
                            <ProductInfoCell>
                              <ProductImageBox>
                                <img src={product.images[0]} alt="" />
                              </ProductImageBox>
                              <ProductName>{product.title}</ProductName>
                            </ProductInfoCell>
                            <td>
                              <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                              <QuantityLabel>
                                {cartProducts.filter((id) => id === product._id).length}
                              </QuantityLabel>
                              <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                            </td>
                            <td>
                            ${(cartProducts.filter((id) => id === product._id).length * product.price).toFixed(2)}

                            </td>
                          </tr>
                        ))}
                        <tr>
                       <td></td>
                       <td></td>
                       <td><strong>${total.toFixed(2)}</strong></td>
                       </tr>

                      </tbody>
                    </Table>
                  )}
                </>
              )}
            </Box>

            {cartProducts.length > 0 && (
              <Box>
                <h2>Order Information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Button black block onClick={goToPayment}>
                  Continue to payment
                </Button>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}
