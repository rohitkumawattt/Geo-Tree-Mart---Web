import React from 'react';
import CategoryBase from './CategoryBase';

export default function PlantsPage({ onClose }) {
  return <CategoryBase categoryName="Plants" onClose={onClose} />;
}
