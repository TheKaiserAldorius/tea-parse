import { db } from '@/server/drizzle';
import { tableCategories } from '@/server/drizzle/schema';
import { TRPCError } from '@trpc/server';
import { eq, not } from 'drizzle-orm';

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === '1';

// 🔧 Моки для preview-режима
const MOCK_CATEGORIES = [
  {
    category_id: 'tea',
    position: 1,
    name: 'Tea',
    url: '/tea',
    image_link: null,
    created: new Date(),
    updated: new Date(),
  },
  {
    category_id: 'accessories',
    position: 2,
    name: 'Accessories',
    url: '/category/accessories',
    image_link: null,
    created: new Date(),
    updated: new Date(),
  },
];

export class CategoryService {
  static async createCategory(category: {
    name: string;
    imageLink: string;
    url: string;
  }) {
    if (isPreview) {
      // preview: просто возвращаем "созданную" категорию
      return {
        category_id: 'mock',
        position: 999,
        name: category.name,
        url: category.url,
        image_link: category.imageLink ?? null,
        created: new Date(),
        updated: new Date(),
      };
    }

    const newCategory = await db
      .insert(tableCategories)
      .values(category)
      .returning();

    return newCategory[0];
  }

  static async getCategories() {
    if (isPreview) {
      return MOCK_CATEGORIES;
    }

    const result = await db
      .select()
      .from(tableCategories)
      .where(not(eq(tableCategories.position, 0)))
      .orderBy(tableCategories.position);

    return result;
  }

  static async getCategoryByUrl(url: string) {
    if (isPreview) {
      const category = MOCK_CATEGORIES.find((c) => c.url === url);
      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Категория не найдена (preview)',
        });
      }
      return category;
    }

    const result = await db
      .select()
      .from(tableCategories)
      .where(eq(tableCategories.url, url));

    if (!result.length)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Категория не найдена',
      });

    return result[0];
  }
}
