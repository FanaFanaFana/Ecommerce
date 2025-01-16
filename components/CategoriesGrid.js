import styled from "styled-components";
import Link from "next/link";

const StyledCategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-top: 80px; /* Matches the height of the header */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 2px solid rgb(222, 223, 224); /* Button-like border */
  border-radius: 8px;
  background-color: rgb(65, 65, 65); /* Button background color */
  color: #fff; /* Text color */
  cursor: pointer;
  transition: all 0.3s ease;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    color: #fff; /* Ensure text remains visible on blue background */
  }

  p {
    margin: 0px 0 0;
    font-size: 14px;
    color: #d0d0d0; /* Slightly lighter text for the description */
  }

  &:hover {
    background-color: rgb(27, 28, 29); /* Darker blue on hover */
    border-color: rgb(20, 20, 20); /* Match the hover background */
    transform: scale(1.05); /* Slight zoom on hover */
  }

  &:active {
    transform: scale(0.97); /* Slight shrink on click */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Remove the underline directly from Link */
`;

export default function CategoriesGrid({ categories }) {
  return (
    <StyledCategoriesGrid>
      {categories?.length > 0 &&
        categories.map((category) => (
          <StyledLink href={`/categories/${category._id}`} key={category._id}>
            <CategoryBox>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </CategoryBox>
          </StyledLink>
        ))}
    </StyledCategoriesGrid>
  );
}
