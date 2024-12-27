import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export interface EmployeeFormData {
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  courses: string[];
  image: File | null;
}

interface EmployeeFormProps {
  initialData?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  submitLabel: string;
}

const EmployeeForm = ({ initialData, onSubmit, submitLabel }: EmployeeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
    ...initialData,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload only image files (jpg/png)",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile || !formData.designation || !formData.gender) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address",
      });
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast({
        variant: "destructive",
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="designation">Designation</Label>
          <Select
            value={formData.designation}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, designation: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label>Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, gender: value }))
            }
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label>Courses</Label>
          <div className="flex flex-col gap-2">
            {["MCA", "BCA", "BSC"].map((course) => (
              <div key={course} className="flex items-center space-x-2">
                <Checkbox
                  id={course}
                  checked={formData.courses.includes(course)}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({
                      ...prev,
                      courses: checked
                        ? [...prev.courses, course]
                        : prev.courses.filter((c) => c !== course),
                    }));
                  }}
                />
                <Label htmlFor={course}>{course}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="image">Image Upload</Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};

export default EmployeeForm;