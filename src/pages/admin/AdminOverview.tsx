import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
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
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  BookOpen, 
  Award, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  MoreHorizontal
} from 'lucide-react';

// Mock data for charts
const userGrowthData = [
  { date: 'Jan 1', users: 4200, active: 2800 },
  { date: 'Jan 5', users: 4500, active: 3100 },
  { date: 'Jan 10', users: 4800, active: 3300 },
  { date: 'Jan 15', users: 5200, active: 3600 },
  { date: 'Jan 20', users: 5600, active: 3900 },
  { date: 'Jan 25', users: 6100, active: 4200 },
  { date: 'Jan 30', users: 6800, active: 4700 },
];

const revenueData = [
  { month: 'Aug', revenue: 12500 },
  { month: 'Sep', revenue: 15200 },
  { month: 'Oct', revenue: 18900 },
  { month: 'Nov', revenue: 22400 },
  { month: 'Dec', revenue: 28100 },
  { month: 'Jan', revenue: 32400 },
];

const courseCompletionData = [
  { name: 'AI Fundamentals', completed: 850, enrolled: 1200 },
  { name: 'Prompt Engineering', completed: 620, enrolled: 950 },
  { name: 'AI for Freelancers', completed: 430, enrolled: 780 },
  { name: 'AI for Business', completed: 280, enrolled: 520 },
];

const userTypeData = [
  { name: 'Free', value: 4200, color: '#94A3B8' },
  { name: 'Pro', value: 2100, color: '#2F45FF' },
  { name: 'Enterprise', value: 480, color: '#FF4D2E' },
];

const recentActivity = [
  { id: 1, user: 'Sarah Chen', action: 'completed', target: 'AI Fundamentals', time: '2 min ago', avatar: 'SC' },
  { id: 2, user: 'Marcus Johnson', action: 'enrolled in', target: 'Prompt Engineering', time: '5 min ago', avatar: 'MJ' },
  { id: 3, user: 'Elena Rodriguez', action: 'earned certificate', target: 'AI Fundamentals', time: '12 min ago', avatar: 'ER' },
  { id: 4, user: 'David Kim', action: 'submitted', target: 'Project: Image Classifier', time: '18 min ago', avatar: 'DK' },
  { id: 5, user: 'Priya Patel', action: 'started', target: 'AI for Business', time: '25 min ago', avatar: 'PP' },
];

const alerts = [
  { id: 1, type: 'warning', message: '3 users reported video playback issues in Lesson 4.2', time: '1 hour ago' },
  { id: 2, type: 'success', message: 'New course "Advanced LLM Fine-tuning" published', time: '3 hours ago' },
  { id: 3, type: 'info', message: 'Weekly analytics report is ready', time: '5 hours ago' },
];

export default function AdminOverview() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { 
      label: 'Total Users', 
      value: '50,247', 
      change: '+12.5%', 
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Active Learners', 
      value: '12,847', 
      change: '+8.3%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    { 
      label: 'Course Completions', 
      value: '8,392', 
      change: '+15.2%', 
      trend: 'up',
      icon: BookOpen,
      color: 'coral'
    },
    { 
      label: 'Certificates Issued', 
      value: '3,847', 
      change: '+22.1%', 
      trend: 'up',
      icon: Award,
      color: 'purple'
    },
    { 
      label: 'Monthly Revenue', 
      value: '$32,400', 
      change: '+18.7%', 
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    { 
      label: 'Engagement Score', 
      value: '87.3%', 
      change: '+2.4%', 
      trend: 'up',
      icon: Zap,
      color: 'yellow'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Dashboard Overview</h1>
          <p className="text-text-secondary text-sm">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex items-center gap-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-coral text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue/10' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'coral' ? 'bg-coral/10' :
                stat.color === 'purple' ? 'bg-purple-100' :
                'bg-yellow-100'
              }`}>
                <stat.icon className={`${
                  stat.color === 'blue' ? 'text-blue' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'coral' ? 'text-coral' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-yellow-600'
                }`} size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="font-display font-bold text-xl">{stat.value}</p>
            <p className="text-text-secondary text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">User Growth</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F45FF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2F45FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4D2E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF4D2E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="users" stroke="#2F45FF" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" name="Total Users" />
                <Area type="monotone" dataKey="active" stroke="#FF4D2E" strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" name="Active Users" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">User Plans</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {userTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Revenue Trend</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#2F45FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Completion */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Course Performance</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseCompletionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={11} width={120} />
                <Tooltip 
                  contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="enrolled" fill="#E5E7EB" radius={[0, 4, 4, 0]} name="Enrolled" />
                <Bar dataKey="completed" fill="#FF4D2E" radius={[0, 4, 4, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-display font-semibold mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {[
              { stage: 'Signups', count: 12500, percentage: 100, color: 'bg-blue' },
              { stage: 'Active Learners', count: 8700, percentage: 70, color: 'bg-coral' },
              { stage: 'Course Completers', count: 4200, percentage: 48, color: 'bg-green-500' },
              { stage: 'Certified', count: 2847, percentage: 33, color: 'bg-purple-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.stage}</span>
                  <span className="font-medium">{item.count.toLocaleString()} ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Recent Activity</h3>
            <Link to="/admin/users" className="text-coral text-sm hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue text-xs font-bold">{activity.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="text-coral">{activity.target}</span>
                  </p>
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    <Clock size={10} />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">Platform Alerts</h3>
            <button className="text-coral text-sm hover:underline">Mark all read</button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-100' :
                alert.type === 'success' ? 'bg-green-50 border border-green-100' :
                'bg-blue-50 border border-blue-100'
              }`}>
                {alert.type === 'warning' ? <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" /> :
                 alert.type === 'success' ? <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" /> :
                 <Clock size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
