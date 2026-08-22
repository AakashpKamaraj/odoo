/* ==========================================================================
   DAYFLOW CORE JAVASCRIPT - GLOBAL ENGINE & UTILITIES
   "Plan your day. Focus on what matters."
   ========================================================================== */

// --- Salary Breakdown Generator Helper ---
function createSalaryRecord(annualCTC, bankName, accountNumber, panId) {
  const annual = parseFloat(annualCTC) || 120000;
  const grossMonthly = Math.round(annual / 12);
  const basic = Math.round(grossMonthly * 0.50);
  const hra = Math.round(grossMonthly * 0.20);
  const specialAllowance = Math.round(grossMonthly * 0.15);
  const bonus = Math.round(grossMonthly * 0.15);

  const tax = Math.round(grossMonthly * 0.12);
  const pf = Math.round(grossMonthly * 0.06);
  const profTax = 50;
  const healthIns = 150;
  const totalDeductions = tax + pf + profTax + healthIns;
  const netSalary = grossMonthly - totalDeductions;

  return {
    annualCTC: annual,
    monthlyGross: grossMonthly,
    currency: "USD",
    currencySymbol: "$",
    breakdown: {
      basic,
      hra,
      specialAllowance,
      performanceBonus: bonus
    },
    deductions: {
      incomeTax: tax,
      providentFund: pf,
      professionalTax: profTax,
      healthInsurance: healthIns,
      total: totalDeductions
    },
    netSalary,
    bankName: bankName || "JPMorgan Chase Bank, N.A.",
    accountNumber: accountNumber || ("•••• •••• " + Math.floor(1000 + Math.random() * 9000)),
    routingNumber: "021000021",
    panOrSSN: panId || ("DF-TAX-" + Math.floor(10000 + Math.random() * 90000)),
    paymentMethod: "Direct Deposit (ACH)",
    paymentDay: "1st of every month",
    status: "Paid",
    lastPaidDate: "August 1, 2026",
    payslips: [
      {
        month: "August 2026",
        period: "01 Aug 2026 - 31 Aug 2026",
        paidOn: "01 Aug 2026",
        transactionId: "TXN-20260801-" + Math.floor(100000 + Math.random() * 900000),
        gross: grossMonthly,
        deductions: totalDeductions,
        net: netSalary,
        status: "Paid",
        workingDays: 31,
        lopDays: 0
      },
      {
        month: "July 2026",
        period: "01 Jul 2026 - 31 Jul 2026",
        paidOn: "01 Jul 2026",
        transactionId: "TXN-20260701-" + Math.floor(100000 + Math.random() * 900000),
        gross: grossMonthly,
        deductions: totalDeductions,
        net: netSalary,
        status: "Paid",
        workingDays: 31,
        lopDays: 0
      },
      {
        month: "June 2026",
        period: "01 Jun 2026 - 30 Jun 2026",
        paidOn: "01 Jun 2026",
        transactionId: "TXN-20260601-" + Math.floor(100000 + Math.random() * 900000),
        gross: grossMonthly,
        deductions: totalDeductions,
        net: netSalary,
        status: "Paid",
        workingDays: 30,
        lopDays: 0
      },
      {
        month: "May 2026",
        period: "01 May 2026 - 31 May 2026",
        paidOn: "01 May 2026",
        transactionId: "TXN-20260501-" + Math.floor(100000 + Math.random() * 900000),
        gross: grossMonthly,
        deductions: totalDeductions,
        net: netSalary,
        status: "Paid",
        workingDays: 31,
        lopDays: 0
      }
    ]
  };
}

// --- Predefined Multi-User Directory (Enforcing exactly ONE designated HR Administrator) ---
const HR_ADMIN_USER = {
  name: "Jessica Taylor",
  email: "hr@dayflow.corp",
  aliasEmail: "jessica.taylor@dayflow.corp",
  employeeId: "HR-001",
  role: "Head of People Operations & HR Director",
  roleType: "hr",
  isHR: true,
  department: "People Operations & Human Resources",
  company: "DayFlow Enterprise Inc.",
  manager: "Chief Executive Officer (CEO)",
  managerRole: "Executive Board",
  managerEmail: "ceo@dayflow.corp",
  hrPartner: "Self (HR Director)",
  joiningDate: "2020-01-10",
  employmentType: "Full-time / Permanent Executive",
  grade: "L7 Executive Director",
  workLocation: "San Francisco HQ - Executive Wing (Onsite & Remote)",
  shift: "Administrative Shift (08:30 AM - 05:30 PM PST)",
  location: "San Francisco, CA",
  phone: "+1 (555) 019-9001",
  emergencyContact: "Robert Taylor (+1 555-019-9002, Spouse)",
  costCenter: "CC-HR-101",
  dailyGoal: 6,
  streak: 21,
  bestStreak: 45,
  weekStart: "monday",
  soundEnabled: true,
  attendanceScore: "99.8%",
  skills: ["People Operations", "Talent Strategy", "HR Compliance & Approvals", "Compensation & Quota Management", "Executive Leadership"],
  salary: createSalaryRecord(168000, "First Republic Bank / JPMorgan", "•••• •••• 9001", "DF-HR-001-TAX"),
  notifications: {
    taskReminders: true,
    deadlineAlerts: true,
    dailySummary: true,
    leaveUpdates: true,
    shiftAlerts: true
  }
};

const PREDEFINED_USERS = [
  // 1. Single Authorized HR Administrator
  HR_ADMIN_USER,

  // 2. Multiple Regular Employees
  {
    name: "Alex Morgan",
    email: "alex.morgan@dayflow.corp",
    aliasEmail: "demo@dayflow.com",
    employeeId: "EMP-84092",
    role: "Staff Product Designer & Lead",
    roleType: "employee",
    isHR: false,
    department: "Product Experience & Design Systems",
    company: "DayFlow Enterprise Inc.",
    manager: "Sarah Chen",
    managerRole: "VP of Product Engineering",
    managerEmail: "sarah.chen@dayflow.corp",
    hrPartner: "Jessica Taylor (HR-001)",
    joiningDate: "2022-03-15",
    employmentType: "Full-time / Permanent",
    grade: "L5 Senior Staff",
    workLocation: "San Francisco HQ - Tech Hub 4 (Hybrid)",
    shift: "General Shift (09:00 AM - 06:00 PM PST)",
    location: "San Francisco, CA",
    phone: "+1 (555) 019-2834",
    emergencyContact: "Elena Morgan (+1 555-019-2835, Spouse)",
    costCenter: "CC-PROD-902",
    dailyGoal: 5,
    streak: 7,
    bestStreak: 14,
    weekStart: "monday",
    soundEnabled: true,
    attendanceScore: "98.5%",
    skills: ["UI/UX Architecture", "Figma Design Systems", "TypeScript", "User Research", "Agile Leadership"],
    salary: createSalaryRecord(126000, "Silicon Valley Bank (SVB)", "•••• •••• 8409", "DF-EMP-84092-X"),
    notifications: {
      taskReminders: true,
      deadlineAlerts: true,
      dailySummary: true,
      leaveUpdates: true,
      shiftAlerts: true
    }
  },
  {
    name: "Liam Vance",
    email: "liam.vance@dayflow.corp",
    aliasEmail: "liam@dayflow.corp",
    employeeId: "EMP-84093",
    role: "Senior Frontend Engineer",
    roleType: "employee",
    isHR: false,
    department: "Frontend Platform & Web Performance",
    company: "DayFlow Enterprise Inc.",
    manager: "Sarah Chen",
    managerRole: "VP of Product Engineering",
    managerEmail: "sarah.chen@dayflow.corp",
    hrPartner: "Jessica Taylor (HR-001)",
    joiningDate: "2023-01-09",
    employmentType: "Full-time / Permanent",
    grade: "L4 Senior Engineer",
    workLocation: "Austin Tech Center (Remote)",
    shift: "General Shift (09:00 AM - 06:00 PM CST)",
    location: "Austin, TX",
    phone: "+1 (555) 019-3382",
    emergencyContact: "Chloe Vance (+1 555-019-3383, Sister)",
    costCenter: "CC-ENG-402",
    dailyGoal: 4,
    streak: 12,
    bestStreak: 19,
    weekStart: "monday",
    soundEnabled: true,
    attendanceScore: "97.2%",
    skills: ["React 19", "CSS Architecture", "TypeScript", "Accessibility (a11y)", "Web Vitals"],
    salary: createSalaryRecord(114000, "Wells Fargo Bank, N.A.", "•••• •••• 3382", "DF-EMP-84093-L"),
    notifications: {
      taskReminders: true,
      deadlineAlerts: true,
      dailySummary: true,
      leaveUpdates: true,
      shiftAlerts: true
    }
  },
  {
    name: "Maya Patel",
    email: "maya.patel@dayflow.corp",
    aliasEmail: "maya@dayflow.corp",
    employeeId: "EMP-84094",
    role: "Senior Product Manager",
    roleType: "employee",
    isHR: false,
    department: "Product Strategy & Growth",
    company: "DayFlow Enterprise Inc.",
    manager: "David Chen",
    managerRole: "Head of Product",
    managerEmail: "david.chen@dayflow.corp",
    hrPartner: "Jessica Taylor (HR-001)",
    joiningDate: "2022-08-01",
    employmentType: "Full-time / Permanent",
    grade: "L5 Senior PM",
    workLocation: "New York Tech Hub (Hybrid)",
    shift: "General Shift (09:00 AM - 06:00 PM EST)",
    location: "New York, NY",
    phone: "+1 (555) 019-7711",
    emergencyContact: "Raj Patel (+1 555-019-7712, Father)",
    costCenter: "CC-PROD-903",
    dailyGoal: 6,
    streak: 9,
    bestStreak: 22,
    weekStart: "monday",
    soundEnabled: true,
    attendanceScore: "99.1%",
    skills: ["Roadmapping", "Customer Interviews", "Data Analytics", "Scrum Master", "PRDs"],
    salary: createSalaryRecord(132000, "Citibank N.A.", "•••• •••• 7711", "DF-EMP-84094-M"),
    notifications: {
      taskReminders: true,
      deadlineAlerts: true,
      dailySummary: true,
      leaveUpdates: true,
      shiftAlerts: true
    }
  },
  {
    name: "David Kim",
    email: "david.kim@dayflow.corp",
    aliasEmail: "david@dayflow.corp",
    employeeId: "EMP-84095",
    role: "Principal Cloud Architect",
    roleType: "employee",
    isHR: false,
    department: "Infrastructure & Platform Security",
    company: "DayFlow Enterprise Inc.",
    manager: "Elena Rostova",
    managerRole: "Director of Engineering",
    managerEmail: "elena.rostova@dayflow.corp",
    hrPartner: "Jessica Taylor (HR-001)",
    joiningDate: "2021-06-20",
    employmentType: "Full-time / Permanent",
    grade: "L6 Principal Architect",
    workLocation: "Seattle Office (Hybrid)",
    shift: "General Shift (09:00 AM - 06:00 PM PST)",
    location: "Seattle, WA",
    phone: "+1 (555) 019-4455",
    emergencyContact: "Hannah Kim (+1 555-019-4456, Spouse)",
    costCenter: "CC-INFRA-801",
    dailyGoal: 5,
    streak: 15,
    bestStreak: 30,
    weekStart: "monday",
    soundEnabled: true,
    attendanceScore: "98.9%",
    skills: ["Cloud Architecture", "Kubernetes", "Zero-Trust Security", "Terraform", "Site Reliability"],
    salary: createSalaryRecord(150000, "Bank of America", "•••• •••• 4455", "DF-EMP-84095-D"),
    notifications: {
      taskReminders: true,
      deadlineAlerts: true,
      dailySummary: true,
      leaveUpdates: true,
      shiftAlerts: true
    }
  }
];

