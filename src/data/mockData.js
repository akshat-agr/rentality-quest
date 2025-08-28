// Mock data for the Smart Rental Tracking System

export const mockClients = [
  {
    id: 1,
    name: "BuildMax Construction",
    totalEngineHours: 1250,
    idleHours: 85,
    rentalsThisMonth: 8,
    achievements: ["first-100-hours", "efficiency-master", "most-active"],
    utilizationRate: 93.6,
    avatar: "BC"
  },
  {
    id: 2,
    name: "TechBuild Solutions",
    totalEngineHours: 980,
    idleHours: 120,
    rentalsThisMonth: 6,
    achievements: ["first-100-hours", "reliable-partner"],
    utilizationRate: 89.1,
    avatar: "TS"
  },
  {
    id: 3,
    name: "Metro Infrastructure",
    totalEngineHours: 2100,
    idleHours: 45,
    rentalsThisMonth: 12,
    achievements: ["first-100-hours", "efficiency-master", "most-active", "zero-idle-week"],
    utilizationRate: 97.9,
    avatar: "MI"
  },
  {
    id: 4,
    name: "Coastal Builders",
    totalEngineHours: 650,
    idleHours: 200,
    rentalsThisMonth: 4,
    achievements: ["first-100-hours"],
    utilizationRate: 76.5,
    avatar: "CB"
  },
  {
    id: 5,
    name: "Pioneer Projects",
    totalEngineHours: 1800,
    idleHours: 95,
    rentalsThisMonth: 10,
    achievements: ["first-100-hours", "efficiency-master", "most-active"],
    utilizationRate: 95.0,
    avatar: "PP"
  }
];

export const mockEquipment = [
  {
    id: "EQ001",
    type: "Excavator",
    siteId: "S224",
    region: "Dhanbad",
    checkInDate: "2024-08-15",
    checkOutDate: "2024-09-20",
    status: "active",
    engineHoursPerDay: 8.5,
    idleHoursPerDay: 1.2,
    operatingDays: 25,
    lastOperatorId: "OP003",
    clientId: 1
  },
  {
    id: "EQ002",
    type: "Bulldozer",
    siteId: "S350",
    region: "Bangalore",
    checkInDate: "2024-07-22",
    checkOutDate: "2024-10-15",
    status: "active",
    engineHoursPerDay: 9.2,
    idleHoursPerDay: 0.8,
    operatingDays: 32,
    lastOperatorId: "OP007",
    clientId: 3
  },
  {
    id: "EQ003",
    type: "Crane",
    siteId: "S065",
    region: "Mumbai",
    checkInDate: "2024-08-01",
    checkOutDate: "2024-08-30",
    status: "maintenance",
    engineHoursPerDay: 6.8,
    idleHoursPerDay: 2.5,
    operatingDays: 18,
    lastOperatorId: "OP012",
    clientId: 2
  },
  {
    id: "EQ004",
    type: "Loader",
    siteId: "S445",
    region: "Chennai",
    checkInDate: "2024-08-20",
    checkOutDate: "2024-09-25",
    status: "active",
    engineHoursPerDay: 7.9,
    idleHoursPerDay: 1.8,
    operatingDays: 22,
    lastOperatorId: "OP005",
    clientId: 5
  },
  {
    id: "EQ005",
    type: "Grader",
    siteId: "S178",
    region: "Delhi",
    checkInDate: "2024-08-10",
    checkOutDate: "2024-09-15",
    status: "idle",
    engineHoursPerDay: 5.2,
    idleHoursPerDay: 3.8,
    operatingDays: 15,
    lastOperatorId: "OP009",
    clientId: 4
  }
];

export const mockAchievements = {
  "first-100-hours": {
    name: "First 100 Hours",
    description: "Completed first 100 engine hours",
    icon: "trophy",
    tier: "bronze",
    unlockedAt: "2024-07-15"
  },
  "efficiency-master": {
    name: "Efficiency Master",
    description: "Maintained >90% utilization rate",
    icon: "target",
    tier: "gold",
    unlockedAt: "2024-08-01"
  },
  "most-active": {
    name: "Most Active Client",
    description: "Highest rental count this month",
    icon: "flame",
    tier: "gold",
    unlockedAt: "2024-08-20"
  },
  "zero-idle-week": {
    name: "Zero Idle Week",
    description: "A full week without idle time",
    icon: "zap",
    tier: "silver",
    unlockedAt: "2024-08-10"
  },
  "reliable-partner": {
    name: "Reliable Partner",
    description: "6+ months of consistent rentals",
    icon: "handshake",
    tier: "silver",
    unlockedAt: "2024-06-30"
  }
};

export const mockNotifications = [
  {
    id: 1,
    type: "achievement",
    message: "Metro Infrastructure unlocked Efficiency Master badge!",
    timestamp: "2 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "milestone",
    message: "BuildMax Construction reached 1000+ engine hours!",
    timestamp: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "warning",
    message: "Equipment EQ003 needs maintenance attention",
    timestamp: "3 hours ago",
    read: true
  }
];

export const equipmentTypes = [
  { name: "Excavator", total: 45, active: 32, idle: 8, maintenance: 5 },
  { name: "Bulldozer", total: 28, active: 22, idle: 4, maintenance: 2 },
  { name: "Crane", total: 35, active: 25, idle: 6, maintenance: 4 },
  { name: "Loader", total: 52, active: 38, idle: 10, maintenance: 4 },
  { name: "Grader", total: 30, active: 24, idle: 4, maintenance: 2 }
];