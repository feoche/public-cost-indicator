import React from 'react';
import styles from './FilterBar.module.css';

/**
 * Props for the filter bar.
 * - categories: list of category names (derived from addon families)
 * - selected: currently selected category (or empty string for "All")
 * - onSelect: callback invoked with the new selected category
 */
interface FilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, selected, onSelect }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${selected === '' ? styles.active : ''}`}
        onClick={() => onSelect('')}
      >
        Tous
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.button} ${selected === cat ? styles.active : ''}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
