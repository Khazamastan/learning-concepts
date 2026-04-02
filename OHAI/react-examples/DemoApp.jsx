'use client';

import React from 'react';
import { CopyTechniquesDemo } from './CopyTechniques.jsx';
import { GroupAnagramsDemo } from './GroupAnagrams.jsx';
import { FilterPolyfillDemo } from './FilterPolyfill.jsx';
import { ObjectDestructuringDemo } from './ObjectDestructuring.jsx';
import { ProcessLogsMaxSpanDemo } from './ProcessLogsMaxSpan.jsx';
import { ProcessLargeFileDownloadDemo } from './ProcessLargeFileDownload.jsx';
import { NimSumDemo } from './NimSum.jsx';
import { StringToIntegerDemo } from './StringToInteger.jsx';
import { StringPermutationsDemo } from './StringPermutations.jsx';
import { LongestSubstringNoRepeatDemo } from './LongestSubstringNoRepeat.jsx';
import { PreviousIndexOccurrenceDemo } from './PreviousIndexOccurrence.jsx';
import { StringSubsetsDemo } from './StringSubsets.jsx';
import { NotificationProvider, NotificationDemo } from './UseNotification.jsx';

export function DemoApp() {
  return (
    <NotificationProvider>
      <main style={{ display: 'grid', gap: '2rem', padding: '2rem', maxWidth: '960px', margin: '0 auto' }}>
        <h1>React 19 Practice Playground</h1>
        <CopyTechniquesDemo />
        <GroupAnagramsDemo />
        <FilterPolyfillDemo />
        <ObjectDestructuringDemo />
        <ProcessLogsMaxSpanDemo />
        <ProcessLargeFileDownloadDemo />
        <NimSumDemo />
        <StringToIntegerDemo />
        <StringPermutationsDemo />
        <LongestSubstringNoRepeatDemo />
        <PreviousIndexOccurrenceDemo />
        <StringSubsetsDemo />
        <NotificationDemo />
      </main>
    </NotificationProvider>
  );
}

export default DemoApp;
