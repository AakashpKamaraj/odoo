/* ==========================================================================
   DAYFLOW LEAVE & ATTENDANCE MANAGEMENT ENGINE
   "Enterprise Employee Cockpit"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  // Ensure authentication
  if (!DayFlow.requireAuth()) return;

  // Initialize leaves & tasks
  await DayFlow.loadLeaves();
  await DayFlow.loadTasks();

  // State for current view
  let currentFilter = 'all';
  let activeLeaveType = 'casual';
  let shiftTimerInterval = null;

  // Cache DOM Elements
  const balanceCardsContainer = document.getElementById('leaveBalanceCardsContainer');
  const leaveRequestsTableBody = document.getElementById('leaveRequestsTableBody');
  const filterButtons = document.querySelectorAll('.leave-filter-btn');
  const teamOooContainer = document.getElementById('teamOooContainer');
  const upcomingHolidaysContainer = document.getElementById('upcomingHolidaysContainer');

  // Form Elements
  const leaveRequestForm = document.getElementById('leaveRequestForm');
  const leaveStartDateInput = document.getElementById('leaveStartDate');
  const leaveEndDateInput = document.getElementById('leaveEndDate');
  const leaveHalfDaySelect = document.getElementById('leaveHalfDay');
  const leaveDurationPreview = document.getElementById('leaveDurationPreview');
  const leaveBalanceWarning = document.getElementById('leaveBalanceWarning');
  const leaveTypePickerOptions = document.querySelectorAll('.leave-type-option');

  // Attendance Elements
  const punchClockDisplay = document.getElementById('punchClockDisplay');
  const shiftStatusText = document.getElementById('shiftStatusText');
  const shiftStatusDot = document.getElementById('shiftStatusDot');
  const punchInBtn = document.getElementById('punchInBtn');
  const punchOutBtn = document.getElementById('punchOutBtn');
  const lunchBreakBtn = document.getElementById('lunchBreakBtn');
  const teaBreakBtn = document.getElementById('teaBreakBtn');
  const attendanceLogsContainer = document.getElementById('attendanceLogsContainer');

  // Support Ticket Form
  const supportTicketForm = document.getElementById('supportTicketForm');

  // --- Initial Setup ---
  initLeaveTypes();
  renderLeaveBalances();
  renderLeaveRequests();
  renderTeamOoo();
  renderUpcomingHolidays();
  initAttendanceTerminal();
  setupEventListeners();

  // --- 1. Render Leave Balance Cards ---
  function renderLeaveBalances() {
    const data = DayFlow.getLeaves();
    if (!data || !data.balances || !balanceCardsContainer) return;

    balanceCardsContainer.innerHTML = '';
    const balances = data.balances;

    Object.keys(balances).forEach(key => {
      const b = balances[key];
      const percentUsed = b.total > 0 ? Math.min(100, Math.round(((b.used + (b.pending || 0)) / b.total) * 100)) : 0;
      
      const card = document.createElement('div');
      card.className = 'leave-balance-card';
      card.id = `leaveBalCard-${key}`;

      let fillGradient = 'var(--primary)';
      if (key === 'sick') fillGradient = '#EF4444';
      else if (key === 'casual') fillGradient = '#F59E0B';
      else if (key === 'remote') fillGradient = '#06B6D4';
      else if (key === 'compOff') fillGradient = '#7C3AED';
      else if (key === 'parental') fillGradient = '#10B981';

      card.innerHTML = `
        <div class="leave-card-header">
          <span class="leave-code-badge leave-code-${b.code}">${b.code}</span>
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">Quota: ${b.total}d</span>
        </div>
        <div class="leave-card-title">${b.name}</div>
        <div class="leave-balance-num-row">
          <span class="leave-available-val">${b.available}</span>
          <span class="leave-available-sub">days left</span>
        </div>
        <div class="leave-progress-track">
          <div class="leave-progress-fill" style="width: ${percentUsed}%; background: ${fillGradient};"></div>
        </div>
        <div class="leave-card-stats-footer">
          <span>Used: <strong>${b.used}d</strong></span>
          <span>Pending: <strong>${b.pending || 0}d</strong></span>
        </div>
      `;

      balanceCardsContainer.appendChild(card);
    });
  }

  // --- 2. Render Leave Requests Table ---
  function renderLeaveRequests() {
    const data = DayFlow.getLeaves();
    if (!data || !leaveRequestsTableBody) return;

    const requests = data.requests || [];
    let filtered = requests;

    if (currentFilter !== 'all') {
      filtered = requests.filter(r => r.status.toLowerCase() === currentFilter.toLowerCase());
    }

    if (filtered.length === 0) {
      leaveRequestsTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="leave-empty-state">
            <div class="leave-empty-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div style="font-weight: 600; font-size: 1rem; color: var(--text-main); margin-bottom: 0.25rem;">No leave records found</div>
            <p style="font-size: 0.875rem;">No requests matching "${currentFilter}" filter.</p>
          </td>
        </tr>
      `;
      return;
    }

    leaveRequestsTableBody.innerHTML = '';

    filtered.forEach(req => {
      const tr = document.createElement('tr');
      tr.id = `leaveRow-${req.id}`;

      const dateStr = req.startDate === req.endDate
        ? formatDate(req.startDate)
        : `${formatDate(req.startDate)} → ${formatDate(req.endDate)}`;

      const statusClass = `leave-status-${req.status.toLowerCase()}`;

      let actionsHtml = '';
      if (req.status === 'pending') {
        actionsHtml = `
          <div class="leave-action-btns">
            <button class="btn-table-action success btn-approve-sim" data-id="${req.id}" title="Simulate Manager Approval">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              Approve
            </button>
            <button class="btn-table-action danger btn-reject-sim" data-id="${req.id}" title="Simulate Manager Rejection">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              Reject
            </button>
            <button class="btn-table-action danger btn-cancel-leave" data-id="${req.id}" title="Withdraw request">
              Withdraw
            </button>
          </div>
        `;
      } else {
        actionsHtml = `
          <div class="leave-action-btns">
            <button class="btn-table-action btn-view-slip" data-id="${req.id}" title="View / Print Leave Slip">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Slip
            </button>
            ${req.status === 'approved' ? `
              <button class="btn-table-action danger btn-cancel-leave" data-id="${req.id}" title="Cancel approved leave">
                Cancel
              </button>
            ` : ''}
          </div>
        `;
      }

      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--primary); font-family: monospace; font-size: 0.8125rem;">
          ${req.id}
        </td>
        <td>
          <div style="font-weight: 600;">${req.typeName || req.leaveType}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${req.reason || 'Personal'}</div>
        </td>
        <td style="font-weight: 500;">
          ${dateStr}
        </td>
        <td style="font-weight: 700;">
          ${req.duration} ${req.duration === 1 ? 'day' : 'days'}
          ${req.halfDay && req.halfDay !== 'none' ? `<span style="font-size: 0.7rem; color: var(--text-muted); font-weight: normal;">(${req.halfDay})</span>` : ''}
        </td>
        <td>
          <span style="font-size: 0.8125rem; font-weight: 500;">${req.handover || 'Liam Vance'}</span>
        </td>
        <td>
          <span class="leave-status-pill ${statusClass}">
            ${req.status}
          </span>
        </td>
        <td>
          ${actionsHtml}
        </td>
      `;

      leaveRequestsTableBody.appendChild(tr);
    });

    // Bind action buttons
    bindTableActionButtons();
  }

  function bindTableActionButtons() {
    // Approve Simulation
    document.querySelectorAll('.btn-approve-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        DayFlow.simulateApproveLeave(id);
        renderLeaveBalances();
        renderLeaveRequests();
      });
    });

    // Reject Simulation
    document.querySelectorAll('.btn-reject-sim').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        DayFlow.simulateRejectLeave(id);
        renderLeaveBalances();
        renderLeaveRequests();
      });
    });

    // Withdraw / Cancel
    document.querySelectorAll('.btn-cancel-leave').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm(`Are you sure you want to withdraw leave request ${id}?`)) {
          DayFlow.cancelLeaveRequest(id);
          renderLeaveBalances();
          renderLeaveRequests();
        }
      });
    });

    // View / Print Slip
    document.querySelectorAll('.btn-view-slip').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        showLeaveSlipModal(id);
      });
    });
  }

  // --- 3. Leave Request Form Handling ---
  function initLeaveTypes() {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (leaveStartDateInput) leaveStartDateInput.value = todayStr;
    if (leaveEndDateInput) leaveEndDateInput.value = tomorrowStr;

    // Picker Selection
    leaveTypePickerOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        leaveTypePickerOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        activeLeaveType = opt.getAttribute('data-type');
        calculateDuration();
      });
    });

    if (leaveStartDateInput) leaveStartDateInput.addEventListener('change', calculateDuration);
    if (leaveEndDateInput) leaveEndDateInput.addEventListener('change', calculateDuration);
    if (leaveHalfDaySelect) leaveHalfDaySelect.addEventListener('change', calculateDuration);

    calculateDuration();
  }

  function calculateDuration() {
    if (!leaveStartDateInput || !leaveEndDateInput) return 1;

    const start = new Date(leaveStartDateInput.value);
    const end = new Date(leaveEndDateInput.value);
    const halfDay = leaveHalfDaySelect ? leaveHalfDaySelect.value : 'none';

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      if (leaveDurationPreview) leaveDurationPreview.textContent = 'Invalid date range';
      return 0;
    }

    // Calculate working days (excluding weekends)
    let count = 0;
    const cur = new Date(start);
    while (cur <= end) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sat/Sun
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    let finalDays = count;
    if (halfDay !== 'none') {
      finalDays = count > 0 ? (count - 1) + 0.5 : 0.5;
    }

    if (leaveDurationPreview) {
      leaveDurationPreview.innerHTML = `
        <span>Requested Duration:</span>
        <span style="color: var(--primary); font-weight: 800; font-size: 1rem;">${finalDays} Working Day${finalDays === 1 ? '' : 's'}</span>
      `;
    }

    // Balance check warning
    const leaves = DayFlow.getLeaves();
    if (leaves.balances && leaves.balances[activeLeaveType]) {
      const bal = leaves.balances[activeLeaveType];
      if (activeLeaveType !== 'unpaid' && bal.available < finalDays) {
        if (leaveBalanceWarning) {
          leaveBalanceWarning.style.display = 'block';
          leaveBalanceWarning.textContent = `Warning: Requested ${finalDays} days exceeds your available balance (${bal.available} days left). Excess may be treated as Unpaid Leave.`;
        }
      } else {
        if (leaveBalanceWarning) leaveBalanceWarning.style.display = 'none';
      }
    }

    return finalDays;
  }

  if (leaveRequestForm) {
    leaveRequestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const duration = calculateDuration();
      if (duration <= 0) {
        DayFlow.toast('Invalid Dates', 'Please select a valid start and end date.', 'danger');
        return;
      }

      const leaves = DayFlow.getLeaves();
      const typeInfo = leaves.balances && leaves.balances[activeLeaveType] ? leaves.balances[activeLeaveType] : { name: 'Leave' };

      const formData = {
        leaveType: activeLeaveType,
        typeName: typeInfo.name,
        startDate: leaveStartDateInput.value,
        endDate: leaveEndDateInput.value,
        duration: duration,
        halfDay: leaveHalfDaySelect ? leaveHalfDaySelect.value : 'none',
        reason: document.getElementById('leaveReason').value.trim() || 'Personal & Medical',
        handover: document.getElementById('leaveHandoverColleague').value || 'Liam Vance (Senior UI Designer)',
        emergencyPhone: document.getElementById('leaveEmergencyContact').value || '+1 (555) 019-2835',
        notes: document.getElementById('leaveAdditionalNotes').value || ''
      };

      DayFlow.addLeaveRequest(formData);
      DayFlow.closeModal('requestLeaveModal');
      leaveRequestForm.reset();
      initLeaveTypes();

      renderLeaveBalances();
      renderLeaveRequests();
    });
  }

  // --- 4. Team Out-of-Office & Upcoming Holidays ---
  function renderTeamOoo() {
    const data = DayFlow.getLeaves();
    if (!data || !teamOooContainer) return;

    const list = data.teamOutToday || [];
    teamOooContainer.innerHTML = '';

    list.forEach(member => {
      const item = document.createElement('div');
      item.className = 'team-ooo-item';
      item.innerHTML = `
        <div class="team-ooo-left">
          <div class="team-ooo-avatar">${member.avatar || 'SC'}</div>
          <div>
            <div class="team-ooo-name">${member.name}</div>
            <div class="team-ooo-role">${member.role}</div>
          </div>
        </div>
        <div style="text-align: right;">
          <span class="badge-empid" style="font-size: 0.7rem; background: var(--bg-surface);">${member.type}</span>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${member.dates}</div>
        </div>
      `;
      teamOooContainer.appendChild(item);
    });
  }

  function renderUpcomingHolidays() {
    const data = DayFlow.getLeaves();
    if (!data || !upcomingHolidaysContainer) return;

    const holidays = (data.upcomingHolidays || []).slice(0, 4);
    upcomingHolidaysContainer.innerHTML = '';

    holidays.forEach(h => {
      const dateObj = new Date(h.date);
      const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = dateObj.getDate();

      const item = document.createElement('div');
      item.className = 'holiday-item';
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="holiday-date-badge">
            <div>${monthStr}</div>
            <div style="font-size: 1rem;">${dayNum}</div>
          </div>
          <div>
            <div class="holiday-name">${h.name}</div>
            <div class="holiday-type">${h.type} • ${h.day}</div>
          </div>
        </div>
        <span class="badge-empid" style="font-size: 0.7rem;">Holiday</span>
      `;
      upcomingHolidaysContainer.appendChild(item);
    });
  }

  // --- 5. Attendance / Punch-In Terminal Engine ---
  function initAttendanceTerminal() {
    updateAttendanceUI();

    // Start live clock
    if (shiftTimerInterval) clearInterval(shiftTimerInterval);
    shiftTimerInterval = setInterval(() => {
      const now = new Date();
      if (punchClockDisplay) {
        punchClockDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      updateActiveShiftDuration();
    }, 1000);

    if (punchInBtn) {
      punchInBtn.addEventListener('click', () => {
        DayFlow.punchIn();
        updateAttendanceUI();
      });
    }

    if (punchOutBtn) {
      punchOutBtn.addEventListener('click', () => {
        if (confirm('Punch out and end your working shift for today?')) {
          DayFlow.punchOut();
          updateAttendanceUI();
        }
      });
    }

    if (lunchBreakBtn) {
      lunchBreakBtn.addEventListener('click', () => {
        DayFlow.toggleBreak('lunch');
        updateAttendanceUI();
      });
    }

    if (teaBreakBtn) {
      teaBreakBtn.addEventListener('click', () => {
        DayFlow.toggleBreak('tea');
        updateAttendanceUI();
      });
    }
  }

  function updateAttendanceUI() {
    const att = DayFlow.getAttendance();
    if (!att) return;

    if (shiftStatusDot) {
      shiftStatusDot.className = 'punch-status-dot';
      if (!att.isPunchedIn) {
        shiftStatusDot.classList.add('punched-out');
      } else if (att.activeBreak) {
        shiftStatusDot.classList.add('on-break');
      }
    }

    if (shiftStatusText) {
      if (!att.isPunchedIn) {
        shiftStatusText.textContent = 'Shift Ended / Out of Office';
      } else if (att.activeBreak) {
        shiftStatusText.textContent = `On ${att.activeBreak === 'lunch' ? 'Lunch' : 'Short'} Break`;
      } else {
        shiftStatusText.textContent = 'Working (On Duty)';
      }
    }

    if (punchInBtn) punchInBtn.style.display = att.isPunchedIn ? 'none' : 'inline-flex';
    if (punchOutBtn) punchOutBtn.style.display = att.isPunchedIn ? 'inline-flex' : 'none';

    if (lunchBreakBtn) {
      lunchBreakBtn.classList.toggle('active', att.activeBreak === 'lunch');
      lunchBreakBtn.disabled = !att.isPunchedIn;
    }
    if (teaBreakBtn) {
      teaBreakBtn.classList.toggle('active', att.activeBreak === 'tea');
      teaBreakBtn.disabled = !att.isPunchedIn;
    }

    renderAttendanceLogs(att.logs || []);
  }

  function updateActiveShiftDuration() {
    const att = DayFlow.getAttendance();
    const durationEl = document.getElementById('shiftWorkedDuration');
    if (!durationEl) return;

    if (!att.isPunchedIn || !att.punchInTime) {
      durationEl.textContent = '--:--';
      return;
    }

    const start = new Date(att.punchInTime);
    const diffMs = Math.max(0, Date.now() - start.getTime());
    const totalSecs = Math.floor(diffMs / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    durationEl.textContent = `${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`;
  }

  function renderAttendanceLogs(logs) {
    if (!attendanceLogsContainer) return;
    attendanceLogsContainer.innerHTML = '';

    logs.forEach(log => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.justifyContent = 'space-between';
      row.style.padding = '0.5rem 0';
      row.style.borderBottom = '1px dashed var(--border-subtle)';
      row.style.fontSize = '0.8125rem';

      row.innerHTML = `
        <div>
          <strong style="color: var(--text-main);">${log.date}</strong>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${log.in} → ${log.out}</div>
        </div>
        <div style="text-align: right;">
          <span style="font-weight: 700; color: var(--primary);">${log.duration}</span>
          <div><span class="leave-status-pill ${log.status === 'Present' || log.status === 'On-Time' ? 'leave-status-approved' : 'leave-status-pending'}" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">${log.status}</span></div>
        </div>
      `;
      attendanceLogsContainer.appendChild(row);
    });
  }

  // --- 6. Leave Slip Modal / Print Confirmation ---
  function showLeaveSlipModal(id) {
    const data = DayFlow.getLeaves();
    const req = (data.requests || []).find(r => r.id === id);
    if (!req) return;

    const user = DayFlow.getUser();
    const slipBody = document.getElementById('leaveSlipModalBody');
    if (!slipBody) return;

    slipBody.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-weight: 800; font-size: 1.25rem; color: var(--primary); letter-spacing: 0.05em;">DAYFLOW ENTERPRISE INC.</div>
        <div style="font-size: 0.8125rem; color: var(--text-muted);">Official Employee Leave Pass & Authorization Record</div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; font-size: 0.875rem;">
        <div>
          <div style="color: var(--text-muted); font-size: 0.75rem;">EMPLOYEE NAME</div>
          <div style="font-weight: 700; color: var(--text-main);">${user.name}</div>
        </div>
        <div>
          <div style="color: var(--text-muted); font-size: 0.75rem;">EMPLOYEE ID</div>
          <div style="font-weight: 700; color: var(--text-main); font-family: monospace;">${user.employeeId}</div>
        </div>
        <div>
          <div style="color: var(--text-muted); font-size: 0.75rem;">DEPARTMENT</div>
          <div style="font-weight: 600;">${user.department}</div>
        </div>
        <div>
          <div style="color: var(--text-muted); font-size: 0.75rem;">REPORTING MANAGER</div>
          <div style="font-weight: 600;">${req.manager}</div>
        </div>
      </div>

      <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <span style="font-size: 0.8125rem; color: var(--text-muted);">Leave Reference ID:</span>
          <strong style="color: var(--primary); font-family: monospace;">${req.id}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <span style="font-size: 0.8125rem; color: var(--text-muted);">Leave Type:</span>
          <strong>${req.typeName || req.leaveType}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <span style="font-size: 0.8125rem; color: var(--text-muted);">Schedule:</span>
          <strong>${formatDate(req.startDate)} to ${formatDate(req.endDate)} (${req.duration} day${req.duration > 1 ? 's' : ''})</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <span style="font-size: 0.8125rem; color: var(--text-muted);">Handover Colleague:</span>
          <strong>${req.handover || 'Liam Vance'}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="font-size: 0.8125rem; color: var(--text-muted);">Approval Status:</span>
          <span class="leave-status-pill leave-status-${req.status.toLowerCase()}">${req.status}</span>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-secondary" data-close-modal="leaveSlipModal">Close</button>
        <button class="btn btn-primary" onclick="window.print()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print Slip
        </button>
      </div>
    `;

    DayFlow.openModal('leaveSlipModal');
  }

  // --- 7. Support Ticket Submission ---
  if (supportTicketForm) {
    supportTicketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = document.getElementById('ticketCategory').value;
      const title = document.getElementById('ticketSubject').value.trim();
      const priority = document.getElementById('ticketPriority').value;
      const description = document.getElementById('ticketDescription').value.trim();

      if (!title) return;

      DayFlow.submitSupportTicket({
        category,
        title,
        priority,
        description
      });

      DayFlow.closeModal('supportTicketModal');
      supportTicketForm.reset();
    });
  }

  // --- Event Listeners & Filter Switching ---
  function setupEventListeners() {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        renderLeaveRequests();
      });
    });

    // Listen to global store updates
    window.addEventListener('leaves_updated', () => {
      renderLeaveBalances();
      renderLeaveRequests();
    });
  }

  // Helpers
  function formatDate(isoStr) {
    if (!isoStr) return '';
    try {
      const parts = isoStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
      return isoStr;
    } catch (e) {
      return isoStr;
    }
  }

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
});
