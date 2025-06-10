
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building, Clock, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
  posted: string;
  logo: string;
  featured: boolean;
}

const Index = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    // Mock data - trong thực tế sẽ fetch từ API
    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechViet Solutions",
        location: "Hồ Chí Minh",
        salary: "25-35 triệu VND",
        type: "Full-time",
        experience: "3-5 năm",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        description: "Tìm kiếm Senior Frontend Developer có kinh nghiệm với React và TypeScript",
        posted: "2 ngày trước",
        logo: "https://via.placeholder.com/60x60",
        featured: true
      },
      {
        id: "2",
        title: "Backend Developer",
        company: "Digital Innovation Corp",
        location: "Hà Nội",
        salary: "20-30 triệu VND",
        type: "Full-time",
        experience: "2-4 năm",
        skills: ["Node.js", "Python", "MongoDB", "AWS"],
        description: "Cần Backend Developer giàu kinh nghiệm để phát triển hệ thống",
        posted: "1 ngày trước",
        logo: "https://via.placeholder.com/60x60",
        featured: false
      },
      {
        id: "3",
        title: "DevOps Engineer",
        company: "CloudTech Vietnam",
        location: "Đà Nẵng",
        salary: "30-40 triệu VND",
        type: "Full-time",
        experience: "4-6 năm",
        skills: ["Docker", "Kubernetes", "Jenkins", "AWS"],
        description: "Tuyển dụng DevOps Engineer để quản lý infrastructure",
        posted: "3 ngày trước",
        logo: "https://via.placeholder.com/60x60",
        featured: true
      },
      {
        id: "4",
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Hồ Chí Minh",
        salary: "15-25 triệu VND",
        type: "Part-time",
        experience: "1-3 năm",
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        description: "Tìm kiếm UI/UX Designer sáng tạo cho các dự án web và mobile",
        posted: "5 ngày trước",
        logo: "https://via.placeholder.com/60x60",
        featured: false
      }
    ];
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesType = !typeFilter || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Tìm Việc Làm IT Tốt Nhất Việt Nam
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Khám phá hàng nghìn cơ hội việc làm từ những công ty công nghệ hàng đầu
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Tìm theo vị trí, công ty, kỹ năng..."
                    className="pl-10 h-12 text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-12 text-gray-900">
                  <SelectValue placeholder="Địa điểm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả địa điểm</SelectItem>
                  <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                  <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                  <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="h-12 text-gray-900">
                  <SelectValue placeholder="Loại hình" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả loại hình</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Việc Làm Nổi Bật ({filteredJobs.length})
            </h2>
            <Link to="/post-job">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Đăng Tin Tuyển Dụng
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg" />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors">
                          <Link to={`/job/${job.id}`}>{job.title}</Link>
                        </h3>
                        <p className="text-gray-600 flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.company}
                        </p>
                      </div>
                    </div>
                    {job.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="w-3 h-3 mr-1" />
                        Nổi bật
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.experience}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{job.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-gray-500">{job.posted}</span>
                      <Link to={`/job/${job.id}`}>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                          Xem Chi Tiết
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không tìm thấy việc làm phù hợp với tiêu chí của bạn.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
