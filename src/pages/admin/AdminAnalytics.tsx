import { useState } from 'react';
import { 
  LineChart, 
  Line, 
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
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock analytics data
const signupData = [
  { date: 'Mon', signups: 45, active: 38 },
  { date: 'Tue', signups: 52, active: 44 },
  { date: 'Wed', signups: 48, active: 41 },
  { date: 'Thu', signups: 61, active: 52 },
  { date: 'Fri', signups: 55, active: 48 },
  { date: 'Sat', signups: 38, active: 32 },
  { date: 'Sun', signups: 42, active: 36 },
];

const lessonDropoffData = [
  { lesson: 'Intro', started: 1000, completed: 980 },
  { lesson: 'Lesson 2', started: 980, completed: 890 },
  { lesson: 'Lesson 3', started: 890, completed: 720 },
  { lesson: 'Lesson 4', started: 720, completed: 580 },
  { lesson: 'Lesson 5', started: 580, completed: 420 },
  { lesson: 'Lesson 6', started: 420, completed: 380 },
  { lesson: 'Lesson 7', started: 380, completed: 350 },
  { lesson: 'Final', started: 350, completed: 320 },
];

const timeSpentData = [
  { range: '0-5 min', users: 450 },
  { range: '5-15 min', users: 890 },
  { range: '15-30 min', users: 1200 },
  { range: '30-60 min', users: 850 },
  { range: '60+ min', users: 420 },
];

const deviceData = [
  { name: 'Desktop', value: 58, color: '#2F45FF' },
  { name: 'Mobile', value: 32, color: '#FF4D2E' },
  { name: 'Tablet', value: 10, color: '#94A3B8' },
];

const cohortData = [
  { month: 'Aug W1', week1: 100, week2: 85, week3: 72, week4: 65 },
  { month: 'Aug W2', week1: 100, week2: 82, week3: 68, week4: 58 },
  { month: 'Aug W3', week1: 100, week2: 88, week3: 75, week4: 70 },
  { month: 'Aug W4', week1: 100, week2: 90, week3: 80, week4: 75 },
  { month: 'Sep W1', week1: 100, week2: 87, week3: 78, week4: 72 },
];

const aiUsageData = [
  { feature: 'Prompts', usage: 85 },
  { feature: 'Code Gen', usage: 72 },
  { feature: 'Image Gen', usage: 58 },
  { feature: 'Chat', usage: 91 },
  { feature: 'Analysis', usage: 64 },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'learning', label: 'Learning' },
    { key: 'growth', label: 'Growth' },
    { key: 'ai', label: 'AI Usage' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl">Analytics</h1>
          <p className="text-text-secondary text-sm">Deep insights into platform performance and user behavior</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-coral shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Daily Active Users', value: '3,847', change: '+12.3%', trend: 'up', icon: Users },
              { label: 'Avg. Session Duration', value: '24m 32s', change: '+5.2%', trend: 'up', icon: Clock },
              { label: 'Course Completion Rate', value: '68.4%', change: '+3.1%', trend: 'up', icon: Target },
              { label: 'Conversion Rate', value: '4.2%', change: '-0.8%', trend: 'down', icon: TrendingUp },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon size={20} className="text-gray-400" />
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </div>
                </div>
                <p className="font-display font-bold text-xl">{stat.value}</p>
                <p className="text-text-secondary text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Signups Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Signups vs Active Users</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={signupData}>
                    <defs>
                      <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2F45FF" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2F45FF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorActive2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF4D2E" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#FF4D2E" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="signups" stroke="#2F45FF" strokeWidth={2} fill="url(#colorSignups)" name="Signups" />
                    <Area type="monotone" dataKey="active" stroke="#FF4D2E" strokeWidth={2} fill="url(#colorActive2)" name="Active" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Distribution */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Device Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-2">
                {deviceData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Spent Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-display font-semibold mb-4">Time Spent per Session</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="range" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="users" fill="#2F45FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Learning Tab */}
      {activeTab === 'learning' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Lesson Drop-off */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Lesson Drop-off Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lessonDropoffData}>
                    <defs>
                      <linearGradient id="colorStarted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2F45FF" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2F45FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="lesson" stroke="#9CA3AF" fontSize={11} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="started" stroke="#94A3B8" strokeWidth={2} fill="transparent" name="Started" />
                    <Area type="monotone" dataKey="completed" stroke="#FF4D2E" strokeWidth={2} fill="url(#colorStarted)" name="Completed" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Insight:</strong> 28% drop-off at Lesson 3. Consider adding a progress checkpoint or simplifying content.
                </p>
              </div>
            </div>

            {/* Course Performance */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Course Performance Heatmap</h3>
              <div className="space-y-3">
                {[
                  { course: 'AI Fundamentals', completion: 68, avgTime: '3.2 weeks', rating: 4.8 },
                  { course: 'Prompt Engineering', completion: 72, avgTime: '2.1 weeks', rating: 4.9 },
                  { course: 'AI for Freelancers', completion: 55, avgTime: '4.5 weeks', rating: 4.6 },
                  { course: 'AI for Business', completion: 48, avgTime: '5.8 weeks', rating: 4.5 },
                ].map((course, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{course.course}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>Avg: {course.avgTime}</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-lg">{course.completion}%</p>
                      <p className="text-xs text-gray-500">completion</p>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          course.completion >= 70 ? 'bg-green-500' :
                          course.completion >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Growth Tab */}
      {activeTab === 'growth' && (
        <div className="space-y-6">
          {/* Cohort Retention */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-display font-semibold mb-4">Cohort Retention Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohortData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="week1" stroke="#2F45FF" strokeWidth={2} name="Week 1" />
                  <Line type="monotone" dataKey="week2" stroke="#FF4D2E" strokeWidth={2} name="Week 2" />
                  <Line type="monotone" dataKey="week3" stroke="#10B981" strokeWidth={2} name="Week 3" />
                  <Line type="monotone" dataKey="week4" stroke="#F59E0B" strokeWidth={2} name="Week 4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Conversion Funnel</h3>
              <div className="space-y-4">
                {[
                  { stage: 'Website Visitors', count: 45200, percentage: 100, color: 'bg-blue' },
                  { stage: 'Signups', count: 2847, percentage: 6.3, color: 'bg-coral' },
                  { stage: 'Course Starters', count: 1842, percentage: 64.7, color: 'bg-green-500' },
                  { stage: 'Course Completers', count: 847, percentage: 46.0, color: 'bg-purple-500' },
                  { stage: 'Certificate Earners', count: 584, percentage: 69.0, color: 'bg-yellow-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.stage}</span>
                      <span className="font-medium">{item.count.toLocaleString()} ({item.percentage}%)</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${Math.min(item.percentage, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Revenue by Source</h3>
              <div className="space-y-3">
                {[
                  { source: 'Direct', amount: 18400, percentage: 57 },
                  { source: 'Organic Search', amount: 7200, percentage: 22 },
                  { source: 'Social Media', amount: 4200, percentage: 13 },
                  { source: 'Referrals', amount: 2600, percentage: 8 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        idx === 0 ? 'bg-blue' :
                        idx === 1 ? 'bg-coral' :
                        idx === 2 ? 'bg-green-500' :
                        'bg-purple-500'
                      }`} />
                      <span className="text-sm">{item.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${item.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Usage Tab */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* AI Feature Usage */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">AI Feature Usage</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={aiUsageData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="feature" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Usage"
                      dataKey="usage"
                      stroke="#2F45FF"
                      fill="#2F45FF"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Prompt Success Rate */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-display font-semibold mb-4">Prompt Success Rate</h3>
              <div className="space-y-4">
                {[
                  { type: 'Code Generation', success: 87, total: 12400 },
                  { type: 'Text Summarization', success: 94, total: 8900 },
                  { type: 'Image Generation', success: 78, total: 5600 },
                  { type: 'Data Analysis', success: 82, total: 4200 },
                  { type: 'Translation', success: 96, total: 3800 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.type}</span>
                      <span className="font-medium">{item.success}% ({item.total.toLocaleString()} uses)</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.success >= 90 ? 'bg-green-500' :
                          item.success >= 80 ? 'bg-blue' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${item.success}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-blue rounded-xl border border-gray-200 p-5 text-white">
            <h3 className="font-display font-semibold mb-4">AI-Powered Insights</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">💡 Suggestion</p>
                <p className="text-sm">Lesson 3 has 28% drop-off. Consider adding interactive exercises.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">📈 Trend</p>
                <p className="text-sm">Code generation usage up 34% this week. Students prefer hands-on learning.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">⚠️ Alert</p>
                <p className="text-sm">3 lessons have completion rates below 50%. Review content difficulty.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
