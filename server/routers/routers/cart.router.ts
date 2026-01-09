import { CartService } from '@/server/services/users/cart.service';
import { protectedProcedure, publicProcedure } from '@/server/trpc';
import { CartInsertSchema } from '@/server/zod/cart.schema';

const isMockMode =
  process.env.NEXT_PUBLIC_PREVIEW_MODE === '1' || !process.env.DATABASE_URL;

function mockCart(userId?: string) {
  return {
    cartId: 'mock-cart',
    userId: userId ?? 'mock',
    items: [],
    total: 0,
    discountTotal: 0,
  };
}

export const cartRouter = {
  getCart: publicProcedure.query(async (opts) => {
    // mock-mode: всегда отдаём пустую корзину, без БД
    if (isMockMode) {
      return mockCart(opts.ctx.user?.id);
    }

    // prod-mode: если нет юзера — как и было (но лучше не падать)
    if (!opts.ctx.user) return null;

    const cart = await CartService.getCart(BigInt(opts.ctx.user.id));
    return cart;
  }),

  insert: protectedProcedure.input(CartInsertSchema).mutation(async (opts) => {
    const { input, ctx } = opts;

    if (isMockMode) {
      // мок-ответ, чтобы фронт не падал и мог “как будто” добавлять
      return {
        ok: true,
        mode: 'mock',
        item: {
          ...input,
          userId: ctx.user.id,
          created: new Date().toISOString(),
        },
      };
    }

    const item = await CartService.addCartItem({
      ...input,
      userId: BigInt(ctx.user.id),
    });

    return item;
  }),

  deleteByParams: protectedProcedure.input(CartInsertSchema).mutation(async (opts) => {
    const { input, ctx } = opts;

    if (isMockMode) {
      return {
        ok: true,
        mode: 'mock',
        removed: {
          ...input,
          userId: ctx.user.id,
        },
      };
    }

    const item = await CartService.removeCartItemByParams({
      ...input,
      userId: BigInt(ctx.user.id),
    });

    return item;
  }),
};