// --- Default Demo Enterprise Professional Profile (Alex Morgan) ---
const DEFAULT_USER = PREDEFINED_USERS[1];

// --- Storage Keys ---
const STORAGE_KEYS = {
  AUTH: 'dayflow_auth',
  USER: 'dayflow_user',
  REGISTERED_USERS: 'dayflow_registered_users',
  TASKS: 'dayflow_tasks',
  THEME: 'dayflow_theme',
  SETTINGS: 'dayflow_settings',
  FOCUS_STATE: 'dayflow_focus_state',
  LEAVES: 'dayflow_leaves',
  ATTENDANCE: 'dayflow_attendance',
  SUPPORT_TICKETS: 'dayflow_support_tickets'
};

// --- High-Fidelity Web Audio Synthesizer (Zero asset dependencies) ---
class DayFlowAudioEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  isEnabled() {
    const user = DayFlow ? DayFlow.getUser() : DEFAULT_USER;
    return user.soundEnabled !== false;
  }

  playClick() {
    if (!this.isEnabled()) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  playComplete() {
    if (!this.isEnabled()) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.07);
        osc.stop(this.ctx.currentTime + i * 0.07 + 0.25);
      });
    } catch (e) {}
  }

  playTimerFinish() {
    if (!this.isEnabled()) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const chords = [440, 554.37, 659.25, 880];
      chords.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.8);
      });
    } catch (e) {}
  }
}

// --- Global App Engine ---
class DayFlowApp {
  constructor() {
    this.currentUser = this.getUser();
    this.tasks = [];
    this.audio = new DayFlowAudioEngine();
    this.initTheme();
  }

  // --- Auth Check ---
  isAuthenticated() {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }

  getPredefinedUsers() {
    return PREDEFINED_USERS;
  }

  getHRUser() {
    return HR_ADMIN_USER;
  }

  isCurrentUserHR() {
    const user = this.getUser();
    return user && (user.isHR === true || user.roleType === 'hr' || user.email === 'hr@dayflow.corp' || user.employeeId === 'HR-001');
  }

  requireAuth() {
    const path = window.location.pathname;
    const isAuthPage = path.includes('login.html');
    const isHomePage = path === '/' || path.endsWith('index.html') || path === '';

    // If on protected page and not logged in, send to login
    if (!this.isAuthenticated() && !isAuthPage && !isHomePage) {
      window.location.href = '/pages/login.html';
      return false;
    }
    // If on login page and already logged in, send to dashboard
    if (this.isAuthenticated() && isAuthPage) {
      window.location.href = '/pages/dashboard.html';
      return false;
    }
    return true;
  }

  loginDemoUser() {
    this.loginAsUser('alex.morgan@dayflow.corp');
  }

  loginAsHR() {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    this.saveUser({ ...HR_ADMIN_USER });
    this.toast('Welcome, Jessica Taylor!', 'Authenticated with HR Administrator privileges', 'success');
    setTimeout(() => {
      window.location.href = '/pages/dashboard.html';
    }, 400);
  }

  loginAsUser(email) {
    const normalized = (email || '').toLowerCase().trim();
    
    // Check if logging in as single HR
    if (normalized === 'hr@dayflow.corp' || normalized === 'jessica.taylor@dayflow.corp') {
      return this.loginAsHR();
    }

    // Check existing predefined user
    const matched = PREDEFINED_USERS.find(u => 
      u.email.toLowerCase() === normalized || 
      (u.aliasEmail && u.aliasEmail.toLowerCase() === normalized)
    );

    let userToSet;
    if (matched) {
      userToSet = { ...matched };
    } else {
      // Dynamic custom employee user
      const namePart = normalized.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      userToSet = {
        ...DEFAULT_USER,
        name: namePart || 'Team Member',
        email: normalized,
        employeeId: `EMP-${Math.floor(10000 + Math.random() * 90000)}`,
        role: "Associate Team Specialist",
        roleType: "employee",
        isHR: false,
        department: "General Operations",
        manager: "Sarah Chen",
        hrPartner: "Jessica Taylor (HR-001)"
      };
    }

    // Strictly enforce: Standard users CANNOT be HR
    userToSet.isHR = false;
    userToSet.roleType = 'employee';

    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    this.saveUser(userToSet);
    this.toast(`Welcome, ${userToSet.name}!`, 'Authenticated as DayFlow Employee', 'success');
    setTimeout(() => {
      window.location.href = '/pages/dashboard.html';
    }, 400);
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    this.toast('Signed Out', 'You have been safely signed out. Redirecting...', 'info');
    setTimeout(() => {
      window.location.href = '/pages/login.html';
    }, 250);
  }

  // --- Ensure Switch User Modal Exists Everywhere ---
  ensureSwitchUserModal() {
    let modal = document.getElementById('switchUserModal');
    const isAuthPage = window.location.pathname.includes('login.html');
    if (isAuthPage) return;

    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-backdrop';
      modal.id = 'switchUserModal';
      document.body.appendChild(modal);
    }

    const allUsers = this.getAllUsers();
    const employees = allUsers.filter(u => !u.isHR && u.roleType !== 'hr' && u.email !== 'hr@dayflow.corp');

