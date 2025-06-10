
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  Briefcase, 
  Building, 
  TrendingUp, 
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface JobStats {
  totalJobs: number;
  activeJobs: number;
  pendingJobs: number;
  companies: number;
  applications: number;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  status: "active" | "pending" | "rejected";
  applications: number;
  postedDate: string;
  views: number;
}

const Admin = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<JobStats>({
    totalJobs: 0,
    activeJobs: 0,
    pendingJobs: 0,
    companies: 0,
    applications: 0
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("dashboard");

  useEffect(() => {
    // Mock data
    const mockStats: JobStats = {
      totalJobs: 127,
      activeJobs: 89,
      pendingJobs: 23,
      companies: 45,
      applications: 1542
    };

    const mockJobs: Job[] = [
      {
        id: "1",
        title: "Senior Frontend Developer",
        company: "TechViet Solutions",
        location: "Hồ Chí Minh",
        salary: "25-35 triệu VND",
        status: "active",
        applications: 24,
        postedDate: "2024-01-15",
        views: 156
      },
      {
        id: "2",
        title: "Backend Developer",
        company: "Digital Innovation Corp",
        location: "Hà Nội",
        salary: "20-30 triệu VND",
        status: "pending",
        applications: 12,
        postedDate: "2024-01-14",
        views: 89
      },
      {
        id: "3",
        title: "DevOps Engineer",
        company: "CloudTech Vietnam",
        location: "Đà Nẵng",
        salary: "30-40 triệu VND",
        status: "active",
        applications: 18,
        postedDate: "2024-01-12",
        views: 203
      },
      {
        id: "4",
        title: "UI/UX Designer",
        company: "Creative Studio",
        location: "Hồ Chí Minh",
        salary: "15-25 triệu VND",
        status: "pending",
        applications: 31,
        postedDate: "2024-01-10",
        views: 134
      }
    ];

    setStats(mockStats);
    setJobs(mockJobs);
  }, []);

  const chartData = [
    { name: "T1", jobs: 20, applications: 145 },
    { name: "T2", jobs: 25, applications: 189 },
    { name: "T3", jobs: 30, applications: 234 },
    { name: "T4", jobs: 22, applications: 167 },
    { name: "T5", jobs: 28, applications: 201 },
    { name: "T6", jobs: 35, applications: 276 }
  ];

  const pieData = [
    { name: "Active", value: stats.activeJobs, color: "#22c55e" },
    { name: "Pending", value: stats.pendingJobs, color: "#f59e0b" },
    { name: "Rejected", value: stats.totalJobs - stats.activeJobs - stats.pendingJobs, color: "#ef4444" }
  ];

  const handleApprove = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: "active" as const } : job
    ));
    toast({
      title: "Thành công",
      description: "Tin tuyển dụng đã được phê duyệt"
    });
  };

  const handleReject = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: "rejected" as const } : job
    ));
    toast({
      title: "Đã từ chối",
      description: "Tin tuyển dụng đã bị từ chối"
    });
  };

  const handleDelete = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Đã xóa",
      description: "Tin tuyển dụng đã được xóa"
    });
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Đã duyệt</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Chờ duyệt</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Từ chối</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Bảng Điều Khiển Admin
          </h1>
          <p className="text-lg text-gray-600">
            Quản lý tất cả tin tuyển dụng và thống kê hệ thống
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="jobs">Quản Lý Tin</TabsTrigger>
            <TabsTrigger value="analytics">Thống Kê</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tổng Tin Tuyển Dụng</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Tin Đã Duyệt</p>
                      <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Chờ Duyệt</p>
                      <p className="text-3xl font-bold text-yellow-600">{stats.pendingJobs}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Công Ty</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.companies}</p>
                    </div>
                    <Building className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ứng Tuyển</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
                    </div>
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Jobs */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl">Tin Tuyển Dụng Gần Đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(job.status)}
                        <span className="text-sm text-gray-500">{job.applications} ứng tuyển</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Quản Lý Tin Tuyển Dụng</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Vị Trí</th>
                        <th className="text-left p-3 font-semibold">Công Ty</th>
                        <th className="text-left p-3 font-semibold">Địa Điểm</th>
                        <th className="text-left p-3 font-semibold">Lương</th>
                        <th className="text-left p-3 font-semibold">Trạng Thái</th>
                        <th className="text-left p-3 font-semibold">Lượt Xem</th>
                        <th className="text-left p-3 font-semibold">Ứng Tuyển</th>
                        <th className="text-left p-3 font-semibold">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredJobs.map((job) => (
                        <tr key={job.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div>
                              <p className="font-medium text-gray-900">{job.title}</p>
                              <p className="text-sm text-gray-500">{job.postedDate}</p>
                            </div>
                          </td>
                          <td className="p-3">{job.company}</td>
                          <td className="p-3">{job.location}</td>
                          <td className="p-3">{job.salary}</td>
                          <td className="p-3">{getStatusBadge(job.status)}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1 text-gray-400" />
                              {job.views}
                            </div>
                          </td>
                          <td className="p-3">{job.applications}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              {job.status === "pending" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApprove(job.id)}
                                    className="text-green-600 border-green-200 hover:bg-green-50"
                                  >
                                    Duyệt
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(job.id)}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    Từ chối
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(job.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Xu Hướng Tuyển Dụng</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jobs" fill="#3b82f6" name="Tin tuyển dụng" />
                      <Bar dataKey="applications" fill="#10b981" name="Ứng tuyển" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl">Phân Bố Trạng Thái</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
