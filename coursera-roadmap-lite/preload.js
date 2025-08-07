// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('courseAPI', {
  loadCourses: () => ipcRenderer.invoke('load-courses'),
  saveCourses: (data) => ipcRenderer.invoke('save-courses', data)
});