    let employeesHtml = employees.map(emp => {
      const initials = (emp.name || 'EM').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
      return `
        <button type="button" class="btn btn-secondary btn-sm" style="display: flex; align-items: center; justify-content: flex-start; text-align: left; gap: 0.5rem; padding: 0.5rem 0.625rem;" onclick="DayFlow.loginAsUser('${emp.email}')">
          <div style="width: 28px; height: 28px; border-radius: var(--radius-pill); background: var(--primary-light); color: var(--primary); font-weight: 700; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${initials}</div>
          <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <div style="font-size: 0.75rem; font-weight: 700;">${emp.name}</div>
            <div style="font-size: 0.6875rem; color: var(--text-muted);">${emp.role} (${emp.employeeId})</div>
          </div>
        </button>
      `;
    }).join('');

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 540px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h3 style="font-size: 1.125rem; font-weight: 800; margin: 0;">Switch Workspace Account</h3>
              <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;">Multiple Employee Logins & Single Designated HR Portal</p>
            </div>
          </div>
          <button class="btn btn-icon btn-sm" data-close-modal="switchUserModal" aria-label="Close modal">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="modal-body" style="display: flex; flex-direction: column; gap: 1rem; max-height: 65vh; overflow-y: auto;">
          <!-- Section 1: Single HR Director (Only 1 Account) -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.375rem;">
              <span style="font-size: 0.6875rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.25rem;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Single Designated HR Administrator (1 Only)
              </span>
              <span class="badge" style="background: rgba(124, 58, 237, 0.15); color: #7C3AED; font-size: 0.625rem; font-weight: 700;">Full Company Oversight</span>
            </div>
            <div style="background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(79, 70, 229, 0.04)); border: 1.5px solid rgba(124, 58, 237, 0.35); border-radius: var(--radius-md); padding: 0.75rem; display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.625rem;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-pill); background: linear-gradient(135deg, #7C3AED, #4F46E5); color: #fff; font-weight: 800; font-size: 0.8125rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">JT</div>
                <div>
                  <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 0.35rem;">
                    <span>Jessica Taylor</span>
                    <span class="badge" style="background: #7C3AED; color: #fff; font-size: 0.625rem; padding: 0.1rem 0.35rem;">HR-001</span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">hr@dayflow.corp • Head of People Operations</div>
                </div>
              </div>
              <button type="button" class="btn btn-sm" style="background: #7C3AED; color: #fff; font-weight: 600; font-size: 0.75rem; padding: 0.4rem 0.75rem; flex-shrink: 0;" onclick="DayFlow.loginAsHR()">
                Sign In HR
              </button>
            </div>
          </div>

          <!-- Section 2: Multiple Regular Employees -->
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.375rem;">
              <span style="font-size: 0.6875rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
                All Team Employees (${employees.length})
              </span>
              <a href="/pages/login.html?mode=register" style="font-size: 0.6875rem; color: var(--primary); font-weight: 700; text-decoration: none;">+ Add New Employee</a>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              ${employeesHtml}
            </div>
          </div>

          <!-- Section 3: Custom Employee Email Input -->
          <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
            <label style="font-size: 0.6875rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.25rem; display: block;">Sign in as custom employee:</label>
            <div style="display: flex; gap: 0.5rem;">
              <input type="email" id="modalCustomUserEmail" class="form-input" placeholder="e.g. yourname@dayflow.corp" style="font-size: 0.8125rem; padding: 0.4rem 0.65rem;" />
              <button type="button" class="btn btn-primary btn-sm" onclick="const em = document.getElementById('modalCustomUserEmail').value.trim(); if(em) DayFlow.loginAsUser(em); else DayFlow.toast('Input Error', 'Please enter an email', 'error');">Login</button>
            </div>
          </div>
        </div>

