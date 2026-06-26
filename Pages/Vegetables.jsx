import React from 'react';
import CategoryBase from './CategoryBase';

export default function VegetablesPage({ onClose }) {
  return <CategoryBase categoryName="Vegetables" onClose={onClose} />;
}
