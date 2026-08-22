/* ==========================================================================
   DAYFLOW LOGIN & EMPLOYEE REGISTRATION CONTROLLER
   Enterprise RBAC: Multi-User Employees & Single Designated HR Partner
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Top Portal Tabs (Sign In vs Register)
  const btnModeSignIn = document.getElementById('btnModeSignIn');
  const btnModeRegister = document.getElementById('btnModeRegister');
  const signInContainer = document.getElementById('signInContainer');
  const registerContainer = document.getElementById('registerContainer');
  const loginMainHeading = document.getElementById('loginMainHeading');
  const loginMainSubheading = document.getElementById('loginMainSubheading');
  const btnSwitchToRegisterLink = document.getElementById('btnSwitchToRegisterLink');

  // Sign In Form Elements
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const submitBtn = document.getElementById('loginSubmitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const emailFeedback = document.getElementById('emailFeedback');
  const passwordFeedback = document.getElementById('passwordFeedback');
  const resolvedRoleBadge = document.getElementById('resolvedRoleBadge');
  const roleNoticeTag = document.getElementById('roleNoticeTag');
  const selectedEmpIdBadge = document.getElementById('selectedEmpIdBadge');
  const roleTabs = document.querySelectorAll('.role-tab');
  const tabEmployee = document.getElementById('tabEmployee');
  const tabHR = document.getElementById('tabHR');
  const hrQuickCard = document.getElementById('hrQuickCard');
  const employeeQuickDirectory = document.getElementById('employeeQuickDirectory');
  const employeeCardsGrid = document.getElementById('employeeCardsGrid');
  const btnQuickLoginHR = document.getElementById('btnQuickLoginHR');
  const fillDemoCredentialsLink = document.getElementById('fillDemoCredentialsLink');

  // New Account Banner Elements
  const newAccountCreatedBanner = document.getElementById('newAccountCreatedBanner');
  const newCreatedEmpName = document.getElementById('newCreatedEmpName');
  const newCreatedEmpIdBadge = document.getElementById('newCreatedEmpIdBadge');
  const newCreatedEmpEmail = document.getElementById('newCreatedEmpEmail');
  const dismissNewAccountBanner = document.getElementById('dismissNewAccountBanner');

  if (dismissNewAccountBanner) {
    dismissNewAccountBanner.addEventListener('click', () => {
      if (newAccountCreatedBanner) newAccountCreatedBanner.style.display = 'none';
    });
  }

  // Registration Form Elements
  const registerForm = document.getElementById('registerForm');
  const regFullName = document.getElementById('regFullName');
  const regEmail = document.getElementById('regEmail');
  const regRole = document.getElementById('regRole');
  const regDepartment = document.getElementById('regDepartment');
  const regEmpId = document.getElementById('regEmpId');
  const regJoiningDate = document.getElementById('regJoiningDate');
  const regAnnualCTC = document.getElementById('regAnnualCTC');
  const regBankName = document.getElementById('regBankName');
  const regPassword = document.getElementById('regPassword');
  const regConfirmPassword = document.getElementById('regConfirmPassword');
  const regFeedback = document.getElementById('regFeedback');
  const btnSubmitRegister = document.getElementById('btnSubmitRegister');
  const regSalaryPreview = document.getElementById('regSalaryPreview');

  // Check if already authenticated
  if (DayFlow.isAuthenticated()) {
    window.location.href = '/pages/dashboard.html';
    return;
  }

  // Pre-fill generated ID and today's date for registration
  if (regEmpId) {
    regEmpId.value = 'EMP-' + Math.floor(80000 + Math.random() * 19999);
  }
  if (regJoiningDate) {
    const today = new Date().toISOString().split('T')[0];
    regJoiningDate.value = today;
  }

  // Live Compensation preview calculation
  if (regAnnualCTC && regSalaryPreview) {
    const updatePreview = () => {
      const ctc = parseFloat(regAnnualCTC.value) || 0;
      const gross = Math.round(ctc / 12);
      const tax = Math.round(gross * 0.12);
      const pf = Math.round(gross * 0.05);
      const insurance = 250;
      const net = Math.max(0, gross - (tax + pf + insurance));
      regSalaryPreview.innerHTML = `
        <div>Monthly Gross: <strong style="color: var(--primary);">$${gross.toLocaleString()}</strong></div>
        <div>Est. Net Take-Home: <strong style="color: var(--success);">$${net.toLocaleString()} / mo</strong></div>
      `;
    };
    regAnnualCTC.addEventListener('input', updatePreview);
    updatePreview();
  }

  // Check URL parameters (e.g. ?mode=register or ?deleted=true)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('deleted') === 'true') {
    setTimeout(() => {
      DayFlow.toast('Account Deleted', 'Your DayFlow employee account and cloud records have been permanently removed.', 'info', 6000);
    }, 400);
  }

  if (urlParams.get('mode') === 'register') {
    switchMode('register');
  } else {
    switchMode('signin');
  }

  // Portal Mode Switcher
  function switchMode(mode) {
    if (mode === 'register') {
      btnModeRegister?.classList.add('active');
      btnModeRegister?.style.setProperty('background', 'var(--bg-surface)');
      btnModeRegister?.style.setProperty('color', 'var(--primary)');
      btnModeRegister?.style.setProperty('box-shadow', 'var(--shadow-xs)');

      btnModeSignIn?.classList.remove('active');
      btnModeSignIn?.style.setProperty('background', 'transparent');
      btnModeSignIn?.style.setProperty('color', 'var(--text-muted)');
      btnModeSignIn?.style.setProperty('box-shadow', 'none');

      if (signInContainer) signInContainer.style.display = 'none';
      if (registerContainer) registerContainer.style.display = 'block';

      if (loginMainHeading) loginMainHeading.textContent = 'Add Employee Account';
      if (loginMainSubheading) loginMainSubheading.textContent = 'Enter employee details, job designation and compensation to provision their account.';
      if (resolvedRoleBadge) {
        resolvedRoleBadge.textContent = 'Employee Onboarding';
        resolvedRoleBadge.className = 'badge badge-primary';
        resolvedRoleBadge.style.background = '';
        resolvedRoleBadge.style.color = '';
      }
    } else {
      btnModeSignIn?.classList.add('active');
      btnModeSignIn?.style.setProperty('background', 'var(--bg-surface)');
      btnModeSignIn?.style.setProperty('color', 'var(--primary)');
      btnModeSignIn?.style.setProperty('box-shadow', 'var(--shadow-xs)');

      btnModeRegister?.classList.remove('active');
      btnModeRegister?.style.setProperty('background', 'transparent');
      btnModeRegister?.style.setProperty('color', 'var(--text-muted)');
      btnModeRegister?.style.setProperty('box-shadow', 'none');

      if (signInContainer) signInContainer.style.display = 'block';
      if (registerContainer) registerContainer.style.display = 'none';

      if (loginMainHeading) loginMainHeading.textContent = 'Sign in to DayFlow';
      if (loginMainSubheading) loginMainSubheading.textContent = 'Choose your account type below or enter your enterprise credentials.';
      updateRoleIndicator(emailInput?.value || 'alex.morgan@dayflow.corp');
    }
  }

  if (btnModeSignIn) btnModeSignIn.addEventListener('click', () => switchMode('signin'));
  if (btnModeRegister) btnModeRegister.addEventListener('click', () => switchMode('register'));
  if (btnSwitchToRegisterLink) btnSwitchToRegisterLink.addEventListener('click', () => switchMode('register'));

  // Pre-fill remembered email if saved
  const rememberedEmail = localStorage.getItem('dayflow_remembered_email');
  if (rememberedEmail && emailInput) {
    emailInput.value = rememberedEmail;
    const rememberCheckbox = document.getElementById('rememberMeCheckbox');
    if (rememberCheckbox) rememberCheckbox.checked = true;
    updateRoleIndicator(rememberedEmail);
  } else {
    // Default to first employee in input placeholder
    updateRoleIndicator('alex.morgan@dayflow.corp');
  }

  // Render Employee Mini Cards (incorporating both predefined and any registered employees!)
  renderEmployeeCards();

  // Role Tab Switching
  if (roleTabs) {
    roleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        roleTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.dataset.target;
        if (mode === 'hr') {
          if (hrQuickCard) hrQuickCard.style.display = 'block';
          if (employeeQuickDirectory) employeeQuickDirectory.style.display = 'none';
          if (emailInput) {
            emailInput.value = 'hr@dayflow.corp';
            if (passwordInput) passwordInput.value = 'hr123';
            updateRoleIndicator('hr@dayflow.corp');
          }
        } else {
          if (hrQuickCard) hrQuickCard.style.display = 'none';
          if (employeeQuickDirectory) employeeQuickDirectory.style.display = 'block';
          if (emailInput && emailInput.value === 'hr@dayflow.corp') {
            emailInput.value = 'alex.morgan@dayflow.corp';
            if (passwordInput) passwordInput.value = 'alex123';
            updateRoleIndicator('alex.morgan@dayflow.corp');
          }
        }
        clearErrors();
      });
    });
  }

  // Quick 1-Click HR Login Button
  if (btnQuickLoginHR) {
    btnQuickLoginHR.addEventListener('click', () => {
      DayFlow.loginAsHR();
    });
  }

  // Autofill link
  if (fillDemoCredentialsLink) {
    fillDemoCredentialsLink.addEventListener('click', (e) => {
      e.preventDefault();
      const currentEmail = emailInput?.value || '';
      if (isHREmail(currentEmail)) {
        if (passwordInput) passwordInput.value = 'hr123';
        DayFlow.toast('HR Credentials Autofilled', 'Password: hr123', 'info');
      } else {
        if (passwordInput) passwordInput.value = 'alex123';
        DayFlow.toast('Employee Credentials Autofilled', 'Password: alex123', 'info');
      }
    });
  }

  // Toggle Password Visibility
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';
      togglePasswordBtn.innerHTML = isPassword
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  }

  // Live Email input detection for Role Badge
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      updateRoleIndicator(emailInput.value);
    });
  }

  // Form Validation & Submission: Sign In Form
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const email = (emailInput?.value || '').trim();
      const password = (passwordInput?.value || '').trim();
      const rememberMe = document.getElementById('rememberMeCheckbox')?.checked;

      let hasError = false;

      // Email Validation
      if (!email) {
        showError(emailInput, emailFeedback, 'Please enter your enterprise email address');
        hasError = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(emailInput, emailFeedback, 'Please enter a valid email format (e.g., name@dayflow.corp)');
        hasError = true;
      }

      // Password Validation
      if (!password) {
        showError(passwordInput, passwordFeedback, 'Please enter your password');
        hasError = true;
      } else if (password.length < 3) {
        showError(passwordInput, passwordFeedback, 'Password must be at least 3 characters');
        hasError = true;
      }

      if (hasError) return;

      // Set Loading State
      setLoading(true);

      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('dayflow_remembered_email', email);
      } else {
        localStorage.removeItem('dayflow_remembered_email');
      }

      // Perform authentication with Single-HR rule
      setTimeout(() => {
        if (isHREmail(email)) {
          DayFlow.loginAsHR();
        } else {
          DayFlow.loginAsUser(email);
        }
      }, 400);
    });
  }

  // Form Validation & Submission: Add/Register Employee Form
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (regFeedback) {
        regFeedback.style.display = 'none';
        regFeedback.textContent = '';
      }

      const fullName = (regFullName?.value || '').trim();
      const email = (regEmail?.value || '').trim().toLowerCase();
      const role = (regRole?.value || '').trim();
      const department = regDepartment?.value || 'Product Experience & Design Systems';
      const employeeId = (regEmpId?.value || '').trim();
      const joiningDate = regJoiningDate?.value || new Date().toISOString().split('T')[0];
      const annualCTC = parseFloat(regAnnualCTC?.value) || 120000;
      const bankName = (regBankName?.value || '').trim() || 'JPMorgan Chase Bank, N.A.';
      const password = (regPassword?.value || '').trim();
      const confirmPassword = (regConfirmPassword?.value || '').trim();

      if (!fullName) {
        showRegError('Please enter the employee\'s full name');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showRegError('Please provide a valid work email address');
        return;
      }
      if (email === 'hr@dayflow.corp' || email === 'jessica.taylor@dayflow.corp') {
        showRegError('The HR Administrator account is reserved and unique. Please register as an employee.');
        return;
      }
      if (!role) {
        showRegError('Please enter the employee\'s job title / designation');
        return;
      }
      if (annualCTC < 10000) {
        showRegError('Please enter a valid Annual CTC (minimum $10,000)');
        return;
      }
      if (!password || password.length < 3) {
        showRegError('Password must be at least 3 characters');
        return;
      }
      if (password !== confirmPassword) {
        showRegError('Passwords do not match. Please re-enter.');
        return;
      }

      // Check if employee already exists in registered list or predefined
      const allUsers = DayFlow.getAllUsers();
      const existing = allUsers.find(u => u.email.toLowerCase() === email);
      if (existing) {
        showRegError(`An account with email "${email}" is already registered. You can sign in directly.`);
        return;
      }

      if (btnSubmitRegister) {
        btnSubmitRegister.disabled = true;
        btnSubmitRegister.innerHTML = `
          <div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <span>Provisioning Account & Payroll...</span>
        `;
      }

      setTimeout(() => {
        try {
          const newEmp = DayFlow.registerEmployee({
            name: fullName,
            email: email,
            role: role,
            department: department,
            employeeId: employeeId,
            joiningDate: joiningDate,
            annualCTC: annualCTC,
            bankName: bankName
          });

          DayFlow.toast('Employee Registered!', `Welcome ${newEmp.name}. Your account & salary record have been created.`, 'success');
          
          // Auto login as the newly created employee
          DayFlow.loginAsUser(newEmp.email);
        } catch (err) {
          if (btnSubmitRegister) {
            btnSubmitRegister.disabled = false;
            btnSubmitRegister.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
              <span>Register & Enter Employee Dashboard</span>
            `;
          }
          showRegError('Registration failed: ' + err.message);
        }
      }, 600);
    });
  }

  function showRegError(msg) {
    if (regFeedback) {
      regFeedback.textContent = msg;
      regFeedback.style.display = 'flex';
    }
  }

  // --- Helper Functions ---
  function isHREmail(email) {
    const norm = (email || '').toLowerCase().trim();
    return norm === 'hr@dayflow.corp' || norm === 'jessica.taylor@dayflow.corp';
  }

  function updateRoleIndicator(email) {
    const isHR = isHREmail(email);
    const allUsers = DayFlow.getAllUsers();
    const matchedUser = allUsers.find(u => (u.email || '').toLowerCase().trim() === (email || '').toLowerCase().trim());

    if (resolvedRoleBadge) {
      if (isHR) {
        resolvedRoleBadge.className = 'badge';
        resolvedRoleBadge.style.background = 'linear-gradient(135deg, #7C3AED, #4F46E5)';
        resolvedRoleBadge.style.color = '#FFFFFF';
        resolvedRoleBadge.textContent = '👑 Single HR Director';
      } else {
        resolvedRoleBadge.className = 'badge badge-primary';
        resolvedRoleBadge.style.background = '';
        resolvedRoleBadge.style.color = '';
        resolvedRoleBadge.textContent = 'Employee Access';
      }
    }

    if (selectedEmpIdBadge) {
      if (matchedUser && matchedUser.employeeId) {
        selectedEmpIdBadge.style.display = 'inline-block';
        selectedEmpIdBadge.textContent = `ID: ${matchedUser.employeeId}`;
        if (isHR) {
          selectedEmpIdBadge.style.background = 'rgba(124, 58, 237, 0.15)';
          selectedEmpIdBadge.style.color = '#7C3AED';
        } else {
          selectedEmpIdBadge.style.background = 'rgba(79, 70, 229, 0.12)';
          selectedEmpIdBadge.style.color = 'var(--primary)';
        }
      } else {
        selectedEmpIdBadge.style.display = 'none';
      }
    }

    if (roleNoticeTag) {
      roleNoticeTag.textContent = isHR ? 'Single Authorized HR Account' : 'Standard Employee Profile';
      roleNoticeTag.style.color = isHR ? '#7C3AED' : 'var(--primary)';
    }

    if (submitBtnText) {
      submitBtnText.textContent = isHR ? 'Sign In as HR Director' : 'Sign In as Employee';
    }
  }

  function renderEmployeeCards(highlightEmail = null) {
    if (!employeeCardsGrid) return;
    const allUsers = DayFlow.getAllUsers();
    // Filter out the HR user to show regular employees
    const employees = allUsers.filter(u => !u.isHR && u.roleType !== 'hr' && u.email !== 'hr@dayflow.corp');

    employeeCardsGrid.innerHTML = '';
    employees.forEach((emp, index) => {
      const isSelected = highlightEmail 
        ? emp.email.toLowerCase() === highlightEmail.toLowerCase()
        : (emailInput && emailInput.value.toLowerCase() === emp.email.toLowerCase()) || (!emailInput?.value && index === 0);

      const isRegisteredNew = DayFlow.getAllRegisteredUsers().some(r => (r.email || '').toLowerCase() === emp.email.toLowerCase());

      const card = document.createElement('button');
      card.type = 'button';
      card.className = `employee-mini-card ${isSelected ? 'active' : ''} ${isRegisteredNew ? 'is-new-account' : ''}`;
      card.id = `empCard-${emp.employeeId}`;

      const initials = (emp.name || 'EM').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

      card.innerHTML = `
        <div class="employee-mini-avatar">${initials}</div>
        <div class="employee-mini-info">
          <div class="employee-mini-name">
            <span>${emp.name}</span>
            <span class="employee-mini-id">${emp.employeeId || 'EMP-NEW'}</span>
          </div>
          <div class="employee-mini-meta">
            <span>${(emp.role || 'Staff').split('&')[0]}</span>
            ${isRegisteredNew ? '• <span style="color: #10B981; font-weight: 700;">Created</span>' : ''}
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.employee-mini-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (emailInput) {
          emailInput.value = emp.email;
          updateRoleIndicator(emp.email);
        }
        if (passwordInput) {
          passwordInput.value = emp.email.split('@')[0].split('.')[0] + '123';
        }
        clearErrors();
        DayFlow.toast('Profile Selected', `Employee ID: ${emp.employeeId} (${emp.name})`, 'info');
      });

      employeeCardsGrid.appendChild(card);
    });
  }

  function showError(inputEl, feedbackEl, message) {
    if (inputEl) inputEl.style.borderColor = 'var(--danger)';
    if (feedbackEl) {
      feedbackEl.textContent = message;
      feedbackEl.className = 'form-feedback error';
      feedbackEl.style.display = 'flex';
    }
  }

  function clearErrors() {
    [emailInput, passwordInput].forEach(input => {
      if (input) input.style.borderColor = '';
    });
    [emailFeedback, passwordFeedback].forEach(fb => {
      if (fb) {
        fb.textContent = '';
        fb.style.display = 'none';
      }
    });
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (isLoading) {
      submitBtn.innerHTML = `
        <div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
        <span>Authenticating...</span>
      `;
    } else {
      const isHR = isHREmail(emailInput?.value);
      submitBtn.innerHTML = `
        <span>${isHR ? 'Sign In as HR Director' : 'Sign In as Employee'}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      `;
    }
  }
});
