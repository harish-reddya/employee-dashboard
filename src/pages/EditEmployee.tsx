import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import EmployeeForm, { EmployeeFormData } from "@/components/EmployeeForm";
import { useEffect, useState } from "react";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [employee, setEmployee] = useState<EmployeeFormData | null>(null);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const foundEmployee = employees.find((emp: any) => emp.id === Number(id));
    
    if (!foundEmployee) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Employee not found",
      });
      navigate("/employees");
      return;
    }
    
    setEmployee(foundEmployee);
  }, [id, navigate, toast]);

  const handleSubmit = (formData: EmployeeFormData) => {
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    const updatedEmployees = employees.map((emp: any) =>
      emp.id === Number(id) ? { ...emp, ...formData } : emp
    );
    
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    
    toast({
      title: "Success",
      description: "Employee updated successfully",
    });
    navigate("/employees");
  };

  if (!employee) {
    return null;
  }

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
          <h1 className="text-2xl font-semibold">Edit Employee</h1>
        </div>

        <EmployeeForm
          initialData={employee}
          onSubmit={handleSubmit}
          submitLabel="Update Employee"
        />
      </div>
    </Layout>
  );
};

export default EditEmployee;