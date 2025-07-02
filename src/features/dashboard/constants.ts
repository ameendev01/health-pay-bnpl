export const kpis = [
  { label: "Total BNPL Revenue", value: '$72,450', change: '+15.2%', trend: 'up' },
  { label: 'New Payment Plans (MTD)', value: '128', change: '+20%', trend: 'up' },
  { label: 'Overdue Payments', value: '9', change: '+3', trend: 'down' },
  { label: 'Patient Satisfaction', value: '98.2%', change: '+0.1%', trend: 'up' }
];

export const upcomingTasks = [
  { id: 1, title: 'Review payment plan applications', priority: 'high', dueTime: '2:00 PM' },
  { id: 2, title: 'Monthly clinic performance review', priority: 'medium', dueTime: '4:30 PM' },
  { id: 3, title: 'Update system configurations', priority: 'low', dueTime: 'Tomorrow' },
];

export const recentAlerts = [
  { id: 1, type: 'warning', message: 'Payment overdue: Emma Wilson - $320', time: '5 min ago', link: '/payments/123' },
  { id: 2, type: 'success', message: 'New clinic approved: Downtown Medical', time: '1 hour ago', link: '/clinics/456' },
  { id: 3, type: 'info', message: 'System maintenance scheduled for tonight', time: '2 hours ago', link: '#' },
];
