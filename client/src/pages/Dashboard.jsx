import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  TrendingUp,
  Restaurant,
  AttachMoney,
  AccessTime,
} from "@mui/icons-material";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <CircularProgress size={60} sx={{ color: 'white', mb: 2 }} />
          <Typography variant="h6">Loading Dashboard...</Typography>
        </Box>
      </Box>
    );
  }

  // ---- Compute Analytics ----
  const grouped = orders.reduce((acc, order) => {
    const date = format(parseISO(order.order_time), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = { count: 0, revenue: 0, hourly: {} };
    acc[date].count += 1;
    acc[date].revenue += parseFloat(order.order_amount) || 0; // Ensure numeric value

    const hour = new Date(order.order_time).getHours();
    acc[date].hourly[hour] = (acc[date].hourly[hour] || 0) + 1;

    return acc;
  }, {});

  const dailyData = Object.keys(grouped)
    .sort() // Sort dates chronologically
    .map((date) => ({
      date: format(parseISO(date), "MMM dd"), // Better date formatting
      fullDate: date,
      count: grouped[date].count,
      revenue: Math.round(grouped[date].revenue * 100) / 100, // Round to 2 decimal places
      avgOrderValue: Math.round((grouped[date].revenue / grouped[date].count) * 100) / 100,
      peakHour: Object.entries(grouped[date].hourly).reduce(
        (max, [hour, count]) => (count > max.count ? { hour: parseInt(hour), count } : max),
        { hour: null, count: 0 }
      ).hour,
    }));

  const totalOrders = dailyData.reduce((sum, d) => sum + d.count, 0);
  const totalRevenue = Math.round(dailyData.reduce((sum, d) => sum + d.revenue, 0) * 100) / 100;
  const avgOrderValue = totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0;

  // Calculate peak hour globally
  const allHourlyData = Object.values(grouped)
    .flatMap((d) => Object.entries(d.hourly))
    .reduce((acc, [hour, count]) => {
      acc[hour] = (acc[hour] || 0) + count;
      return acc;
    }, {});

  const globalPeakHour = Object.entries(allHourlyData).reduce(
    (max, [hour, count]) => (count > max.count ? { hour: parseInt(hour), count } : max),
    { hour: 0, count: 0 }
  ).hour;

  // Prepare hourly distribution data for pie chart
  const hourlyDistribution = Object.entries(allHourlyData)
    .map(([hour, count]) => ({
      hour: `${hour}:00`,
      count,
      percentage: Math.round((count / totalOrders) * 100),
    }))
    .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

  // Color schemes
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  // KPI Card component
  const KPICard = ({ title, value, icon, color, trend, subtitle }) => (
    <Card 
      sx={{
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `1px solid ${color}33`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 25px ${color}33`,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ color, mr: 1 }}>{icon}</Box>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        )}
        {trend && (
          <Chip 
            label={trend} 
            size="small" 
            sx={{ mt: 1, backgroundColor: `${color}22`, color }} 
          />
        )}
      </CardContent>
    </Card>
  );

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Card sx={{ p: 2, border: 'none', boxShadow: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} sx={{ color: entry.color, fontSize: '0.875rem' }}>
              {entry.name}: {typeof entry.value === 'number' ? 
                (entry.dataKey === 'revenue' ? `₹${entry.value}` : entry.value) : 
                entry.value
              }
            </Typography>
          ))}
        </Card>
      );
    }
    return null;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      p: 3 
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#2d3436', mb: 1 }}>
          Restaurant Analytics
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#636e72' }}>
          Real-time insights and performance metrics
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total Orders"
            value={totalOrders.toLocaleString()}
            icon={<Restaurant />}
            color="#667eea"
            subtitle="All time orders"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#764ba2"
            subtitle="Gross earnings"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Avg Order Value"
            value={`₹${avgOrderValue}`}
            icon={<TrendingUp />}
            color="#f093fb"
            subtitle="Per order average"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Peak Hour"
            value={`${globalPeakHour}:00`}
            icon={<AccessTime />}
            color="#4facfe"
            subtitle="Busiest time"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Daily Orders Chart */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: '400px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                📈 Daily Orders Trend
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1e5e9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#636e72"
                    fontSize={12}
                  />
                  <YAxis stroke="#636e72" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#667eea" 
                    strokeWidth={3}
                    dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Revenue Chart */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: '400px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                💰 Daily Revenue
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1e5e9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#636e72"
                    fontSize={12}
                  />
                  <YAxis stroke="#636e72" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#revenueGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#764ba2" />
                      <stop offset="100%" stopColor="#667eea" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Hourly Distribution */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: '400px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                🕐 Orders by Hour
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={hourlyDistribution.slice(0, 6)} // Show top 6 hours
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({hour, percentage}) => `${hour} (${percentage}%)`}
                  >
                    {hourlyDistribution.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Average Order Value Trend */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: '400px' }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2d3436' }}>
                📊 Average Order Value Trend
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e1e5e9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#636e72"
                    fontSize={12}
                  />
                  <YAxis stroke="#636e72" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="avgOrderValue" 
                    stroke="#f093fb" 
                    strokeWidth={3}
                    dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#f093fb', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;