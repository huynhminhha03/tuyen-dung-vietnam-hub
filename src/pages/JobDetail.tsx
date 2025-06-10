
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Users, 
  Calendar,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  posted: string;
  deadline: string;
  logo: string;
  companySize: string;
  industry: string;
  website: string;
}

const JobDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Mock job detail data
    const mockJob: JobDetail = {
      id: id || "1",
      title: "Senior Frontend Developer",
      company: "TechViet Solutions",
      location: "Hồ Chí Minh",
      salary: "25-35 triệu VND",
      type: "Full-time",
      experience: "3-5 năm",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest"],
      description: `Chúng tôi đang tìm kiếm một Senior Frontend Developer tài năng để tham gia vào đội ngũ phát triển sản phẩm của chúng tôi. Bạn sẽ có cơ hội làm việc với các công nghệ hiện đại và tham gia vào việc xây dựng những ứng dụng web tuyệt vời.

Trong vai trò này, bạn sẽ chịu trách nhiệm phát triển và duy trì các ứng dụng web frontend, hợp tác chặt chẽ với team backend và designer để tạo ra những trải nghiệm người dùng tốt nhất.`,
      requirements: [
        "Có ít nhất 3 năm kinh nghiệm phát triển Frontend",
        "Thành thạo React và TypeScript",
        "Kinh nghiệm với Next.js và Tailwind CSS",
        "Hiểu biết về Redux/Context API",
        "Kinh nghiệm viết unit test với Jest/React Testing Library",
        "Có khả năng làm việc nhóm và giao tiếp tốt",
        "Tiếng Anh đọc hiểu tài liệu kỹ thuật"
      ],
      benefits: [
        "Lương thưởng cạnh tranh từ 25-35 triệu VND",
        "Thưởng hiệu suất hàng quý",
        "Bảo hiểm sức khỏe cao cấp",
        "Nghỉ phép 15 ngày/năm",
        "Cơ hội đào tạo và phát triển kỹ năng",
        "Môi trường làm việc hiện đại, thân thiện",
        "Team building, du lịch công ty hàng năm"
      ],
      posted: "2 ngày trước",
      deadline: "30/01/2024",
      logo: "https://via.placeholder.com/80x80",
      companySize: "50-100 nhân viên",
      industry: "Công nghệ thông tin",
      website: "https://techviet.com"
    };
    
    setJob(mockJob);
  }, [id]);

  const handleApply = () => {
    setHasApplied(true);
    toast({
      title: "Ứng tuyển thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất."
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Đã bỏ lưu" : "Đã lưu công việc",
      description: isSaved ? "Công việc đã được bỏ khỏi danh sách yêu thích" : "Công việc đã được lưu vào danh sách yêu thích"
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Đã sao chép link",
      description: "Link công việc đã được sao chép vào clipboard"
    });
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Đang tải thông tin công việc...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách việc làm
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-lg" />
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                      <p className="text-lg text-gray-600 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        {job.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSave}
                      className={isSaved ? "text-red-600 border-red-200" : ""}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{job.type}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button 
                    onClick={handleApply}
                    disabled={hasApplied}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {hasApplied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Đã ứng tuyển
                      </>
                    ) : (
                      "Ứng tuyển ngay"
                    )}
                  </Button>
                  <Button variant="outline" className="px-8">
                    Ứng tuyển sau
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả công việc</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {job.description}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Yêu cầu ứng viên</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quyền lợi</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin công ty</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Quy mô</p>
                    <p className="font-medium text-gray-900">{job.companySize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lĩnh vực</p>
                    <p className="font-medium text-gray-900">{job.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a 
                      href={job.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:text-blue-800"
                    >
                      {job.website}
                    </a>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full">
                  Xem trang công ty
                </Button>
              </CardContent>
            </Card>

            {/* Job Info */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin tuyển dụng</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngày đăng:</span>
                    <span className="font-medium">{job.posted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hạn nộp:</span>
                    <span className="font-medium text-red-600">{job.deadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại hình:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Việc làm tương tự</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                    <p className="text-sm text-gray-600">ABC Technology</p>
                    <p className="text-sm text-gray-600">20-25 triệu VND</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-medium text-gray-900">React Developer</h4>
                    <p className="text-sm text-gray-600">XYZ Solutions</p>
                    <p className="text-sm text-gray-600">18-28 triệu VND</p>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4">
                    <h4 className="font-medium text-gray-900">Full Stack Developer</h4>
                    <p className="text-sm text-gray-600">Tech Innovation</p>
                    <p className="text-sm text-gray-600">30-40 triệu VND</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
