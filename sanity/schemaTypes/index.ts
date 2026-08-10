import { type SchemaTypeDefinition } from 'sanity';

import newsType from './article/newsType';
import eventType from './article/eventType';
import guideType from './article/guideType';

import category from './product/category';
import subcategory from './product/subcategory';
import brand from './product/brand';
import product from './product/product';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    category,
    subcategory,
    brand,
    product,
    newsType,
    eventType,
    guideType,
  ],
};
