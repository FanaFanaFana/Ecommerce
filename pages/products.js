import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

// Flexbox container for the page layout
const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it spans the full viewport height */
`;

// Content wrapper to allow main content to expand and push the footer down
const ContentWrapper = styled.div`
  flex-grow: 1; /* Makes this area take up available space */
`;

export default function ProductsPage({ products }) {
  return (
    <PageLayout>
      <Header />
      <ContentWrapper>
        <Center>
          <Title>All products</Title>
          <ProductsGrid products={products} />
        </Center>
      </ContentWrapper>
      <Footer />
    </PageLayout>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
