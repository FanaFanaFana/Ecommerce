import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.3s ease; // Smooth zoom effect
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap; // Allows wrapping for smaller screens
  justify-content: center;
  margin-top: 10px;
`;

const ImageButton = styled.button`
  border: 2px solid ${({ active }) => (active ? "#0070f3" : "transparent")};
  background: transparent;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
  height: 40px;
  width: 40px; // Ensures a consistent size
  transition: border-color 0.3s ease, transform 0.2s ease;

  &:hover,
  &:focus {
    border-color: #0070f3; // Highlight on hover or focus
    transform: scale(1.1); // Slight zoom effect
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const BigImageWrapper = styled.div`
  text-align: center;

  &:hover ${BigImage} {
    transform: scale(1.02); // Slight zoom on hover
  }
`;

export default function ProductImages({ images = [] }) {
  const [activeImage, setActiveImage] = useState(images?.[0] || "/placeholder.png");

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="Active product image" />
      </BigImageWrapper>
      <ImageButtons>
        {images.length > 0 ? (
          images.map((image, index) => (
            <ImageButton
              key={image}
              active={image === activeImage}
              onClick={() => setActiveImage(image)}
              aria-selected={image === activeImage} // Accessibility for screen readers
              aria-label={`Select product image ${index + 1}`}
            >
              <Image src={image} alt={`Thumbnail ${index + 1}`} />
            </ImageButton>
          ))
        ) : (
          <p>No images available.</p> // Fallback for empty images array
        )}
      </ImageButtons>
    </>
  );
}
