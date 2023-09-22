import UserProfile from "@/components/user-profile";

const UserProfilePage = ({ params }: { params: { userId: string } }) => {
  return <UserProfile userId={params.userId} />;
};

export default UserProfilePage;
