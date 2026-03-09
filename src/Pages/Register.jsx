import { useState } from 'react';
import axios from 'axios';
import { Sun, Moon, User, Mail, Lock, UserCircle } from 'lucide-react';
import logoEsi from './logo.jpg';
function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    account_type: '',
  });

  const [errors, setErrors] = useState({
    full_name: '',
    email: '',
    password: '',
    account_type: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[a-z]\.[a-z]{3,}@esi-sba\.dz$/;
  const validatePassword = (password) => /^(?=.*[0-9]).{6,}$/.test(password);

  const validateForm = () => {
    let valid = true;
    let newErrors = { full_name: '', email: '', password: '', account_type: '' };

    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters and contain a number';
      valid = false;
    }
    if (!formData.account_type) {
      newErrors.account_type = 'Please select account type';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log(response.data);
      setSuccess('Account created successfully');
      setFormData({ full_name: '', email: '', password: '', account_type: '' });
      setErrors({});
    } catch (err) {
      setSuccess('');
      if (!err?.response) {
        setErrors({ ...errors, general: 'No server response' });
      } else {
        setErrors({ ...errors, general: 'Registration failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  const errorStyle = {
    color: 'red',
    marginTop: '2px',
    fontSize: '13px',
  };
  const themeColors = {
    bg: isDarkMode
      ? {
          background: 'linear-gradient(180deg,#020817 0%,#1E293B 50%,#020817 100%)',
        }
      : {
          background: 'linear-gradient(180deg,#F8FAFC 0%,#F1F5F9 50%,#F8FAFC 100%)',
        },
    textMain: isDarkMode ? 'text-[#E8EAF0]' : 'text-[#0F172A]',
    textSecondary: isDarkMode ? 'text-[#94A3B8]' : 'text-[#64748B]',
    cardBg: isDarkMode ? 'bg-[#0A1128]' : 'bg-white',
    cardBorder: isDarkMode ? 'border border-[#2B4C9F]' : 'border border-[#E2E8F0]',
    buttonTheme: isDarkMode
      ? 'bg-[#0A1128] text-[#2B4C9F] border-[#2B4C9F] '
      : 'bg-[#FFF] text-[#2B4C9F] border-[#64748B]',
    inputBg: isDarkMode ? 'bg-[#020817]' : 'bg-[#F8FAFC]',
    inputBorder: isDarkMode ? 'border-[#0F1629]' : 'border-[#F8FAFC]',
    inputText: isDarkMode ? 'text-white' : 'text-black',
    borderTop: isDarkMode ? 'border-[#2B4C9F]' : 'border-[#E2E8F0]',
  };

  return (
    <div style={themeColors.bg} className="w-[1440px] h-[1062px] flex-shrink-0">
      <button
        className={`w-[37.3333px] h-[37.3333px] mt-[45px] ml-[1150px] rounded-[12px] border-[0.6667px] p-[8.6667px] box-border focus:outline-none focus:ring-0 ${themeColors.buttonTheme} ${themeColors.cardBorder}`}
        onClick={toggleTheme}
      >
        <div>
          {isDarkMode ? (
            <Moon size={20} className="w-5 h-5" />
          ) : (
            <Sun size={20} className="w-5 h-5" />
          )}
        </div>
      </button>

      <div className="flex flex-col items-start gap-8 w-[448px] h-[932.3334px] mt-6 ml-[496px]">
        <div className="w-[448px] h-[221px]">
          <div className="inline-flex flex-col justify-center items-center gap-3">
            {/* Theme toggle */}

            <img
              src={logoEsi}
              className="w-20 h-20 rounded-full bg-lightgray bg-[url('/path-to-image')] bg-center bg-cover bg-no-repeat"
            />

            <span
              className={`text-center font-['Inter',sans-serif] text-2xl font-semibold leading-[30px] ${themeColors.textMain}`}
            >
              ESI-GM
            </span>

            <span
              className={`text-center font-['Inter'] text-xs font-normal leading-[15px] ${themeColors.textSecondary}`}
            >
              <span>École Supérieure d'Informatique Sidi Bel Abbès</span>
              <br />
              <span>8 Mai 1945</span>
            </span>
          </div>

          <h1
            className={`text-center font-inter text-2xl font-bold leading-[36px] ${themeColors.textMain}`}
          >
            Create Account
          </h1>

          <p
            className={`font-inter font-normal text-sm leading-[30px] text-center ${themeColors.textSecondary}`}
          >
            Join ESI-GM to get started
          </p>
        </div>

        <div
          className={`

flex flex-col items-start self-stretch shrink-0

h-[679.333px] gap-6

pt-[32.667px] px-[32.667px] pb-[0.667px]

rounded-[16px]



shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] 

${themeColors.cardBg} border ${themeColors.cardBorder}`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col items-start self-stretch gap-6">
            {/* Full Name */}

            <div className="flex flex-col gap-2 w-full">
              <label className="flex pr-[316.667px] items-center self-stretch">
                <p
                  className={`font-inter text-[14px] font-medium leading-[20px] ${themeColors.textMain}`}
                >
                  Full Name
                </p>
              </label>

              <div
                className={`flex items-center w-full h-12 px-4  border  rounded-xl ${themeColors.inputBg} ${themeColors.inputBorder}`}
              >
                <User className="text-gray-400" size={20} />

                <input
                  className={`flex-1 tranparent ml-2 outline-none border-none ${themeColors.inputBg}`}
                  type="text"
                  name="full_name"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>

              {errors.full_name && <p style={{ ...errorStyle }}>{errors.full_name}</p>}
            </div>

            {/* Email */}

            <div className="flex flex-col gap-2 w-full">
              {' '}
              <label className="flex items-center self-stretch pr-[287.667px]">
                {' '}
                <p className={`font-inter text-sm font-medium leading-5 ${themeColors.textMain}`}>
                  {' '}
                  Email Adress{' '}
                </p>{' '}
              </label>{' '}
              <div
                className={`flex items-center w-full h-12 px-4  border  rounded-xl ${themeColors.inputBg} ${themeColors.inputBorder}`}
              >
                {' '}
                <Mail className="text-gray-400" size={20} />{' '}
                <input
                  autoComplete="off"
                  className={`flex-1 ml-2 bg-transparent outline-none border-none ${themeColors.inputBg}`}
                  type="email"
                  name="email"
                  placeholder="a.student@esi-sba.dz"
                  value={formData.email}
                  onChange={handleChange}
                />{' '}
              </div>{' '}
              <p className="text-[#64748B] font-inter text-xs font-normal leading-4 text-left">
                {' '}
                Use your ESI email: x.xxxx@esi-sba.dz{' '}
              </p>{' '}
              {errors.email && <p style={{ ...errorStyle }}>{errors.email}</p>}
            </div>

            {/* Password */}

            <div className="flex flex-col gap-2 w-full">
              <label className="flex items-center self-stretch pr-[316.667px]">
                <p className={` font-inter text-sm font-medium leading-5 ${themeColors.textMain}`}>
                  Password
                </p>
              </label>

              <div
                className={`flex items-center w-full h-12 px-4  border rounded-xl ${themeColors.inputBg} ${themeColors.inputBorder}`}
              >
                <Lock className="text-gray-400" size={20} />

                <input
                  className={`flex-1 ml-2 bg-transparent outline-none border-none ${themeColors.inputBg}`}
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {errors.password && <p style={{ ...errorStyle }}>{errors.password}</p>}
            </div>

            {/* Account Type */}

            <div className="flex flex-col gap-2 w-full">
              <label className="flex items-center self-stretch pr-[289.667px]">
                <p
                  className={`text-[#0F172A] font-inter text-sm font-medium leading-5 ${themeColors.textMain}`}
                >
                  Account Type
                </p>
              </label>

              <div
                className={`flex items-center w-full h-12 px-4  border rounded-xl ${themeColors.inputBg} ${themeColors.inputBorder}`}
              >
                <UserCircle className="text-gray-400" size={20} />

                <select
                  className={`flex-1 ml-2 bg-transparent outline-none border-none ${themeColors.inputBg}`}
                  name="account_type"
                  value={formData.account_type}
                  onChange={handleChange}
                >
                  <option value="Student">Student</option>

                  <option value="Teacher">Teacher</option>
                </select>
              </div>

              <div className="flex h-4 items-start flex-shrink-0 self-stretch">
                <p className=" text-[#64748B] font-inter text-xs font-normal leading-4">
                  Admin accounts are created by existing administrators
                </p>
              </div>

              {errors.account_type && <p style={{ ...errorStyle }}>{errors.account_type}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center self-stretch px-[130.854px] py-[10.333px] rounded-[12px] bg-[#2B4C9F]"
            >
              <span
                className={`text-white text-center font-inter text-base font-medium leading-6 ${themeColors.textMain}`}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </span>
            </button>
          </form>

          <div className="flex justify-center items-center self-stretch px-[82.583px] pr-[81.083px] py-0">
            <p className="text-[#64748B] text-center font-inter text-sm font-normal leading-5">
              Already have an account?{' '}
            </p>

            <span className="text-[#2B4C9F] font-inter text-sm font-normal leading-5">
              {' '}
              Sing in
            </span>
          </div>

          <div
            className={`flex flex-col items-start h-[44.667px] pt-[24.667px] flex-shrink-0 self-stretch border-t-[0.667px] ${themeColors.borderTop}`}
          >
            <a className="flex justify-center items-center self-stretch">
              {' '}
              <p className="text-[#64748B] text-center font-inter text-sm font-normal leading-5">
                ← Back to Home
              </p>
            </a>
          </div>

          {/* General errors or success */}

          {errors.general && <p style={{ color: 'red', marginTop: '10px' }}>{errors.general}</p>}

          {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
