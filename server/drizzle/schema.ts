import { pgCartSchema } from './schemas/carts.table.schema';
import { pgCategoriesSchema } from './schemas/categories.table.schema';
import { pgCostsSchema } from './schemas/costs.table.schema copy';
import { pgDiscountsSchema } from './schemas/discounts.table.schema';
import {
	orderStatusEnum,
	qualityEnum,
	weightEnum,
} from './schemas/enums/enums';
import { pgItemsSchema } from './schemas/items.table.schema';
import { pgOrdersSchema } from './schemas/orders.table.schema';
import { pgProductsDescriptionSchema } from './schemas/products-description.table.schema';
import { pgProductsSchema } from './schemas/products.table.schema';
import { pgStoresSchema } from './schemas/stores.table.schema';
import { pgUsersSchema } from './schemas/users.table.schema';

export const weights = weightEnum;
export const qualities = qualityEnum;
export const orderStatuses = orderStatusEnum;

export const tableCarts = pgCartSchema;
export const tableCategories = pgCategoriesSchema;
export const tableCosts = pgCostsSchema;
export const tableDiscounts = pgDiscountsSchema;
export const tableItems = pgItemsSchema;
export const tableOrders = pgOrdersSchema;
export const tableProducts = pgProductsSchema;
export const tableProductsDescription = pgProductsDescriptionSchema;
export const tableStores = pgStoresSchema;
export const tableUsers = pgUsersSchema;