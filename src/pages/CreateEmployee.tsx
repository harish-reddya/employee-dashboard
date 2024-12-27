import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EmployeeForm, { EmployeeFormData } from "@/components/EmployeeForm";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (formData: EmployeeFormData) => {
    // Get existing employees from localStorage
    const existingEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    
    // Create new employee object
    const newEmployee = {
      id: Date.now(),
      ...formData,
      createDate: new Date().toISOString().split('T')[0],
    };
    
    // Save to localStorage
    localStorage.setItem("employees", JSON.stringify([...existingEmployees, newEmployee]));
    
    toast({
      title: "Success",
      description: "Employee created successfully",
    });
    navigate("/employees");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/employees")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Create Employee</h1>
        </div>

        <EmployeeForm onSubmit={handleSubmit} submitLabel="Create Employee" />
      </div>
    </Layout>
  );
};

export default CreateEmployee;