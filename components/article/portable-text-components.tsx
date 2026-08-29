import { slugify } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from 'next-sanity';
import Image from 'next/image';

type RichTableCell = { _key: string; content: PortableTextBlock[] };
type RichTableRow = { _key: string; cells: RichTableCell[] };
type RichTableColumnHeader = { _key: string; cellIndex: number; title: string };
type RichTableBlockValue = {
  columnHeaders?: RichTableColumnHeader[];
  hasColumnTitles?: boolean;
  hasRowTitles?: boolean;
  rows: RichTableRow[];
};

export const components: PortableTextComponents = {
  block: {
    h2: ({ value, children }) => {
      const text = (value.children as any[]).map((c) => c.text).join('');
      return (
        <h2 id={slugify(text)} className="scroll-mt-24">
          {children}
        </h2>
      );
    },
    h3: ({ value, children }) => {
      const text = (value.children as any[]).map((c) => c.text).join('');
      return (
        <h3 id={slugify(text)} className="scroll-mt-24">
          {children}
        </h3>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value.asset).url();

      return (
        <figure>
          <Image
            src={imageUrl}
            alt={value.alt || 'Image'}
            width={800}
            height={600}
            className="w-full"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    richTableBlock: ({ value }) => {
      const table = value as RichTableBlockValue;
      const sortedHeaders = table.hasColumnTitles
        ? [...(table.columnHeaders ?? [])].sort(
            (a, b) => a.cellIndex - b.cellIndex,
          )
        : [];

      return (
        <div className="my-8 overflow-x-auto">
          <table>
            {sortedHeaders.length > 0 && (
              <thead>
                <tr>
                  {sortedHeaders.map((header) => (
                    <th key={header._key} className="text-left">
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {table.rows?.map((row) => (
                <tr key={row._key}>
                  {row.cells?.map((cell, cellIdx) => {
                    const isRowHeader = table.hasRowTitles && cellIdx === 0;
                    return isRowHeader ? (
                      <th key={cell._key} scope="row" className="text-left">
                        <PortableText value={cell.content} />
                      </th>
                    ) : (
                      <td key={cell._key}>
                        <PortableText value={cell.content} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};
