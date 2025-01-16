import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category"; // Import the Category model
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function CategoryPage({ categoryName, products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>{categoryName}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { categoryId } = context.params;
  await mongooseConnect();

  // Fetch the category name
  const category = await Category.findById(categoryId); // Use the imported Category model
  if (!category) {
    return {
      notFound: true,
    };
  }

  // Fetch products belonging to this category
  const products = await Product.find({ category: categoryId });

  return {
    props: {
      categoryName: category.name,
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