        <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center;">
          <button type="button" class="btn btn-outline btn-sm logout-btn" style="color: var(--danger); border-color: var(--danger);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span>Log Out All Sessions</span>
          </button>
          <button type="button" class="btn btn-secondary btn-sm" data-close-modal="switchUserModal">Close</button>
        </div>
      </div>
    `;
  }

  // --- User Profile Management & Employee Registry ---
  getDeletedUserEmails() {
    try {
      const stored = localStorage.getItem('dayflow_deleted_user_emails');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveDeletedUserEmails(list) {
    localStorage.setItem('dayflow_deleted_user_emails', JSON.stringify(list || []));
  }

  getAllRegisteredUsers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      const list = stored ? JSON.parse(stored) : [];
      const deletedEmails = this.getDeletedUserEmails();
      return list.filter(u => !deletedEmails.includes((u.email || '').toLowerCase().trim()));
    } catch (e) {
      return [];
    }
  }

  saveRegisteredUsers(list) {
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(list || []));
    this.dispatchUpdate('users_updated', list);
  }

  getAllUsers() {
    const registered = this.getAllRegisteredUsers();
    const deletedEmails = this.getDeletedUserEmails();
    const map = new Map();
    // 1. Add predefined users if not deleted
    PREDEFINED_USERS.forEach(u => {
      const email = (u.email || '').toLowerCase().trim();
      if (!deletedEmails.includes(email)) {
        map.set(email, u);
      }
    });
    // 2. Add registered users
    registered.forEach(u => {
      const email = (u.email || '').toLowerCase().trim();
      if (!deletedEmails.includes(email)) {
        map.set(email, u);
      }
    });
    return Array.from(map.values());
  }

  deleteAccount(userEmail) {
    if (!userEmail) return false;
    const email = userEmail.toLowerCase().trim();

    // 1. Add to deleted list
    const deleted = this.getDeletedUserEmails();
    if (!deleted.includes(email)) {
      deleted.push(email);
      this.saveDeletedUserEmails(deleted);
    }

    // 2. Remove from registered list
    const registered = this.getAllRegisteredUsers().filter(u => (u.email || '').toLowerCase().trim() !== email);
    this.saveRegisteredUsers(registered);

    // 3. Remove from Firestore
    if (window.DayFlowFirebase && window.DayFlowFirebase.deleteUserProfile) {
      window.DayFlowFirebase.deleteUserProfile(email);
    }

    // 4. Remove tasks and leaves associated with this email
    const currentTasks = this.getTasks().filter(t => (t.userEmail || '').toLowerCase().trim() !== email);
    this.saveTasks(currentTasks);

    const currentUser = this.getUser();
    const isSelfDelete = (currentUser.email || '').toLowerCase().trim() === email;

    this.dispatchUpdate('users_updated', this.getAllUsers());
    this.dispatchUpdate('user_deleted', { email, isSelfDelete });

    if (isSelfDelete) {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/pages/login.html?deleted=true';
    } else {
      this.toast('Account Removed', `Account for "${email}" was deleted from DayFlow and Firestore.`, 'info');
    }

    return true;
  }

  deleteMyAccount() {
    const user = this.getUser();
    if (user && user.email) {
      return this.deleteAccount(user.email);
    }
    return false;
  }

  registerEmployee(data, autoLogin = false) {
    if (!data.name || !data.email) {
      throw new Error("Employee name and email are required");
    }

    const email = data.email.toLowerCase().trim();
    const allUsers = this.getAllUsers();
    const existing = allUsers.find(u => u.email.toLowerCase() === email);
    if (existing) {
      throw new Error(`An account with email "${email}" already exists in the DayFlow directory.`);
    }

    const empId = data.employeeId || (`EMP-${Math.floor(10000 + Math.random() * 90000)}`);
    const annualCTC = parseFloat(data.annualCTC) || (parseFloat(data.monthlyGross) * 12) || 115000;
    const salary = createSalaryRecord(
      annualCTC,
      data.bankName || "Silicon Valley Bank / JPMorgan",
      data.accountNumber || ("•••• •••• " + Math.floor(1000 + Math.random() * 9000)),
      data.panId || ("DF-TAX-" + Math.floor(10000 + Math.random() * 90000))
    );

    const newEmployee = {
      name: data.name.trim(),
      email: email,
      aliasEmail: email,
      employeeId: empId,
      role: data.role || "Software Specialist",
      roleType: "employee",
      isHR: false,
      department: data.department || "Product Experience & Engineering",
      company: "DayFlow Enterprise Inc.",
      manager: data.manager || "Sarah Chen (VP of Product)",
      managerRole: "VP of Product Engineering",
      managerEmail: "sarah.chen@dayflow.corp",
      hrPartner: "Jessica Taylor (HR-001)",
      joiningDate: data.joiningDate || new Date().toISOString().split('T')[0],
      employmentType: data.employmentType || "Full-time / Permanent",
      grade: data.grade || "L4 Professional",
      workLocation: data.workLocation || "San Francisco HQ - Hub 4 (Hybrid)",
      shift: data.shift || "General Shift (09:00 AM - 06:00 PM PST)",
      location: data.location || "San Francisco, CA",
      phone: data.phone || "+1 (555) 019-" + Math.floor(1000 + Math.random() * 9000),
      emergencyContact: data.emergencyContact || "Family Contact (+1 555-019-9988)",
      costCenter: data.costCenter || ("CC-ENG-" + Math.floor(100 + Math.random() * 900)),
      dailyGoal: 5,
      streak: 1,
      bestStreak: 1,
      weekStart: "monday",
      soundEnabled: true,
      attendanceScore: "100%",
      skills: data.skills || ["Productivity", "Collaboration", "Problem Solving", "DayFlow Operations"],
      salary: salary,
      password: data.password || "password123",
      notifications: {
        taskReminders: true,
        deadlineAlerts: true,
        dailySummary: true,
        leaveUpdates: true,
        shiftAlerts: true
      }
    };

    const registered = this.getAllRegisteredUsers();
    registered.push(newEmployee);
    this.saveRegisteredUsers(registered);

    // Sync to Firestore
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveUserProfile) {
      window.DayFlowFirebase.saveUserProfile(newEmployee);
    }

    // Create an initial welcome task for the new employee
    this.createInitialTasksForUser(newEmployee);

    if (autoLogin) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      this.saveUser(newEmployee);
    }

    return newEmployee;
  }

  createInitialTasksForUser(user) {
    const todayStr = new Date().toISOString().split('T')[0];
    const initialTasks = [
      {
        id: 'task-onboard-' + Date.now(),
        title: `Welcome to DayFlow! Complete profile setup for ${user.name}`,
        description: 'Review company handbook, check salary details & payslips, and configure working preferences.',
        category: 'Work',
        priority: 'High',
        status: 'pending',
        dueDate: todayStr,
        dueTime: '17:00',
        estimatedMinutes: 30,
        completedAt: null,
        userEmail: user.email
      },
      {
        id: 'task-onboard-2-' + Date.now(),
        title: 'Review August Compensation & Benefit Statement',
        description: 'Check your direct deposit bank account details and download your official welcome payslip.',
        category: 'Finance',
        priority: 'Medium',
        status: 'pending',
        dueDate: todayStr,
        dueTime: '18:00',
        estimatedMinutes: 15,
        completedAt: null,
        userEmail: user.email
      }
    ];

    const currentTasks = this.getTasks();
    this.saveTasks([...initialTasks, ...currentTasks]);
  }

  getUser() {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
      return { ...DEFAULT_USER };
    }
    try {
      const parsed = JSON.parse(stored);
      // Double check single HR constraint: only Jessica Taylor/hr@dayflow.corp can be HR
      if (parsed.email === 'hr@dayflow.corp' || parsed.email === 'jessica.taylor@dayflow.corp') {
        parsed.isHR = true;
        parsed.roleType = 'hr';
      } else {
        parsed.isHR = false;
        parsed.roleType = 'employee';
      }
      // Ensure salary object exists
      if (!parsed.salary) {
        parsed.salary = createSalaryRecord(126000, "Silicon Valley Bank (SVB)", "•••• •••• 8409", "DF-EMP-84092-X");
      }
      return parsed;
    } catch (e) {
      return { ...DEFAULT_USER };
    }
  }

  saveUser(userData) {
    // If attempting to save as HR with non-HR email, strip HR flags
    const normalizedEmail = (userData.email || '').toLowerCase().trim();
    if (normalizedEmail === 'hr@dayflow.corp' || normalizedEmail === 'jessica.taylor@dayflow.corp') {
      userData.isHR = true;
      userData.roleType = 'hr';
    } else {
      userData.isHR = false;
      userData.roleType = 'employee';
    }

    if (!userData.salary) {
      userData.salary = createSalaryRecord(126000, "Silicon Valley Bank (SVB)", "•••• •••• 8409", "DF-EMP-84092-X");
    }

    this.currentUser = { ...this.currentUser, ...userData };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveUserProfile) {
      window.DayFlowFirebase.saveUserProfile(this.currentUser);
    }
    this.updateUserUI();
    this.dispatchUpdate('user_updated', this.currentUser);
  }

  // --- Salary & Compensation Engine ---
  getEmployeeSalary(userEmailOrId = null) {
    let user = this.getUser();
    if (userEmailOrId) {
      const all = this.getAllUsers();
      const match = all.find(u => 
        u.email.toLowerCase() === userEmailOrId.toLowerCase() || 
        u.employeeId === userEmailOrId
      );
      if (match) user = match;
    }
    if (!user.salary) {
      user.salary = createSalaryRecord(126000, "Silicon Valley Bank (SVB)", "•••• •••• 8409", "DF-EMP-84092-X");
    }
    return user.salary;
  }

  updateEmployeeSalary(employeeId, annualCTC, bankName, accountNumber) {
    const allRegistered = this.getAllRegisteredUsers();
    let updatedUser = null;

    // Check in registered users
    const regIndex = allRegistered.findIndex(u => u.employeeId === employeeId || u.email === employeeId);
    if (regIndex !== -1) {
      const u = allRegistered[regIndex];
      u.salary = createSalaryRecord(
        annualCTC || u.salary.annualCTC,
        bankName || u.salary.bankName,
        accountNumber || u.salary.accountNumber,
        u.salary.panOrSSN
      );
      allRegistered[regIndex] = u;
      this.saveRegisteredUsers(allRegistered);
      updatedUser = u;
    }

    // Also check current active user
    const currentUser = this.getUser();
    if (currentUser.employeeId === employeeId || currentUser.email === employeeId) {
      currentUser.salary = createSalaryRecord(
        annualCTC || currentUser.salary.annualCTC,
        bankName || currentUser.salary.bankName,
        accountNumber || currentUser.salary.accountNumber,
        currentUser.salary.panOrSSN
      );
      this.saveUser(currentUser);
      updatedUser = currentUser;
    }

    this.dispatchUpdate('salary_updated', { employeeId, user: updatedUser });
    this.toast('Salary Updated', `Compensation record for ${employeeId} updated successfully.`, 'success');
    return updatedUser;
  }

  // --- All Employee Records for HR Directory ---
  getAllEmployeeRecords() {
    const users = this.getAllUsers();
    const tasks = this.getTasks();
    const leaves = this.getLeaves();

    return users.map(user => {
      const isHR = user.isHR || user.roleType === 'hr' || user.email === 'hr@dayflow.corp';
      const userTasks = tasks.filter(t => t.userEmail === user.email || !t.userEmail);
      const completedTasks = userTasks.filter(t => t.status === 'completed').length;
      const pendingTasks = userTasks.filter(t => t.status === 'pending').length;
      const userLeaves = leaves.filter(l => l.userEmail === user.email || l.userName === user.name);

      const salary = user.salary || createSalaryRecord(isHR ? 168000 : 126000);

      return {
        ...user,
        salary,
        stats: {
          totalTasks: userTasks.length,
          completedTasks,
          pendingTasks,
          leavesTaken: userLeaves.filter(l => l.status === 'approved').reduce((sum, l) => sum + (l.days || 1), 0),
          pendingLeaves: userLeaves.filter(l => l.status === 'pending').length,
          attendanceScore: user.attendanceScore || '98.5%',
          streak: user.streak || 7
        }
      };
    });
  }

  // --- Official Payslip HTML Formatter ---
  generatePayslipHTML(payslipMonth = "August 2026", targetUser = null) {
    const user = targetUser || this.getUser();
    const salary = user.salary || createSalaryRecord(user.isHR ? 168000 : 126000);
    const slip = (salary.payslips && salary.payslips.find(s => s.month === payslipMonth)) || (salary.payslips && salary.payslips[0]) || {
      month: payslipMonth,
      period: "01 " + payslipMonth + " - End of Month",
      paidOn: "01 " + payslipMonth,
      transactionId: "TXN-DF-" + Math.floor(100000 + Math.random() * 900000),
      gross: salary.monthlyGross,
      deductions: salary.deductions.total,
      net: salary.netSalary,
      status: "Paid",
      workingDays: 31,
      lopDays: 0
    };

    const b = salary.breakdown;
    const d = salary.deductions;

    // Helper: Number to Words (Simple English)
    const netFormatted = Number(slip.net).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return `
      <div class="payslip-document-wrapper" style="background: #FFFFFF; color: #0F172A; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; padding: 2rem; border-radius: 12px; border: 1px solid #E2E8F0; max-width: 780px; margin: 0 auto; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08);">
        <!-- Company Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #4F46E5; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.35rem;">
              <div style="width: 32px; height: 32px; border-radius: 8px; background: #4F46E5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">DF</div>
              <h2 style="font-size: 1.375rem; font-weight: 800; margin: 0; color: #1E1B4B; letter-spacing: -0.02em;">DayFlow Enterprise Inc.</h2>
            </div>
            <div style="font-size: 0.75rem; color: #64748B; line-height: 1.4;">
              500 Howard Street, Suite 1400 • San Francisco, CA 94105<br/>
              EIN / Tax ID: 94-8291048 • www.dayflow.corp
            </div>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background: #EEF2FF; color: #4F46E5; font-size: 0.75rem; font-weight: 800; padding: 0.35rem 0.75rem; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #C7D2FE;">Official Payslip</span>
            <div style="font-size: 1.125rem; font-weight: 800; color: #0F172A; margin-top: 0.5rem;">${slip.month}</div>
            <div style="font-size: 0.75rem; color: #64748B;">Pay Period: ${slip.period}</div>
          </div>
        </div>

