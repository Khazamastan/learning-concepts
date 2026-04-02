import React from 'react';
import { CourseShell } from './components/CourseShell.jsx';
import { LessonPlayer } from './components/LessonPlayer.jsx';
import { QuizEngine } from './components/QuizEngine.jsx';
import { DiscussionPanel } from './components/DiscussionPanel.jsx';
import { CertificateModal } from './components/CertificateModal.jsx';

const demoData = {
  "CourseShell": {
    "course": "Advanced UX"
  },
  "LessonPlayer": {
    "lesson": "Design Systems"
  },
  "QuizEngine": {
    "questions": 10
  },
  "DiscussionPanel": {
    "posts": 34
  },
  "CertificateModal": {
    "eligible": false
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <CourseShell data={demoData["CourseShell"]} />
      <LessonPlayer data={demoData["LessonPlayer"]} />
      <QuizEngine data={demoData["QuizEngine"]} />
      <DiscussionPanel data={demoData["DiscussionPanel"]} />
      <CertificateModal data={demoData["CertificateModal"]} />
    </main>
  );
}
