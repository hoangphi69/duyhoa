import { Building, FolderTree, Layers, Pencil, Tag, Tags } from 'lucide-react';
import type { StructureResolver } from 'sanity/structure';
import { apiVersion } from './env';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Quản lý nội dung')
    .items([
      // 1) Danh mục chính — kéo thả sắp xếp toàn cục
      orderableDocumentListDeskItem({
        type: 'productCategory',
        icon: Layers,
        title: 'Danh mục chính',
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'productSubcategory',
        title: 'Phân loại con',
        icon: Tag,
        S,
        context,
      }),

      // 3. Show all other document types while hiding the default Category/Subcategory lists
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['productCategory', 'productSubcategory', 'project'].includes(
            listItem.getId() as string,
          ),
      ),

      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Dự án',
        icon: Building,
        S,
        context,
      }),
    ]);