        <!-- Employee & Payout Metadata Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.8125rem;">
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            <div><span style="color: #64748B; font-size: 0.75rem;">Employee Name:</span> <strong style="color: #0F172A;">${user.name}</strong></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Employee ID:</span> <strong style="color: #4F46E5;">${user.employeeId}</strong></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Designation:</span> <span style="font-weight: 600;">${user.role}</span></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Department:</span> <span style="font-weight: 600;">${user.department}</span></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Date of Joining:</span> <span style="font-weight: 600;">${user.joiningDate || '2022-03-15'}</span></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.4rem;">
            <div><span style="color: #64748B; font-size: 0.75rem;">Bank Name:</span> <strong style="color: #0F172A;">${salary.bankName}</strong></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Account Number:</span> <span style="font-family: monospace; font-weight: 700;">${salary.accountNumber}</span></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">PAN / SSN ID:</span> <span style="font-family: monospace; font-weight: 600;">${salary.panOrSSN}</span></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Paid Days / LOP:</span> <span style="font-weight: 700; color: #10B981;">${slip.workingDays || 31} Days (0 LOP)</span></div>
            <div><span style="color: #64748B; font-size: 0.75rem;">Payment Ref / Txn:</span> <span style="font-family: monospace; font-size: 0.75rem;">${slip.transactionId}</span></div>
          </div>
        </div>

