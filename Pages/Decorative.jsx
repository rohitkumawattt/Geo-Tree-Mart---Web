import React from 'react';
import CategoryBase from './CategoryBase';

export default function DecorativePage({ onClose }) {
  return <CategoryBase categoryName="Decorative" onClose={onClose} />;
}
