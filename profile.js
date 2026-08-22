/* ==========================================================================
   DAYFLOW PROFILE & SETTINGS CONTROLLER
   "Personalization, Productivity Metrics, & System Preferences"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  await DayFlow.loadTasks();

  const user = DayFlow.getUser();

  // Populate Personal Info Form
  const nameInput = document.getElementById('profileFullName');
  const emailInput = document.getElementById('profileEmail');
  const roleInput = document.getElementById('profileRole');
  const phoneInput = document.getElementById('profilePhone');
  const locationInput = document.getElementById('profileLocation');
  const profileForm = document.getElementById('personalInfoForm');

  if (nameInput) nameInput.value = user.name || 'Alex Morgan';
  if (emailInput) emailInput.value = user.email || 'demo@dayflow.com';
  if (roleInput) roleInput.value = user.role || 'Senior Product Designer';
  if (phoneInput) phoneInput.value = user.phone || '+1 (555) 019-2834';
  if (locationInput) locationInput.value = user.location || 'San Francisco, CA';

  // Populate Preferences
  const darkThemeToggle = document.getElementById('prefDarkTheme');
  const remindersToggle = document.getElementById('prefTaskReminders');
  const alertsToggle = document.getElementById('prefDeadlineAlerts');
  const summaryToggle = document.getElementById('prefDailySummary');
  const dailyGoalSelect = document.getElementById('prefDailyGoal');
  const weekStartSelect = document.getElementById('prefWeekStart');

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (darkThemeToggle) darkThemeToggle.checked = isDark;
  if (remindersToggle) remindersToggle.checked = user.notifications?.taskReminders !== false;
  if (alertsToggle) alertsToggle.checked = user.notifications?.deadlineAlerts !== false;
  if (summaryToggle) summaryToggle.checked = user.notifications?.dailySummary !== false;
  if (dailyGoalSelect) dailyGoalSelect.value = user.dailyGoal || 5;
  if (weekStartSelect) weekStartSelect.value = user.weekStart || 'monday';

  // Render Productivity Summary
  renderProfileProductivityStats();
  renderProfileSwitchList();

  function renderProfileSwitchList() {
    const container = document.getElementById('profileEmployeeSwitchList');
    if (!container) return;
    const allUsers = DayFlow.getAllUsers();
    const employees = allUsers.filter(u => !u.isHR && u.roleType !== 'hr' && u.email !== 'hr@dayflow.corp');
    const currentUser = DayFlow.getUser();

    container.innerHTML = employees.map(emp => {
      const isCurrent = currentUser.email === emp.email;
      return `
        <button type="button" class="btn ${isCurrent ? 'btn-primary' : 'btn-secondary'} btn-sm w-full" style="display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.6rem;" onclick="DayFlow.loginAsUser('${emp.email}')">
          <span style="font-size: 0.75rem; font-weight: 600; text-align: left;">${emp.name} (${emp.role || 'Staff'}) ${isCurrent ? '✓' : ''}</span>
          <span style="font-size: 0.6875rem; opacity: 0.8;">${emp.employeeId || 'EMP'}</span>
        </button>
      `;
    }).join('');
  }

  // Handle Personal Info Form Submit
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const updatedName = nameInput.value.trim();
      const updatedEmail = emailInput.value.trim();
      const updatedRole = roleInput.value.trim();
      const updatedPhone = phoneInput.value.trim();
      const updatedLocation = locationInput.value.trim();

      if (!updatedName) {
        DayFlow.toast('Error', 'Please enter your name', 'error');
        return;
      }

      DayFlow.saveUser({
        name: updatedName,
        email: updatedEmail,
        role: updatedRole,
        phone: updatedPhone,
        location: updatedLocation
      });

      DayFlow.toast('Profile Updated', 'Your profile details have been saved.', 'success');
    });
  }

  // Handle Preferences Changes
  if (darkThemeToggle) {
    darkThemeToggle.addEventListener('change', (e) => {
      DayFlow.setTheme(e.target.checked ? 'dark' : 'light', true);
    });
  }

  const preferencesForm = document.getElementById('preferencesForm');
  if (preferencesForm) {
    preferencesForm.addEventListener('submit', (e) => {
      e.preventDefault();

      DayFlow.saveUser({
        dailyGoal: parseInt(dailyGoalSelect?.value || 5, 10),
        weekStart: weekStartSelect?.value || 'monday',
        notifications: {
          taskReminders: remindersToggle ? remindersToggle.checked : true,
          deadlineAlerts: alertsToggle ? alertsToggle.checked : true,
          dailySummary: summaryToggle ? summaryToggle.checked : true
        }
      });

      DayFlow.toast('Preferences Saved', 'Your system settings were successfully updated.', 'success');
    });
  }

  // Reset Sample Data Action
  const resetDataBtn = document.getElementById('resetSampleDataBtn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', async () => {
      if (confirm('Reset your task list to the default demo data?')) {
        try {
          const res = await fetch('/data/tasks.json');
          if (res.ok) {
            const data = await res.json();
            DayFlow.saveTasks(data);
            renderProfileProductivityStats();
            DayFlow.toast('Data Reset', 'Default sample tasks reloaded successfully.', 'success');
          }
        } catch (e) {
          DayFlow.toast('Error', 'Failed to reload default data.', 'error');
        }
      }
    });
  }

  // Clear All Tasks Action
  const clearAllDataBtn = document.getElementById('clearAllDataBtn');
  if (clearAllDataBtn) {
    clearAllDataBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete ALL tasks? This action cannot be undone.')) {
        DayFlow.saveTasks([]);
        renderProfileProductivityStats();
        DayFlow.toast('Tasks Cleared', 'All tasks have been removed.', 'info');
      }
    });
  }

  // Delete My Account Trigger & Confirmation Modal
  const btnTriggerDeleteAccount = document.getElementById('btnTriggerDeleteAccount');
  const btnConfirmFinalDelete = document.getElementById('btnConfirmFinalDelete');
  const deleteModalUserEmail = document.getElementById('deleteModalUserEmail');

  if (btnTriggerDeleteAccount) {
    btnTriggerDeleteAccount.addEventListener('click', () => {
      const curUser = DayFlow.getUser();
      if (deleteModalUserEmail) {
        deleteModalUserEmail.textContent = `${curUser.name} (${curUser.email})`;
      }
      DayFlow.openModal('confirmDeleteAccountModal');
    });
  }

  if (btnConfirmFinalDelete) {
    btnConfirmFinalDelete.addEventListener('click', () => {
      const curUser = DayFlow.getUser();
      btnConfirmFinalDelete.disabled = true;
      btnConfirmFinalDelete.textContent = 'Deleting Account...';
      DayFlow.deleteAccount(curUser.email);
    });
  }

  // Listen for user updates or deletion
  window.addEventListener('users_updated', () => {
    renderProfileSwitchList();
  });

  function renderProfileProductivityStats() {
    const tasks = DayFlow.getTasks();
    const completedTasks = tasks.filter(t => t.status === 'completed');
    const user = DayFlow.getUser();

    const totalTasksEl = document.getElementById('profileTotalTasks');
    const completedTasksEl = document.getElementById('profileCompletedTasks');
    const rateEl = document.getElementById('profileCompletionRate');
    const streakEl = document.getElementById('profileCurrentStreak');
    const bestStreakEl = document.getElementById('profileBestStreak');

    if (totalTasksEl) totalTasksEl.textContent = tasks.length;
    if (completedTasksEl) completedTasksEl.textContent = completedTasks.length;

    const rate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
    if (rateEl) rateEl.textContent = `${rate}%`;

    if (streakEl) streakEl.textContent = `${user.streak || 7} days`;
    if (bestStreakEl) bestStreakEl.textContent = `${user.bestStreak || 14} days`;
  }
});
