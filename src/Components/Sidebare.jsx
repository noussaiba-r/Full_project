import React from 'react';
import { useNavigate } from 'react-router-dom'; // باش نقدرو نغيرو الصفحة
import { Icon } from './Icon';
import ThemeToggle from './ThemToggel';
import logo from '../Pages/logo.jpg';
import { LogOut, X } from 'lucide-react';

const NavItem = ({ label, icon, active, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
    style={{
      background: active ? 'var(--btn-register)' : 'transparent',
      color: active ? '#fff' : 'var(--text-small)',
    }}
  >
    {icon}
    {label}
  </button>
);

export default function Sidebar({ activeLabel }) {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: Icon.dashboard, path: '/dashboard/student' },
    { label: 'My Projects', icon: Icon.projects, path: '/projects' },
    { label: 'My Requests', icon: Icon.requests, path: '/requests' },
    { label: 'Browse Materials', icon: Icon.browse, path: '/materials/browse' },
  ];

  return (
    <aside
      className="w-[256px] h-screen flex-shrink-0 flex flex-col sticky top-0"
      style={{ background: 'var(--card)', borderRight: '1px solid var(--card-border)' }}
    >
      {/* Logo Section */}
      <div
        className="px-4 py-4 flex items-center "
        style={{ borderBottom: '1px solid var(--card-border)' }}
      >
        <div className="flex items-center gap-1">
          <div className="flex-shrink-0 w-[48px] h-[48px]">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full rounded-full bg-lightgray bg-center bg-cover bg-no-repeat"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-title-custom text-[18px] font-bold">ESI-GM</span>
            <span className="text-xs text-small-custom">ESI 8 Mai 1945</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 mt-1">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            active={activeLabel === item.label}
            onClick={() => navigate(item.path)} // هنا يصرى التنقل
          />
        ))}
      </nav>

      {/* User & Logout Section */}
      <div className="p-3" style={{ borderTop: '1px solid var(--card-border)' }}>
        <div className="flex items-center gap-2.5 mb-4 px-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-indigo-500">
            {Icon.user}
          </div>
          <div>
            <div className="text-sm font-semibold text-title-custom leading-tight">
              Sarah Student
            </div>
            <div className="text-xs text-small-custom">Student</div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 px-1">
          <ThemeToggle />
          <button
            onClick={() => {
              localStorage.removeItem('token'); // إذا كان عندك token
              localStorage.removeItem('user'); // مسح بيانات المستخدم
              navigate('/login'); // يروح لصفحة login
            }}
            className="flex items-center gap-2 text-xs text-small-custom hover:text-red-400 transition-all"
          >
            <LogOut size={16} /> {Icon.logout} Logout
          </button>
        </div>
        <div className="flex justify-center mt-4 pt-3 border-t border-[var(--card-border)]">
          <button
            onClick={() => navigate('/dashboard/student')}
            className="text-small-custom hover:text-red-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}
