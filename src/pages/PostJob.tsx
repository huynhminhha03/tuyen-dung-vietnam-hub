
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    description: "",
    requirements: "",
    benefits: "",
    contactEmail: "",
    contactPhone: ""
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills(prev => [...prev, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ các thông tin bắt buộc",
        variant: "destructive"
      });
      return;
    }

    // Mock API call
    console.log("Submitting job:", { ...formData, skills });
    
    toast({
      title: "Thành công",
      description: "Tin tuyển dụng đã được đăng thành công!"
    });

    // Reset form
    setFormData({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "",
      experience: "",
      description: "",
      requirements: "",
      benefits: "",
      contactEmail: "",
      contactPhone: ""
    });
    setSkills([]);
    
    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Đăng Tin Tuyển Dụng
            </h1>
            <p className="text-lg text-gray-600">
              Tìm kiếm nhân tài cho công ty của bạn
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Thông Tin Tuyển Dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tên Vị Trí *</Label>
                    <Input
                      id="title"
                      placeholder="VD: Senior Frontend Developer"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Tên Công Ty *</Label>
                    <Input
                      id="company"
                      placeholder="VD: TechViet Solutions"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Địa Điểm *</Label>
                    <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn địa điểm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                        <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                        <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                        <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Loại Hình</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại hình" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Kinh Nghiệm</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kinh nghiệm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fresher">Fresher</SelectItem>
                        <SelectItem value="1-2 năm">1-2 năm</SelectItem>
                        <SelectItem value="2-4 năm">2-4 năm</SelectItem>
                        <SelectItem value="4-6 năm">4-6 năm</SelectItem>
                        <SelectItem value="6+ năm">6+ năm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Mức Lương</Label>
                  <Input
                    id="salary"
                    placeholder="VD: 20-30 triệu VND"
                    value={formData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Kỹ Năng Yêu Cầu</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Nhập kỹ năng..."
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô Tả Công Việc *</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết về công việc..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Yêu Cầu Ứng Viên</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Các yêu cầu về kỹ năng, kinh nghiệm..."
                    className="min-h-[100px]"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Quyền Lợi</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Các quyền lợi dành cho ứng viên..."
                    className="min-h-[100px]"
                    value={formData.benefits}
                    onChange={(e) => handleInputChange("benefits", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email Liên Hệ</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="hr@company.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Số Điện Thoại</Label>
                    <Input
                      id="contactPhone"
                      placeholder="0123456789"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Đăng Tin Tuyển Dụng
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/")}
                    className="px-8"
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
