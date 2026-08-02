import { type SchemaTypeDefinition } from 'sanity';
import newsType from './newsType';
import eventType from './eventType';
import guideType from './guideType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [newsType, eventType, guideType],
};
