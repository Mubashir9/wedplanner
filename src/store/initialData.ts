import type { Phase, DocumentCategory, Milestone } from '../types';

export const defaultTimeline: Phase[] = [
  {
    id: 'phase-prep',
    title: 'Preparation Phase',
    tasks: [
      { id: 't1', title: 'Confirm visa eligibility', completed: false },
      { id: 't2', title: 'Gather documents', completed: false },
      { id: 't3', title: 'Build relationship evidence', completed: false },
    ]
  },
  {
    id: 'phase-noim',
    title: 'NOIM Phase',
    tasks: [
      { id: 't4', title: 'Choose celebrant / registry', completed: false },
      { id: 't5', title: 'Prepare NOIM form', completed: false },
      { id: 't6', title: 'Lodge NOIM', completed: false },
    ]
  },
  {
    id: 'phase-marriage',
    title: 'Marriage Phase',
    tasks: [
      { id: 't7', title: 'Book ceremony', completed: false },
      { id: 't8', title: 'Attend marriage ceremony', completed: false },
      { id: 't9', title: 'Sign legal documents', completed: false },
    ]
  },
  {
    id: 'phase-cert',
    title: 'Certificate Phase',
    tasks: [
      { id: 't10', title: 'Wait for registration', completed: false },
      { id: 't11', title: 'Receive marriage certificate', completed: false },
    ]
  },
  {
    id: 'phase-visa-prep',
    title: 'Visa Prep Phase',
    tasks: [
      { id: 't12', title: 'Medical checks', completed: false },
      { id: 't13', title: 'Police clearance (if needed)', completed: false },
      { id: 't14', title: 'Prepare 485 documents', completed: false },
    ]
  },
  {
    id: 'phase-485',
    title: '485 Application Phase',
    tasks: [
      { id: 't15', title: 'Final review documents', completed: false },
      { id: 't16', title: 'Submit 485 application', completed: false },
      { id: 't17', title: 'Upload spouse documents', completed: false },
    ]
  }
];

export const defaultDocuments: DocumentCategory[] = [
  {
    category: 'Personal Documents',
    items: [
      { id: 'd1', name: 'Passport (Self)', required: true, uploaded: false },
      { id: 'd2', name: 'Birth Certificate', required: true, uploaded: false },
    ]
  },
  {
    category: 'Partner Documents',
    items: [
      { id: 'd3', name: 'Passport (Partner)', required: true, uploaded: false },
      { id: 'd4', name: 'Birth Certificate (Partner)', required: true, uploaded: false },
    ]
  },
  {
    category: 'Marriage Documents',
    items: [
      { id: 'd5', name: 'NOIM Lodgement Receipt', required: true, uploaded: false },
      { id: 'd6', name: 'Official Marriage Certificate', required: true, uploaded: false },
      { id: 'd7', name: 'Relationship Evidence (Photos, Bills)', required: true, uploaded: false },
    ]
  },
  {
    category: 'Visa Documents',
    items: [
      { id: 'd8', name: 'Australian Study Requirement Proof', required: true, uploaded: false },
      { id: 'd9', name: 'English Test Results', required: true, uploaded: false },
      { id: 'd10', name: 'Health Insurance Proof (OVHC)', required: true, uploaded: false },
      { id: 'd11', name: 'AFP Police Check', required: true, uploaded: false },
    ]
  }
];

export const defaultMilestones: Milestone[] = [
  { id: 'm1', title: 'NOIM Lodged', completed: false },
  { id: 'm2', title: 'Marriage Completed', completed: false },
  { id: 'm3', title: 'Certificate Received', completed: false },
  { id: 'm4', title: '485 Application Submitted', completed: false },
];
