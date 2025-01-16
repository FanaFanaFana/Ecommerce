import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import CategoriesGrid from "@/components/CategoriesGrid";
import Title from "@/components/Title";

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

export default function CategoriesPage({ categories }) {
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <Center>
          <Title>All Categories</Title>
          <CategoriesGrid categories={categories} />
        </Center>
      </ContentWrapper>
      <Footer />
    </PageContainer>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({}, null, { sort: { name: 1 } });
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