        <!-- Earnings & Deductions Tables -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem;">
          <!-- Left: Earnings -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
            <div style="background: #EEF2FF; padding: 0.625rem 0.875rem; font-size: 0.8125rem; font-weight: 800; color: #4338CA; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
              <span>Earnings</span>
              <span>Amount (USD)</span>
            </div>
            <div style="padding: 0.5rem 0.875rem; font-size: 0.8125rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed #F1F5F9;">
                <span style="color: #475569;">Basic Salary</span>
                <span style="font-weight: 600;">$${Number(b.basic).toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed #F1F5F9;">
                <span style="color: #475569;">House Rent Allowance (HRA)</span>
                <span style="font-weight: 600;">$${Number(b.hra).toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed #F1F5F9;">
                <span style="color: #475569;">Special Allowance</span>
                <span style="font-weight: 600;">$${Number(b.specialAllowance).toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0;">
                <span style="color: #475569;">Performance Bonus / Incentive</span>
                <span style="font-weight: 600;">$${Number(b.performanceBonus).toLocaleString()}</span>
              </div>
            </div>
            <div style="background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 0.625rem 0.875rem; font-size: 0.875rem; font-weight: 800; display: flex; justify-content: space-between; color: #0F172A;">
              <span>Total Gross Earnings</span>
              <span style="color: #4F46E5;">$${Number(salary.monthlyGross).toLocaleString()}</span>
            </div>
          </div>

          <!-- Right: Deductions -->
          <div style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
            <div style="background: #FEF2F2; padding: 0.625rem 0.875rem; font-size: 0.8125rem; font-weight: 800; color: #B91C1C; text-transform: uppercase; letter-spacing: 0.05em; display: flex; justify-content: space-between;">
              <span>Deductions</span>
              <span>Amount (USD)</span>
            </div>
            <div style="padding: 0.5rem 0.875rem; font-size: 0.8125rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed #F1F5F9;">
                <span style="color: #475569;">Income Tax (TDS)</span>
                <span style="font-weight: 600;">$${Number(d.incomeTax).toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed #F1F5F9;">
                <span style="color: #475569;">Provident Fund (401k / PF)</span>
                <span style="font-weight: 600;">$${Number(d.providentFund).toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px dashed #F1F5F9;">
                <span style="color: #475569;">Professional Tax</span>
                <span style="font-weight: 600;">$${Number(d.professionalTax).toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0;">
                <span style="color: #475569;">Group Health Insurance</span>
                <span style="font-weight: 600;">$${Number(d.healthInsurance).toLocaleString()}</span>
              </div>
            </div>
            <div style="background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 0.625rem 0.875rem; font-size: 0.875rem; font-weight: 800; display: flex; justify-content: space-between; color: #0F172A;">
              <span>Total Deductions</span>
              <span style="color: #EF4444;">$${Number(d.total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Net Take Home Pay Banner -->
        <div style="background: linear-gradient(135deg, #4F46E5, #3730A3); color: #FFFFFF; border-radius: 8px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: #C7D2FE;">Net Take-Home Pay (Transferred via Direct Deposit)</div>
            <div style="font-size: 0.8125rem; color: #E0E7FF; margin-top: 0.25rem;">Direct deposit executed on <strong>${slip.paidOn}</strong></div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em;">$${netFormatted}</div>
            <div style="font-size: 0.6875rem; color: #C7D2FE;">USD (United States Dollar)</div>
          </div>
        </div>

        <!-- Signatures & Authority Stamp -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 1rem; border-top: 1px solid #E2E8F0; font-size: 0.75rem; color: #64748B;">
          <div>
            <div style="font-style: italic; color: #94A3B8; margin-bottom: 0.25rem;">This is a computer-generated official document. No physical stamp required.</div>
            <div>Generated by DayFlow HRMS Enterprise Engine • Authenticated ID: <strong>DF-AUTH-${Date.now()}</strong></div>
          </div>
          <div style="text-align: center;">
            <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.5rem; color: #4338CA; line-height: 1; margin-bottom: 0.25rem;">Jessica Taylor</div>
            <div style="font-weight: 700; color: #0F172A;">Jessica Taylor</div>
            <div style="font-size: 0.6875rem; color: #64748B;">Head of People Operations & HR Director</div>
          </div>
        </div>
      </div>
    `;
  }

  // --- Download Official Salary Slip as Standalone HTML File ---
  downloadPayslip(payslipMonth = "August 2026", targetUserIdOrEmail = null) {
    const all = this.getAllUsers();
    let targetUser = this.getUser();
    if (targetUserIdOrEmail) {
      const match = all.find(u => u.employeeId === targetUserIdOrEmail || u.email === targetUserIdOrEmail);
      if (match) targetUser = match;
    }

    const payslipHTML = this.generatePayslipHTML(payslipMonth, targetUser);

    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DayFlow Payslip - ${targetUser.name} (${payslipMonth})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #F8FAFC;
      margin: 0;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      .payslip-document-wrapper {
        box-shadow: none !important;
        border: none !important;
      }
    }
  </style>
</head>
<body>
  <div style="width: 100%; max-width: 800px;">
    <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <a href="javascript:window.history.back()" style="font-size: 0.875rem; color: #4F46E5; text-decoration: none; font-weight: 600;">← Back to DayFlow</a>
      <button onclick="window.print()" style="background: #4F46E5; color: #FFF; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-weight: 600; cursor: pointer; font-family: inherit;">🖨️ Print / Save as PDF</button>
    </div>
    ${payslipHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([fullDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanName = (targetUser.name || 'Employee').replace(/\s+/g, '_');
    const cleanMonth = (payslipMonth || 'August_2026').replace(/\s+/g, '_');
    a.download = `DayFlow_SalarySlip_${cleanName}_${cleanMonth}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.toast('Payslip Downloaded', `Salary slip for ${payslipMonth} saved to your device.`, 'success');
  }

  // --- Open Payslip Preview Modal ---
  openPayslipModal(payslipMonth = "August 2026", targetUserIdOrEmail = null) {
    let targetUser = this.getUser();
    if (targetUserIdOrEmail) {
      const all = this.getAllUsers();
      const match = all.find(u => u.employeeId === targetUserIdOrEmail || u.email === targetUserIdOrEmail);
      if (match) targetUser = match;
    }

    let modal = document.getElementById('payslipViewModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-backdrop';
      modal.id = 'payslipViewModal';
      modal.innerHTML = `
        <div class="modal-card" style="max-width: 820px; max-height: 90vh; overflow-y: auto;">
          <div class="modal-header" style="position: sticky; top: 0; background: var(--bg-surface); z-index: 10; border-bottom: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: rgba(79, 70, 229, 0.12); color: var(--primary); display: flex; align-items: center; justify-content: center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
              </div>
              <div>
                <h3 class="modal-title" style="margin: 0; font-size: 1.125rem;">Enterprise Salary Statement & Payslip</h3>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin: 0;" id="payslipModalSubtitle">Official Payroll Authorization</p>
              </div>
            </div>
            <button class="modal-close-btn" data-close-modal="payslipViewModal" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body" id="payslipModalContent" style="padding: 1.5rem; background: var(--bg-subtle);"></div>
          <div class="modal-footer" style="position: sticky; bottom: 0; background: var(--bg-surface); z-index: 10; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <button type="button" class="btn btn-secondary btn-sm" data-close-modal="payslipViewModal">Close</button>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-outline btn-sm" id="btnPayslipModalPrint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                <span>Print Payslip / PDF</span>
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="btnPayslipModalDownload">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download Slip File</span>
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const contentEl = document.getElementById('payslipModalContent');
    const subtitleEl = document.getElementById('payslipModalSubtitle');
    if (contentEl) contentEl.innerHTML = this.generatePayslipHTML(payslipMonth, targetUser);
    if (subtitleEl) subtitleEl.textContent = `${targetUser.name} (${targetUser.employeeId}) • ${payslipMonth}`;

    const printBtn = document.getElementById('btnPayslipModalPrint');
    const downloadBtn = document.getElementById('btnPayslipModalDownload');

    if (printBtn) {
      printBtn.onclick = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Payslip - ${targetUser.name} - ${payslipMonth}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
                <style>
                  body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 20px; }
                  @media print { body { padding: 0; } }
                </style>
              </head>
              <body>
                ${this.generatePayslipHTML(payslipMonth, targetUser)}
                <script>window.onload = function() { window.print(); window.close(); }<\/script>
              </body>
            </html>
          `);
          printWindow.document.close();
        } else {
          window.print();
        }
      };
    }

    if (downloadBtn) {
      downloadBtn.onclick = () => {
        this.downloadPayslip(payslipMonth, targetUser.employeeId || targetUser.email);
      };
    }

    this.openModal('payslipViewModal');
  }

  updateUserUI() {
    const user = this.getUser();
    const isHR = this.isCurrentUserHR();
    
    // Update name elements
    document.querySelectorAll('.user-name-display').forEach(el => {
      el.textContent = user.name || (isHR ? 'Jessica Taylor' : 'Alex Morgan');
    });

    // Update email elements
    document.querySelectorAll('.user-email-display').forEach(el => {
      el.textContent = user.email || (isHR ? 'hr@dayflow.corp' : 'alex.morgan@dayflow.corp');
    });

    // Update role elements
    document.querySelectorAll('.user-role-display').forEach(el => {
      el.textContent = user.role || (isHR ? 'Head of People Operations & HR Director' : 'Staff Product Designer & Lead');
    });

    // Update employee ID elements
    document.querySelectorAll('.user-empid-display').forEach(el => {
      el.textContent = user.employeeId || (isHR ? 'HR-001' : 'EMP-84092');
    });

    // Update department elements
    document.querySelectorAll('.user-dept-display').forEach(el => {
      el.textContent = user.department || (isHR ? 'People Operations & Human Resources' : 'Product Experience & Design Systems');
    });

    // Update manager elements
    document.querySelectorAll('.user-manager-display').forEach(el => {
      el.textContent = user.manager || (isHR ? 'Chief Executive Officer (CEO)' : 'Sarah Chen');
    });

    // Update HR Partner elements
    document.querySelectorAll('.user-hrpartner-display').forEach(el => {
      el.textContent = user.hrPartner || 'Jessica Taylor (HR-001)';
    });

    // Update avatar initials
    const initials = (user.name || (isHR ? 'Jessica Taylor' : 'Alex Morgan'))
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    document.querySelectorAll('.user-avatar-initials').forEach(el => {
      el.textContent = initials;
    });

    // Update streak badges
    document.querySelectorAll('.user-streak-count').forEach(el => {
      el.textContent = `${user.streak || 7} day streak`;
    });

    // Update HR role badge across headers / navbars
    document.querySelectorAll('.user-role-badge-tag').forEach(el => {
      if (isHR) {
        el.innerHTML = `<span class="badge" style="background: linear-gradient(135deg, #7C3AED, #4F46E5); color: #fff; font-weight: 700; border-radius: var(--radius-pill); padding: 0.2rem 0.6rem; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 0.25rem;">👑 HR Director</span>`;
      } else {
        el.innerHTML = `<span class="badge badge-primary" style="font-weight: 600; font-size: 0.75rem;">Employee</span>`;
      }
    });

    // Toggle HR-specific visibility blocks
    document.querySelectorAll('.hr-only-view').forEach(el => {
      el.style.display = isHR ? 'block' : 'none';
    });

    document.querySelectorAll('.employee-only-view').forEach(el => {
      el.style.display = isHR ? 'none' : 'block';
    });
  }

  // --- Theme Management ---
  initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    this.setTheme(savedTheme, false);
  }

  setTheme(theme, save = true) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (save) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }
    this.updateThemeToggleButtons(theme);
    this.dispatchUpdate('theme_changed', theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next, true);
    this.toast(
      'Theme Updated',
      `Switched to ${next === 'dark' ? 'Dark' : 'Light'} mode`,
      'info'
    );
  }

  updateThemeToggleButtons(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
      btn.innerHTML = isDark 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    });
  }

  // --- Task Data Store & Synchronization ---
  async loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (stored) {
      try {
        this.tasks = JSON.parse(stored);
        return this.tasks;
      } catch (e) {
        console.error('Error parsing stored tasks', e);
      }
    }

    // Fallback to fetch default sample data
    try {
      const res = await fetch('/data/tasks.json');
      if (res.ok) {
        this.tasks = await res.json();
        this.saveTasks(this.tasks);
        return this.tasks;
      }
    } catch (e) {
      console.warn('Unable to fetch /data/tasks.json, using fallback sample');
    }

    // Built-in fail-safe initial dataset
    const today = new Date().toISOString().split('T')[0];
    this.tasks = [
      {
        id: "task-1",
        title: "Design DayFlow UI Design System & Component Library",
        description: "Finalize typography, color tokens, button states, modal dialogues, and responsive grid layouts.",
        category: "Work",
        priority: "Urgent",
        status: "completed",
        dueDate: today,
        dueTime: "11:30",
        estimatedMinutes: 90,
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      },
      {
        id: "task-2",
        title: "Complete Interactive Prototype & Micro-interactions",
        description: "Implement Pomodoro focus mode, real-time productivity score calculation, and toast notification engine.",
        category: "Work",
        priority: "High",
        status: "pending",
        dueDate: today,
        dueTime: "17:00",
        estimatedMinutes: 120,
        createdAt: new Date().toISOString()
      },
      {
        id: "task-3",
        title: "Prepare Final Slides for Project Review",
        description: "Structure problem statement, architecture diagrams, user journey maps, and live demo highlights.",
        category: "Study",
        priority: "High",
        status: "pending",
        dueDate: today,
        dueTime: "19:00",
        estimatedMinutes: 60,
        createdAt: new Date().toISOString()
      }
    ];
    this.saveTasks(this.tasks);
    return this.tasks;
  }

  saveTasks(tasks) {
    this.tasks = tasks;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    this.updateTaskCounters();
    this.dispatchUpdate('tasks_updated', tasks);
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task) {
    const user = this.getUser();
    const newTask = {
      id: 'task-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      userEmail: task.userEmail || user.email || 'alex.morgan@dayflow.corp',
      ...task
    };
    const updated = [newTask, ...this.tasks];
    this.saveTasks(updated);
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveTask) {
      window.DayFlowFirebase.saveTask(newTask);
    }
    this.audio.playClick();
    this.toast('Task Created', `"${newTask.title}" added successfully`, 'success');
    return newTask;
  }

  updateTask(id, updates) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const previousStatus = this.tasks[index].status;
    const updatedTask = { ...this.tasks[index], ...updates };

    if (updates.status === 'completed' && previousStatus !== 'completed') {
      updatedTask.completedAt = new Date().toISOString();
      this.incrementStreak();
      this.audio.playComplete();
      triggerConfetti();
      this.toast('Task Completed! 🎉', `Great job completing "${updatedTask.title}"`, 'success');
    }

    this.tasks[index] = updatedTask;
    this.saveTasks(this.tasks);
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveTask) {
      window.DayFlowFirebase.saveTask(updatedTask);
    }
    return updatedTask;
  }

  deleteTask(id) {
    const task = this.tasks.find(t => t.id === id);
    const updated = this.tasks.filter(t => t.id !== id);
    this.saveTasks(updated);
    if (window.DayFlowFirebase && window.DayFlowFirebase.deleteTask) {
      window.DayFlowFirebase.deleteTask(id);
    }
    if (task) {
      this.toast('Task Deleted', `"${task.title}" was removed`, 'info');
    }
    return true;
  }

  toggleTaskStatus(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    return this.updateTask(id, { status: nextStatus });
  }

  incrementStreak() {
    const user = this.getUser();
    user.streak = (user.streak || 0) + 1;
    if (user.streak > (user.bestStreak || 0)) {
      user.bestStreak = user.streak;
    }
    this.saveUser(user);
  }

  updateTaskCounters() {
    const tasks = this.tasks;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(t => t.dueDate === todayStr);
    const pendingToday = todayTasks.filter(t => t.status === 'pending');

    document.querySelectorAll('.badge-tasks-count').forEach(el => {
      el.textContent = pendingToday.length;
      el.style.display = pendingToday.length > 0 ? 'inline-flex' : 'none';
    });
  }

  // --- Toast Notification Engine ---
  toast(title, message, type = 'info', duration = 3500) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>';
    } else if (type === 'danger' || type === 'error') {
      iconSvg = '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close Notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => toast.remove(), 250);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 250);
      }
    }, duration);
  }

  // --- Leave Management Engine ---
  async loadLeaves() {
    const stored = localStorage.getItem(STORAGE_KEYS.LEAVES);
    if (stored) {
      try {
        this.leavesData = JSON.parse(stored);
        this.updateLeaveCounters();
        return this.leavesData;
      } catch (e) {
        console.error('Error parsing stored leaves data', e);
      }
    }

    try {
      const res = await fetch('/data/leaves.json');
      if (res.ok) {
        this.leavesData = await res.json();
        this.saveLeaves(this.leavesData);
        return this.leavesData;
      }
    } catch (e) {
      console.warn('Unable to fetch /data/leaves.json, using fallback');
    }

    this.leavesData = {
      balances: {
        annual: { name: "Annual Paid Leave", code: "AL", total: 18, used: 6, pending: 1, available: 11, color: "primary" },
        sick: { name: "Sick / Medical Leave", code: "SL", total: 10, used: 2, pending: 0, available: 8, color: "danger" },
        casual: { name: "Casual / Personal Leave", code: "CL", total: 8, used: 3, pending: 0, available: 5, color: "warning" },
        remote: { name: "Remote Work / WFH", code: "WFH", total: 24, used: 14, pending: 2, available: 8, color: "info" },
        compOff: { name: "Compensatory Off", code: "CO", total: 3, used: 1, pending: 0, available: 2, color: "purple" },
        parental: { name: "Parental Leave", code: "PL", total: 60, used: 0, pending: 0, available: 60, color: "teal" },
        unpaid: { name: "Unpaid Leave (LOP)", code: "LOP", total: 0, used: 0, pending: 0, available: 0, color: "muted" }
      },
      requests: [],
      teamOutToday: [],
      upcomingHolidays: []
    };
    this.saveLeaves(this.leavesData);
    return this.leavesData;
  }

  getLeaves() {
    return this.leavesData || {
      balances: {},
      requests: [],
      teamOutToday: [],
      upcomingHolidays: []
    };
  }

  saveLeaves(leavesData) {
    this.leavesData = leavesData;
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(leavesData));
    this.updateLeaveCounters();
    this.dispatchUpdate('leaves_updated', leavesData);
  }

  addLeaveRequest(request) {
    if (!this.leavesData) this.leavesData = this.getLeaves();
    
    const user = this.getUser();
    const typeKey = request.leaveType || 'casual';
    const duration = parseFloat(request.duration) || 1;

    // Check balance if applicable
    if (this.leavesData.balances && this.leavesData.balances[typeKey]) {
      const balance = this.leavesData.balances[typeKey];
      if (typeKey !== 'unpaid' && balance.available < duration) {
        this.toast('Insufficient Leave Balance', `You only have ${balance.available} days of ${balance.name} left.`, 'warning');
      }
      balance.pending = (balance.pending || 0) + duration;
      balance.available = Math.max(0, balance.total - balance.used - balance.pending);
    }

    const newRequest = {
      id: 'LV-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      appliedAt: new Date().toISOString(),
      status: 'pending',
      userEmail: user.email,
      userName: user.name,
      employeeId: user.employeeId,
      manager: user.manager || 'Sarah Chen',
      approverRole: user.managerRole || 'VP of Product Engineering',
      ...request
    };

    this.leavesData.requests = [newRequest, ...(this.leavesData.requests || [])];
    this.saveLeaves(this.leavesData);
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveLeaveRequest) {
      window.DayFlowFirebase.saveLeaveRequest(newRequest);
    }
    this.audio.playClick();
    this.toast('Leave Request Submitted', `Your request for ${duration} day(s) was sent to ${newRequest.manager}.`, 'success');
    return newRequest;
  }

  cancelLeaveRequest(id) {
    if (!this.leavesData || !this.leavesData.requests) return false;
    const req = this.leavesData.requests.find(r => r.id === id);
    if (!req) return false;

    if (req.status === 'pending') {
      const typeKey = req.leaveType;
      const duration = parseFloat(req.duration) || 1;
      if (this.leavesData.balances && this.leavesData.balances[typeKey]) {
        const bal = this.leavesData.balances[typeKey];
        bal.pending = Math.max(0, (bal.pending || 0) - duration);
        bal.available = Math.max(0, bal.total - bal.used - bal.pending);
      }
    } else if (req.status === 'approved') {
      const typeKey = req.leaveType;
      const duration = parseFloat(req.duration) || 1;
      if (this.leavesData.balances && this.leavesData.balances[typeKey]) {
        const bal = this.leavesData.balances[typeKey];
        bal.used = Math.max(0, (bal.used || 0) - duration);
        bal.available = Math.max(0, bal.total - bal.used - (bal.pending || 0));
      }
    }

    req.status = 'cancelled';
    req.cancelledAt = new Date().toISOString();
    this.saveLeaves(this.leavesData);
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveLeaveRequest) {
      window.DayFlowFirebase.saveLeaveRequest(req);
    }
    this.toast('Leave Cancelled', `Leave request ${id} has been withdrawn.`, 'info');
    return true;
  }

  simulateApproveLeave(id) {
    if (!this.leavesData || !this.leavesData.requests) return false;
    const req = this.leavesData.requests.find(r => r.id === id);
    if (!req || req.status !== 'pending') return false;

    const typeKey = req.leaveType;
    const duration = parseFloat(req.duration) || 1;
    if (this.leavesData.balances && this.leavesData.balances[typeKey]) {
      const bal = this.leavesData.balances[typeKey];
      bal.pending = Math.max(0, (bal.pending || 0) - duration);
      bal.used = (bal.used || 0) + duration;
      bal.available = Math.max(0, bal.total - bal.used - bal.pending);
    }

    req.status = 'approved';
    req.approvedAt = new Date().toISOString();
    this.saveLeaves(this.leavesData);
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveLeaveRequest) {
      window.DayFlowFirebase.saveLeaveRequest(req);
    }
    this.audio.playComplete();
    triggerConfetti();
    this.toast('Leave Approved! ✅', `Manager ${req.manager} approved request ${id}.`, 'success');
    return true;
  }

  simulateRejectLeave(id, reason = 'Conflicting project deadlines on scheduled dates') {
    if (!this.leavesData || !this.leavesData.requests) return false;
    const req = this.leavesData.requests.find(r => r.id === id);
    if (!req || req.status !== 'pending') return false;

    const typeKey = req.leaveType;
    const duration = parseFloat(req.duration) || 1;
    if (this.leavesData.balances && this.leavesData.balances[typeKey]) {
      const bal = this.leavesData.balances[typeKey];
      bal.pending = Math.max(0, (bal.pending || 0) - duration);
      bal.available = Math.max(0, bal.total - bal.used - bal.pending);
    }

    req.status = 'rejected';
    req.rejectedAt = new Date().toISOString();
    req.rejectionReason = reason;
    this.saveLeaves(this.leavesData);
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveLeaveRequest) {
      window.DayFlowFirebase.saveLeaveRequest(req);
    }
    this.toast('Leave Rejected', `Request ${id} was rejected by ${req.manager}.`, 'danger');
    return true;
  }

  updateLeaveCounters() {
    if (!this.leavesData) return;
    const pendingCount = (this.leavesData.requests || []).filter(r => r.status === 'pending').length;
    document.querySelectorAll('.badge-leaves-pending').forEach(el => {
      el.textContent = pendingCount;
      el.style.display = pendingCount > 0 ? 'inline-flex' : 'none';
    });

    // Update total available leaves badge
    let totalAvailable = 0;
    if (this.leavesData.balances) {
      Object.values(this.leavesData.balances).forEach(b => {
        if (b.code !== 'LOP' && b.code !== 'WFH') {
          totalAvailable += (b.available || 0);
        }
      });
    }
    document.querySelectorAll('.total-available-leaves-count').forEach(el => {
      el.textContent = totalAvailable;
    });
  }

  // --- Attendance & Shift Clock-In Engine ---
  getAttendance() {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    const defaultAttendance = {
      isPunchedIn: true,
      punchInTime: new Date(Date.now() - 3.5 * 3600 * 1000).toISOString(),
      activeBreak: null,
      todayShift: "09:00 AM - 06:00 PM PST",
      workMode: "HQ Office (Floor 3)",
      monthlyPresentDays: 21,
      monthlyLeaveDays: 2,
      onTimeScore: "98.5%",
      logs: [
        { date: "Today", in: "09:02 AM", out: "--:--", duration: "In Progress", status: "Present" },
        { date: "Yesterday", in: "08:58 AM", out: "06:14 PM", duration: "8h 16m", status: "On-Time" },
        { date: "Aug 19, 2026", in: "09:05 AM", out: "06:05 PM", duration: "8h 00m", status: "On-Time" },
        { date: "Aug 18, 2026", in: "09:12 AM", out: "06:30 PM", duration: "8h 18m", status: "Grace Period" },
        { date: "Aug 17, 2026", in: "08:55 AM", out: "06:10 PM", duration: "8h 15m", status: "On-Time" }
      ]
    };
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(defaultAttendance));
    return defaultAttendance;
  }

  saveAttendance(data) {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(data));
    if (window.DayFlowFirebase && window.DayFlowFirebase.saveAttendance) {
      const user = this.getUser();
      window.DayFlowFirebase.saveAttendance(data, user.email);
    }
    this.dispatchUpdate('attendance_updated', data);
  }

  punchIn() {
    const att = this.getAttendance();
    att.isPunchedIn = true;
    att.punchInTime = new Date().toISOString();
    att.activeBreak = null;
    this.saveAttendance(att);
    this.audio.playComplete();
    this.toast('Punched In Successfully', `Shift started at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Have a productive day!`, 'success');
  }

  punchOut() {
    const att = this.getAttendance();
    att.isPunchedIn = false;
    att.punchOutTime = new Date().toISOString();
    att.activeBreak = null;
    this.saveAttendance(att);
    this.audio.playClick();
    this.toast('Punched Out', 'Shift recorded. Great work today!', 'info');
  }

  toggleBreak(breakType) {
    const att = this.getAttendance();
    if (att.activeBreak === breakType) {
      att.activeBreak = null;
      this.toast('Break Ended', `Resumed working shift`, 'success');
    } else {
      att.activeBreak = breakType;
      this.toast('Break Started', `You are on ${breakType === 'lunch' ? 'Lunch' : 'Short'} Break`, 'info');
    }
    this.saveAttendance(att);
  }

  // --- Company Support & IT Helpdesk Ticketing ---
  getSupportTickets() {
    const stored = localStorage.getItem(STORAGE_KEYS.SUPPORT_TICKETS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    const sample = [
      {
        id: "TCK-4910",
        category: "IT & Hardware",
        title: "Request for Second 4K Monitor & Thunderbolt Dock",
        priority: "Medium",
        status: "In Progress",
        assignedTo: "Marcus Brody (IT Support)",
        createdAt: "2026-08-18T11:20:00.000Z"
      },
      {
        id: "TCK-4822",
        category: "Facilities",
        title: "Desk Ergonomic Chair Adjustment & Lumbar Kit",
        priority: "Low",
        status: "Resolved",
        assignedTo: "Facilities Operations",
        createdAt: "2026-08-10T14:10:00.000Z"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, JSON.stringify(sample));
    return sample;
  }

  submitSupportTicket(ticket) {
    const tickets = this.getSupportTickets();
    const newTicket = {
      id: "TCK-" + Math.floor(5000 + Math.random() * 4000),
      status: "Open",
      assignedTo: ticket.category === 'HR' ? 'People Operations Team' : 'IT Service Desk',
      createdAt: new Date().toISOString(),
      ...ticket
    };
    const updated = [newTicket, ...tickets];
    localStorage.setItem(STORAGE_KEYS.SUPPORT_TICKETS, JSON.stringify(updated));
    this.audio.playClick();
    this.toast('Ticket Raised', `Ticket #${newTicket.id} logged with ${newTicket.assignedTo}.`, 'success');
    return newTicket;
  }

  // --- Modal Helpers ---
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- Custom Event Dispatcher ---
  dispatchUpdate(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
}

// Global Singleton Instance
const DayFlow = new DayFlowApp();

// --- Simple Confetti Particle Engine ---
function triggerConfetti() {
  let canvas = document.getElementById('confettiCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#4F46E5', '#7C3AED', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 300,
      y: canvas.height / 2 + (Math.random() - 0.5) * 150,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -15 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      alpha: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.rotation += p.rotSpeed;
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  update();
}

// --- Global DOM Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  // Enforce auth routing
  DayFlow.requireAuth();

  // Load initial tasks & leaves
  await DayFlow.loadTasks();
  await DayFlow.loadLeaves();
  DayFlow.updateUserUI();

  // Bind Theme Toggle Buttons
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => DayFlow.toggleTheme());
  });

  // Mobile Sidebar Drawer toggles
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('appSidebar');
  let backdrop = document.getElementById('sidebarBackdrop');

  if (mobileMenuBtn && sidebar) {
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebarBackdrop';
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    const toggleSidebar = () => {
      const isOpen = sidebar.classList.toggle('open');
      backdrop.classList.toggle('active', isOpen);
    };

    mobileMenuBtn.addEventListener('click', toggleSidebar);
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });
  }

  // --- Universal Delegated Event Handlers (Modals & Actions) ---
  document.addEventListener('click', (e) => {
    // 1. Delegated Modal Open Trigger
    const openBtn = e.target.closest('[data-open-modal]');
    if (openBtn) {
      e.preventDefault();
      const modalId = openBtn.getAttribute('data-open-modal');
      if (modalId) {
        if (modalId === 'addTaskModal') {
          const form = document.getElementById('addTaskForm');
          if (form) form.reset();
          const dateInput = document.getElementById('taskDueDate');
          if (dateInput && !dateInput.value) {
            dateInput.value = new Date().toISOString().split('T')[0];
          }
        }
        DayFlow.openModal(modalId);
      }
      return;
    }

    // 2. Delegated Modal Close Trigger
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn) {
      e.preventDefault();
      const targetId = closeBtn.getAttribute('data-close-modal');
      if (targetId && targetId !== 'true' && targetId !== '') {
        DayFlow.closeModal(targetId);
      } else {
        const modal = closeBtn.closest('.modal-backdrop');
        if (modal) DayFlow.closeModal(modal.id);
      }
      return;
    }

    // 3. Delegated Backdrop Area Click Close
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
      DayFlow.closeModal(e.target.id);
      return;
    }

    // 4. Delegated Logout Action
    const logoutBtn = e.target.closest('.logout-btn');
    if (logoutBtn) {
      e.preventDefault();
      DayFlow.logout();
      return;
    }
  });

  // Ensure universal Switch User Modal is ready on all pages
  DayFlow.ensureSwitchUserModal();

  // Global Add Task Form handler for pages without dedicated task managers (e.g. leaves.html, calendar.html, profile.html)
  const globalAddTaskForm = document.getElementById('addTaskForm');
  if (globalAddTaskForm && !document.getElementById('tasksContainer') && !document.getElementById('pomodoroTimerCard')) {
    globalAddTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('taskTitle');
      const descInput = document.getElementById('taskDesc') || document.getElementById('taskDescription');
      const catInput = document.getElementById('taskCategory');
      const priorityInput = document.getElementById('taskPriority');
      const dateInput = document.getElementById('taskDueDate');
      const timeInput = document.getElementById('taskDueTime');
      const durationInput = document.getElementById('taskDuration');

      const title = titleInput ? titleInput.value.trim() : '';
      if (!title) {
        DayFlow.toast('Validation Error', 'Please enter a task title', 'error');
        return;
      }

      DayFlow.addTask({
        title,
        description: descInput ? descInput.value.trim() : '',
        category: catInput ? catInput.value : 'Work',
        priority: priorityInput ? priorityInput.value : 'Medium',
        dueDate: dateInput && dateInput.value ? dateInput.value : new Date().toISOString().split('T')[0],
        dueTime: timeInput && timeInput.value ? timeInput.value : '17:00',
        estimatedMinutes: durationInput ? (parseInt(durationInput.value, 10) || 30) : 30
      });

      globalAddTaskForm.reset();
      DayFlow.closeModal('addTaskModal');
    });
  }

  // Global Search input handler
  const headerSearchInput = document.getElementById('globalSearchInput');
  if (headerSearchInput) {
    headerSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && headerSearchInput.value.trim()) {
        const query = encodeURIComponent(headerSearchInput.value.trim());
        if (!window.location.pathname.includes('tasks.html')) {
          window.location.href = `/pages/tasks.html?search=${query}`;
        }
      }
    });
  }

  // Keyboard Shortcuts Listener
  document.addEventListener('keydown', (e) => {
    // If typing in input, ignore shortcuts unless Escape
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(m => DayFlow.closeModal(m.id));
      }
      return;
    }

    if (e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      const addModal = document.getElementById('addTaskModal');
      if (addModal) DayFlow.openModal('addTaskModal');
    } else if (e.key === 't' || e.key === 'T') {
      DayFlow.toggleTheme();
    } else if (e.key === '?') {
      e.preventDefault();
      DayFlow.toast('Keyboard Shortcuts', 'N: New Task | T: Theme | Space: Timer | /: Search', 'info', 4000);
    }
  });
});
