import { type SchemaTypeDefinition } from 'sanity';

import newsType from './article/newsType';
import eventType from './article/eventType';
import guideType from './article/guideType';

import category from './product/category';
import subcategory from './product/subcategory';
import brand from './product/brand';
import product from './product/product';
import catalogue from './product/catalogue';

import project from './project';

import contactAgency from './contact/agency';
import contactProject from './contact/project';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    contactAgency,
    contactProject,
    category,
    subcategory,
    brand,
    product,
    catalogue,
    newsType,
    eventType,
    guideType,
    project,
  ],
};
