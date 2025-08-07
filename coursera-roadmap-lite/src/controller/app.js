import { loadCourses, getCourses } from '../data/courseService.js';
import { renderCourses, renderSummary } from '../ui/render.js';
import { openAddCourseModal, closeAddCourseModal, setupAddCourseForm } from '../ui/modal.js';

document.getElementById('addCourseBtn').addEventListener('click', openAddCourseModal);

async function initApp() {
  const courseList = await loadCourses();
  renderCourses(courseList);
  renderSummary(courseList);
  setupAddCourseForm(courseList);

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    const menu = document.getElementById('contextMenu');
    menu.style.display = 'block';
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
  });

  document.addEventListener('click', e => {
    const menu = document.getElementById('contextMenu');
    if (!menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });

  window.addEventListener('click', e => {
    const modal = document.getElementById('addCourseModal');
    if (e.target === modal) {
      closeAddCourseModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAddCourseModal();
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      openAddCourseModal();
    }
  });

  // Auto-reload every 60s
  setInterval(() => {
    const list = getCourses();
    if (list.length > 0) loadCourses();
  }, 60000);
}

document.addEventListener('DOMContentLoaded', initApp);
