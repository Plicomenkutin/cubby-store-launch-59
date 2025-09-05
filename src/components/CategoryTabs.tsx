import { Badge } from '@/components/ui/badge';
import { Category } from '@/types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={activeCategory === category.slug ? "default" : "outline"}
          className={`cursor-pointer whitespace-nowrap px-4 py-2 transition-all hover:scale-105 ${
            activeCategory === category.slug
              ? 'bg-primary text-primary-foreground shadow-button'
              : 'hover:bg-primary/10 hover:border-primary'
          }`}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
}