import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Skill {
  id: number;
  name: string;
  icon: LucideIcon;
  level: number; // 0-100
}

export interface NavItem {
  label: string;
  href: string;
}