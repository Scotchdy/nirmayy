export const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    animalId: "COW-247",
    farmerName: "Rajesh Kumar",
    medicine: "Amoxicillin",
    dosage: "20ml",
    startDate: "2025-11-20",
    duration: 5,
    status: "Active",
    compliance: "Compliant",
    withdrawalEnd: "2025-12-05"
  },
  {
    id: 2,
    animalId: "BUF-103",
    farmerName: "Suresh Patel",
    medicine: "Oxytetracycline",
    dosage: "15ml",
    startDate: "2025-11-18",
    duration: 3,
    status: "Completed",
    compliance: "Warning",
    withdrawalEnd: "2025-12-10"
  },
  {
    id: 3,
    animalId: "COW-155",
    farmerName: "Amit Singh",
    medicine: "Enrofloxacin",
    dosage: "10ml",
    startDate: "2025-11-24",
    duration: 4,
    status: "Pending Approval",
    compliance: "Non-Compliant",
    withdrawalEnd: "2025-12-08"
  }
];

export const MEDICINES = [
  { id: 1, name: "Amoxicillin", withdrawalDays: 15 },
  { id: 2, name: "Oxytetracycline", withdrawalDays: 22 },
  { id: 3, name: "Enrofloxacin", withdrawalDays: 14 },
  { id: 4, name: "Ivermectin", withdrawalDays: 28 },
  { id: 5, name: "Ceftiofur", withdrawalDays: 4 },
];

export const FARMER_ALERTS = [
  {
    id: 1,
    farmer: "Rajesh Kumar",
    message: "My cow (COW-247) is showing reduced appetite after yesterday's dose.",
    status: "Urgent",
    time: "2 hours ago"
  },
  {
    id: 2,
    farmer: "Anita Devi",
    message: "Need clarification on the withdrawal period for the new batch.",
    status: "Assistance Needed",
    time: "5 hours ago"
  },
  {
    id: 3,
    farmer: "Suresh Patel",
    message: "Treatment completed for BUF-103. Can I resume milking?",
    status: "Resolved",
    time: "1 day ago"
  }
];
