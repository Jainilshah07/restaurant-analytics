import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Avatar,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  FilterList,
  Restaurant,
  LocationOn,
  Phone,
  Email,
  MoreVert,
  TrendingUp,
  AttachMoney,
  Group,
} from "@mui/icons-material";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              name: "Tandoori Treats",
              cuisine: "North Indian",
              location: "Bangalore",
              phone: "+91 98765 43210",
              email: "contact@tandooritreats.com",
              rating: 4.5,
              totalOrders: 1250,
              revenue: 45000,
              avgOrderValue: 650,
              status: "active",
              image: "🍛"
            },
            {
              id: 2,
              name: "Sushi Bay",
              cuisine: "Japanese",
              location: "Mumbai",
              phone: "+91 87654 32109",
              email: "hello@sushibay.com",
              rating: 4.8,
              totalOrders: 890,
              revenue: 78000,
              avgOrderValue: 1200,
              status: "active",
              image: "🍣"
            },
            {
              id: 3,
              name: "Pasta Palace",
              cuisine: "Italian",
              location: "Delhi",
              phone: "+91 76543 21098",
              email: "info@pastapalace.com",
              rating: 4.2,
              totalOrders: 670,
              revenue: 32000,
              avgOrderValue: 580,
              status: "active",
              image: "🍝"
            },
            {
              id: 4,
              name: "Burger Hub",
              cuisine: "American",
              location: "Hyderabad",
              phone: "+91 65432 10987",
              email: "orders@burgerhub.com",
              rating: 4.0,
              totalOrders: 2100,
              revenue: 125000,
              avgOrderValue: 450,
              status: "active",
              image: "🍔"
            },
            {
              id: 5,
              name: "Spice Garden",
              cuisine: "South Indian",
              location: "Chennai",
              phone: "+91 54321 09876",
              email: "contact@spicegarden.com",
              rating: 4.6,
              totalOrders: 1580,
              revenue: 92000,
              avgOrderValue: 720,
              status: "inactive",
              image: "🌶️"
            },
            {
              id: 6,
              name: "Dragon Wok",
              cuisine: "Chinese",
              location: "Pune",
              phone: "+91 43210 98765",
              email: "hello@dragonwok.com",
              rating: 4.3,
              totalOrders: 945,
              revenue: 58000,
              avgOrderValue: 680,
              status: "active",
              image: "🥢"
            }
          ];
          setRestaurants(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || restaurant.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    setFilterAnchor(null);
    if (filter) {
      setSelectedFilter(filter);
    }
  };

  const RestaurantCard = ({ restaurant }) => {
    const [menuAnchor, setMenuAnchor] = useState(null);

    return (
      <Card 
        sx={{ 
          borderRadius: 2, 
          boxShadow: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
          border: restaurant.status === 'inactive' ? '2px solid #ffeb3b' : 'none'
        }}
      >
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 56, height: 56, fontSize: '1.5rem', bgcolor: 'primary.main' }}>
                {restaurant.image}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {restaurant.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip 
                    label={restaurant.cuisine} 
                    size="small" 
                    sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                  />
                  <Chip 
                    label={restaurant.status} 
                    size="small" 
                    color={restaurant.status === 'active' ? 'success' : 'warning'}
                  />
                </Box>
                <Rating value={restaurant.rating} readOnly size="small" precision={0.1} />
              </Box>
            </Box>
            <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem onClick={() => setMenuAnchor(null)}>View Details</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)}>Edit Restaurant</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)}>View Menu</MenuItem>
            </Menu>
          </Box>

          {/* Contact Info */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {restaurant.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {restaurant.phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {restaurant.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Metrics */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                <Group sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {restaurant.totalOrders.toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Total Orders
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                <AttachMoney sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                  ₹{restaurant.revenue.toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Revenue
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 0.5 }}>
                <TrendingUp sx={{ fontSize: 16, color: 'warning.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  ₹{restaurant.avgOrderValue}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Avg Order
              </Typography>
            </Box>
          </Box>

          {/* Action Button */}
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ borderRadius: 2 }}
          >
            VIEW ANALYTICS
          </Button>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          🏪 Restaurants
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and monitor your restaurant partners
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Search restaurants, cuisine, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={handleFilterClick}
          sx={{ minWidth: 120 }}
        >
          {selectedFilter === 'all' ? 'All Status' : selectedFilter}
        </Button>
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => handleFilterClose()}
        >
          <MenuItem onClick={() => handleFilterClose('all')}>All Status</MenuItem>
          <MenuItem onClick={() => handleFilterClose('active')}>Active</MenuItem>
          <MenuItem onClick={() => handleFilterClose('inactive')}>Inactive</MenuItem>
        </Menu>
        <Button variant="contained" sx={{ minWidth: 140 }}>
          Add Restaurant
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {restaurants.length}
              </Typography>
              <Typography variant="body2">
                Total Restaurants
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {restaurants.filter(r => r.status === 'active').length}
              </Typography>
              <Typography variant="body2">
                Active Restaurants
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ₹{restaurants.reduce((sum, r) => sum + r.revenue, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Total Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {restaurants.reduce((sum, r) => sum + r.totalOrders, 0).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Restaurants Grid */}
      <Grid container spacing={3}>
        {filteredRestaurants.map((restaurant) => (
          <Grid item xs={12} md={6} lg={4} key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Restaurant sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No restaurants found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Restaurants;