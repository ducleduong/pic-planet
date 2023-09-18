import Feed from "@/components/pin/feed";

const CategoryPage = ({params}: {params: {categoryName: string}}) => {
  return <Feed category={params.categoryName} />;
};

export default CategoryPage;
