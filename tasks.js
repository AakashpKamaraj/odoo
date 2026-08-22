/* ==========================================================================
   DAYFLOW TASK MANAGEMENT CONTROLLER
   "Full CRUD, Dynamic Filtering, Search, and Sorting Engine"
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  await DayFlow.loadTasks();

  // State
  const state = {
    searchQuery: '',
    statusFilter: 'all',
    priorityFilter: 'all',
    categoryFilter: 'all',
    sortBy: 'dueDate',
    viewMode: 'grid', // 'grid' or 'list'
    editingTaskId: null,
    deletingTaskId: null
  };

  // Check URL params for search query
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get('search');
  if (queryParam) {
    state.searchQuery = queryParam;
    const searchInput = document.getElementById('tasksSearchInput');
    if (searchInput) searchInput.value = queryParam;
  }

  // DOM Elements
  const tasksGrid = document.getElementById('tasksContainer');
  const searchInput = document.getElementById('tasksSearchInput');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const prioritySelect = document.getElementById('priorityFilterSelect');
  const categorySelect = document.getElementById('categoryFilterSelect');
  const sortSelect = document.getElementById('sortSelect');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const viewListBtn = document.getElementById('viewListBtn');
  const addTaskForm = document.getElementById('addTaskForm');
  const editTaskForm = document.getElementById('editTaskForm');
  const confirmDeleteBtn = document.getElementById('confirmDeleteTaskBtn');

  // Initial Render
  renderTasks();

  // Listen for storage updates
  window.addEventListener('tasks_updated', () => {
    renderTasks();
  });

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderTasks();
    });
  }

  // Status Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.statusFilter = tab.getAttribute('data-status') || 'all';
      renderTasks();
    });
  });

  // Priority Filter
  if (prioritySelect) {
    prioritySelect.addEventListener('change', (e) => {
      state.priorityFilter = e.target.value;
      renderTasks();
    });
  }

  // Category Filter
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      state.categoryFilter = e.target.value;
      renderTasks();
    });
  }

  // Sort Select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderTasks();
    });
  }

  // View Mode Toggles
  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener('click', () => {
      state.viewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      renderTasks();
    });

    viewListBtn.addEventListener('click', () => {
      state.viewMode = 'list';
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      renderTasks();
    });
  }

  // --- Add Task Form Submission ---
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('taskTitle').value.trim();
      const description = document.getElementById('taskDesc').value.trim();
      const category = document.getElementById('taskCategory').value;
      const priority = document.getElementById('taskPriority').value;
      const dueDate = document.getElementById('taskDueDate').value;
      const dueTime = document.getElementById('taskDueTime').value;
      const estimatedMinutes = parseInt(document.getElementById('taskDuration').value, 10) || 30;

      if (!title) {
        DayFlow.toast('Validation Error', 'Please enter a task title', 'error');
        return;
      }

      if (!dueDate) {
        DayFlow.toast('Validation Error', 'Please select a due date', 'error');
        return;
      }

      DayFlow.addTask({
        title,
        description,
        category,
        priority,
        dueDate,
        dueTime: dueTime || "17:00",
        estimatedMinutes
      });

      addTaskForm.reset();
      DayFlow.closeModal('addTaskModal');
    });
  }

  // --- Edit Task Form Submission ---
  if (editTaskForm) {
    editTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.editingTaskId) return;

      const title = document.getElementById('editTaskTitle').value.trim();
      const description = document.getElementById('editTaskDesc').value.trim();
      const category = document.getElementById('editTaskCategory').value;
      const priority = document.getElementById('editTaskPriority').value;
      const dueDate = document.getElementById('editTaskDueDate').value;
      const dueTime = document.getElementById('editTaskDueTime').value;
      const estimatedMinutes = parseInt(document.getElementById('editTaskDuration').value, 10) || 30;
      const status = document.getElementById('editTaskStatus').value;

      if (!title) {
        DayFlow.toast('Validation Error', 'Please enter a task title', 'error');
        return;
      }

      DayFlow.updateTask(state.editingTaskId, {
        title,
        description,
        category,
        priority,
        dueDate,
        dueTime,
        estimatedMinutes,
        status
      });

      DayFlow.toast('Task Updated', 'Changes saved successfully', 'success');
      DayFlow.closeModal('editTaskModal');
      state.editingTaskId = null;
    });
  }

  // --- Confirm Delete Task Action ---
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (state.deletingTaskId) {
        DayFlow.deleteTask(state.deletingTaskId);
        DayFlow.closeModal('deleteConfirmModal');
        state.deletingTaskId = null;
      }
    });
  }

  // Global methods for inline card action buttons
  window.openEditTaskModal = function(id) {
    const task = DayFlow.getTasks().find(t => t.id === id);
    if (!task) return;

    state.editingTaskId = id;
    document.getElementById('editTaskTitle').value = task.title || '';
    document.getElementById('editTaskDesc').value = task.description || '';
    document.getElementById('editTaskCategory').value = task.category || 'Work';
    document.getElementById('editTaskPriority').value = task.priority || 'Medium';
    document.getElementById('editTaskDueDate').value = task.dueDate || '';
    document.getElementById('editTaskDueTime').value = task.dueTime || '17:00';
    document.getElementById('editTaskDuration').value = task.estimatedMinutes || 30;
    document.getElementById('editTaskStatus').value = task.status || 'pending';

    DayFlow.openModal('editTaskModal');
  };

  window.openDeleteTaskModal = function(id) {
    const task = DayFlow.getTasks().find(t => t.id === id);
    if (!task) return;

    state.deletingTaskId = id;
    const taskTitlePreview = document.getElementById('deleteTaskTitlePreview');
    if (taskTitlePreview) {
      taskTitlePreview.textContent = `"${task.title}"`;
    }
    DayFlow.openModal('deleteConfirmModal');
  };

  window.clearAllTaskFilters = function() {
    state.searchQuery = '';
    state.statusFilter = 'all';
    state.priorityFilter = 'all';
    state.categoryFilter = 'all';

    if (searchInput) searchInput.value = '';
    if (prioritySelect) prioritySelect.value = 'all';
    if (categorySelect) categorySelect.value = 'all';
    filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-status') === 'all'));

    renderTasks();
  };

  // --- Main Task Filter, Sort, & Render Function ---
  function renderTasks() {
    if (!tasksGrid) return;

    const allTasks = DayFlow.getTasks();
    const todayStr = new Date().toISOString().split('T')[0];

    // Filter Logic
    let filtered = allTasks.filter(task => {
      // Search
      if (state.searchQuery) {
        const titleMatch = (task.title || '').toLowerCase().includes(state.searchQuery);
        const descMatch = (task.description || '').toLowerCase().includes(state.searchQuery);
        const catMatch = (task.category || '').toLowerCase().includes(state.searchQuery);
        if (!titleMatch && !descMatch && !catMatch) return false;
      }

      // Status Filter
      if (state.statusFilter === 'today') {
        if (task.dueDate !== todayStr) return false;
      } else if (state.statusFilter === 'upcoming') {
        if (task.dueDate <= todayStr || task.status === 'completed') return false;
      } else if (state.statusFilter === 'completed') {
        if (task.status !== 'completed') return false;
      } else if (state.statusFilter === 'overdue') {
        if (task.dueDate >= todayStr || task.status === 'completed') return false;
      }

      // Priority Filter
      if (state.priorityFilter !== 'all') {
        if (task.priority.toLowerCase() !== state.priorityFilter.toLowerCase()) return false;
      }

      // Category Filter
      if (state.categoryFilter !== 'all') {
        if ((task.category || '').toLowerCase() !== state.categoryFilter.toLowerCase()) return false;
      }

      return true;
    });

    // Sorting Logic
    const priorityWeight = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };

    filtered.sort((a, b) => {
      if (state.sortBy === 'dueDate') {
        return (a.dueDate || '').localeCompare(b.dueDate || '');
      } else if (state.sortBy === 'priority') {
        return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
      } else if (state.sortBy === 'created') {
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      } else if (state.sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0;
    });

    // Render Count Summary
    const resultsCountEl = document.getElementById('tasksResultCount');
    if (resultsCountEl) {
      resultsCountEl.textContent = `${filtered.length} task${filtered.length === 1 ? '' : 's'}`;
    }

    // Empty State Handling
    if (filtered.length === 0) {
      tasksGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 4rem 1.5rem;">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <div class="empty-state-title">No matching tasks found</div>
          <div class="empty-state-desc">Try adjusting your keywords, changing your filters, or create a brand new task.</div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-secondary btn-sm" onclick="clearAllTaskFilters()">Clear Filters</button>
            <button class="btn btn-primary btn-sm" data-open-modal="addTaskModal">+ Add Task</button>
          </div>
        </div>
      `;
      return;
    }

    // Render Grid vs List
    if (state.viewMode === 'grid') {
      tasksGrid.className = 'tasks-grid-layout';
      tasksGrid.innerHTML = filtered.map(task => renderTaskCard(task, todayStr)).join('');
    } else {
      tasksGrid.className = 'tasks-list-layout';
      tasksGrid.innerHTML = filtered.map(task => renderTaskListRow(task, todayStr)).join('');
    }
  }

  function renderTaskCard(task, todayStr) {
    const isCompleted = task.status === 'completed';
    const isOverdue = task.dueDate < todayStr && !isCompleted;
    const isToday = task.dueDate === todayStr;

    const formattedDate = new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    return `
      <div class="card task-manage-card ${isCompleted ? 'completed' : ''}" id="task-card-${task.id}">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-priority-${task.priority.toLowerCase()}">${task.priority}</span>
            <span class="badge badge-cat-${(task.category || 'other').toLowerCase()}">${escapeHTML(task.category || 'General')}</span>
            ${isOverdue ? '<span class="badge badge-danger">Overdue</span>' : ''}
            ${isToday ? '<span class="badge badge-primary">Today</span>' : ''}
          </div>
          <div class="dropdown">
            <button class="btn btn-ghost btn-sm" style="padding: 0.25rem 0.5rem;" onclick="toggleCardDropdown(event, '${task.id}')" aria-label="Task actions">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
            <div class="dropdown-menu" id="dropdown-${task.id}">
              <button class="dropdown-item" onclick="openEditTaskModal('${task.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Task
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item danger" onclick="openDeleteTaskModal('${task.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Delete
              </button>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.875rem;">
          <label class="custom-checkbox" style="margin-top: 2px;">
            <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="DayFlow.toggleTaskStatus('${task.id}')" aria-label="Toggle task completion">
          </label>
          <div style="flex: 1; min-width: 0;">
            <h4 class="task-title-text" style="font-size: 1.0625rem; margin-bottom: 0.375rem; white-space: normal; line-height: 1.4;">${escapeHTML(task.title)}</h4>
            <p style="font-size: 0.84375rem; color: var(--text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${escapeHTML(task.description || 'No description provided.')}
            </p>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.875rem; margin-top: auto; font-size: 0.8125rem; color: var(--text-muted);">
          <div style="display: flex; align-items: center; gap: 0.375rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${formattedDate}${task.dueTime ? ` at ${task.dueTime}` : ''}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${task.estimatedMinutes || 30}m</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderTaskListRow(task, todayStr) {
    const isCompleted = task.status === 'completed';
    const formattedDate = new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    return `
      <div class="task-item ${isCompleted ? 'completed' : ''}" style="padding: 1rem 1.25rem;">
        <div class="task-item-left">
          <label class="custom-checkbox">
            <input type="checkbox" ${isCompleted ? 'checked' : ''} onchange="DayFlow.toggleTaskStatus('${task.id}')">
          </label>
          <div class="task-details">
            <div class="task-title-text" style="font-size: 0.9375rem;">${escapeHTML(task.title)}</div>
            <div class="task-meta-tags">
              <span class="badge badge-priority-${task.priority.toLowerCase()}">${task.priority}</span>
              <span class="badge badge-cat-${(task.category || 'other').toLowerCase()}">${escapeHTML(task.category || 'General')}</span>
              <span class="task-due-time">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>
                ${formattedDate} ${task.dueTime || ''}
              </span>
            </div>
          </div>
        </div>
        <div class="task-item-actions" style="opacity: 1;">
          <button class="btn btn-icon btn-sm" onclick="openEditTaskModal('${task.id}')" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn btn-icon btn-sm" onclick="openDeleteTaskModal('${task.id}')" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }
});

// Dropdown handler
window.toggleCardDropdown = function(e, id) {
  e.stopPropagation();
  const menu = document.getElementById(`dropdown-${id}`);
  const parent = menu?.closest('.dropdown');
  if (parent) {
    parent.classList.toggle('open');
  }

  // Close when clicking anywhere else
  const closeHandler = () => {
    parent?.classList.remove('open');
    document.removeEventListener('click', closeHandler);
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 10);
};

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
