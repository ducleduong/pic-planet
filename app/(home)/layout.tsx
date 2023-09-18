import HomeContainer from "@/components/container/home-container";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeContainer>{children}</HomeContainer>;
}
