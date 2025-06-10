
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Briefcase, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">VietJobs</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trang Chủ
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Việc Làm
            </Link>
            <Link to="/companies" className="text-gray-700 hover:text-blue-600 transition-colors">
              Công Ty
            </Link>
            <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition-colors">
              Đăng Tin
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="w-4 h-4 mr-2" />
              Đăng Nhập
            </Button>
            <Link to="/post-job">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Đăng Tin Tuyển Dụng
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
