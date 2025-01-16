import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { useRouter } from "next/router";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 10px;
`;

const CityHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const StyledButton = styled(Button)`
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgb(57, 58, 59);
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });
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
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const moreOfThisProduct = useCallback((id) => {
    addProduct(id);
  }, [addProduct]);

  const lessOfThisProduct = useCallback((id) => {
    removeProduct(id);
  }, [removeProduct]);

  async function goToPayment() {
    const { name, email, city, postalCode, streetAddress, country } = form;
    if (!name || !email || !city || !postalCode || !streetAddress || !country) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/checkout", {
        ...form,
        cartProducts,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  let total = 0;
  cartProducts.forEach((productId) => {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  });

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
                <p>Your cart is empty</p>
              ) : (
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
                            <img src={product.images[0]} alt={product.title} />
                          </ProductImageBox>
                          {product.title}
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
                      <td colSpan="2">Total</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>

            {cartProducts.length > 0 && (
              <Box>
                <h2>Order Information</h2>
                {Object.keys(form).map((key) => (
                  <Input
                    key={key}
                    type="text"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={form[key]}
                    onChange={(e) => updateForm(key, e.target.value)}
                  />
                ))}
                <StyledButton onClick={goToPayment} block>
                  Continue to payment
                </StyledButton>
              </Box>
            )}
          </ColumnsWrapper>
        </Center>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}
