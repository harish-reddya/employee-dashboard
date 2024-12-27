import Layout from "../components/Layout";

const Index = () => {
  const username = localStorage.getItem("username") || "Admin";

  return (
    <Layout>
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome, {username}</h1>
        <p className="text-xl text-gray-600">
          Manage your employees efficiently with our modern dashboard
        </p>
      </div>
    </Layout>
  );
};

export default Index;