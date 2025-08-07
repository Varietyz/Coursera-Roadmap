// src/ui/modal.js
import { addCourse, getCourses } from '../data/courseService.js';
import { renderCourses, renderSummary } from './render.js';

export function openAddCourseModal() {
  document.getElementById('contextMenu').style.display = 'none';
  document.getElementById('addCourseModal').style.display = 'block';
  document.getElementById('courseTitle').focus();
}

export function closeAddCourseModal() {
  document.getElementById('addCourseModal').style.display = 'none';
  document.getElementById('addCourseForm').reset();
}

export function setupAddCourseForm(courseList) {
  const form = document.getElementById('addCourseForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = form.courseTitle.value.trim();
    const provider = form.courseProvider.value.trim();
    const cost = parseFloat(form.courseCost.value) || 0;
    const status = form.courseStatus.value;
    const url = form.courseUrl.value.trim();

    if (!title || !provider) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      if (url) new URL(url);
    } catch {
      alert('Please enter a valid URL.');
      return;
    }

    addCourse({ title, provider, cost, status, url });
    const updatedList = getCourses();
    renderCourses(updatedList);
    renderSummary(updatedList);
    closeAddCourseModal();

  });
}
