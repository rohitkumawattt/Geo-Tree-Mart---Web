import React from 'react';
import CategoryBase from './CategoryBase';

export default function FruitsPage({ onClose }) {
  return <CategoryBase categoryName="Fruits" onClose={onClose} />;
}
