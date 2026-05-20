import fs from 'fs';
import path from 'path';

function replaceInFile(filePath: string, replacements: [RegExp, string][]) {
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement);
  }
  fs.writeFileSync(filePath, content);
}

const files = {
  'src/App.tsx': [
    [/import React, \{/g, 'import {']
  ],
  'src/components/Login.tsx': [
    [/import React, \{/g, 'import {']
  ],
  'src/components/ProgressOverview.tsx': [
    [/import React from 'react';\n/g, '']
  ],
  'src/components/TaskItem.tsx': [
    [/import React from 'react';\n/g, ''],
    [/import \{ Task \} from '\.\.\/types';/g, "import type { Task } from '../types';"]
  ],
  'src/components/TimelinePhaseCard.tsx': [
    [/import React, \{/g, 'import {'],
    [/import \{ Phase \} from '\.\.\/types';/g, "import type { Phase } from '../types';"]
  ],
  'src/store/initialData.ts': [
    [/import \{ Phase, DocumentCategory, Milestone \} from '\.\.\/types';/g, "import type { Phase, DocumentCategory, Milestone } from '../types';"]
  ],
  'src/store/useStore.ts': [
    [/import \{ AppState, Phase, Task \} from '\.\.\/types';/g, "import type { AppState } from '../types';"]
  ],
  'src/views/DocumentsView.tsx': [
    [/import React from 'react';\n/g, '']
  ],
  'src/views/MilestonesView.tsx': [
    [/import React from 'react';\n/g, '']
  ],
  'src/views/TimelineView.tsx': [
    [/import React from 'react';\n/g, '']
  ],
  'src/components/Layout.tsx': [
    [/import React from 'react';/g, "import type { ReactNode } from 'react';"],
    [/React\.ReactNode/g, "ReactNode"]
  ]
};

for (const [file, replacements] of Object.entries(files)) {
  const fullPath = path.join(process.cwd(), file);
  replaceInFile(fullPath, replacements as [RegExp, string][]);
}

console.log("Fixed files.");
