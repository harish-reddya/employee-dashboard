import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Index = () => {
  const username = localStorage.getItem("username") || "Admin";
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6" />
              Welcome to Employee Management System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-muted-foreground mb-6">
              Welcome back, {username}! Manage your employees efficiently with our modern dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => navigate("/employees")}>
                <CardHeader>
                  <CardTitle className="text-lg">View Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View and manage your employee list
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => navigate("/employees/create")}>
                <CardHeader>
                  <CardTitle className="text-lg">Add Employee</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create a new employee record
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">Employee Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View employee statistics and reports
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;