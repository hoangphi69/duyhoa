'use client';

import { Breadcrumbs } from '@/components/breadcrumb';
import { ProductCard } from '@/components/product/card-product';
import { Button } from '@/components/ui/button';
import { cn, IconMapper } from '@/lib/utils';
import { Check, Filter, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SanityBrand, SanityCategory, SanityProduct } from './page';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ProductsClientProps {
  initialProducts: SanityProduct[];
  categories: SanityCategory[];
  brands: SanityBrand[];
  initialFilters: {
    category: string;
    subcategory: string;
    brand: string;
  };
}

// "a,b,c" -> ["a","b","c"], handles null/empty safely.
// Values here are always slugs, so commas in names/tags can never collide.
const splitParam = (val?: string | null): string[] =>
  val
    ? val
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

export default function ProductsClient({
  initialProducts,
  categories,
  brands,
  initialFilters,
}: ProductsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const gridRef = useRef<HTMLDivElement>(null);
  const isMounted = useRef(false);

  const isUrlDrivenUpdate = useRef(false);

  // --- Initialize Filter State from URL Params (all slugs) ---
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    () => {
      let initialSelected: string[] = splitParam(initialFilters.subcategory);
      if (initialFilters.category) {
        splitParam(initialFilters.category).forEach((catSlug) => {
          const targetCategory = categories.find((c) => c.slug === catSlug);
          if (targetCategory && targetCategory.tags) {
            initialSelected = [
              ...new Set([
                ...initialSelected,
                ...targetCategory.tags.map((t) => t.slug),
              ]),
            ];
          }
        });
      }
      return initialSelected;
    },
  );

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() =>
    splitParam(initialFilters.brand),
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Mới nhất');

  // --- Sync FROM the URL (navbar links, back/forward navigation) ---
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const brand = searchParams.get('brand');

    isUrlDrivenUpdate.current = true;
    setSearchQuery('');

    if (!category && !subcategory && !brand) {
      setSelectedSubcategories([]);
      setSelectedBrands([]);
    } else {
      let nextSelected: string[] = splitParam(subcategory);
      if (category) {
        splitParam(category).forEach((catSlug) => {
          const targetCategory = categories.find((c) => c.slug === catSlug);
          if (targetCategory && targetCategory.tags) {
            nextSelected = [
              ...new Set([
                ...nextSelected,
                ...targetCategory.tags.map((t) => t.slug),
              ]),
            ];
          }
        });
      }
      setSelectedSubcategories(nextSelected);
      setSelectedBrands(splitParam(brand));
    }
  }, [searchParams, categories]);

  // --- Layout Scroll Anchoring ---
  // Locks the scroll position seamlessly before the browser paints the shrunk DOM
  useIsomorphicLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      // 80px is the sticky offset (`top-20`). If rect.top is < 80,
      // the user has scrolled past the start of the sticky activation.
      if (rect.top < 80) {
        const absoluteTop = window.scrollY + rect.top;
        // Instantly anchor the window back to the exact sticky point
        window.scrollTo({ top: absoluteTop - 80 });
      }
    }
  }, [selectedSubcategories, selectedBrands, sortOption]); // Excluded searchQuery to prevent jump while typing

  // --- Sync TO the URL whenever the user changes filters ---
  useEffect(() => {
    if (isUrlDrivenUpdate.current) {
      isUrlDrivenUpdate.current = false;
      return;
    }

    const params = new URLSearchParams();
    if (selectedSubcategories.length > 0) {
      params.set('subcategory', selectedSubcategories.join(','));
    }
    if (selectedBrands.length > 0) {
      params.set('brand', selectedBrands.join(','));
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubcategories, selectedBrands]);

  // Logic Lọc & Sắp xếp — matched by slug, not by display name
  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSubcategories =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(product.subcategorySlug);
      const matchesBrands =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brandSlug);

      return matchesSearch && matchesSubcategories && matchesBrands;
    });

    if (sortOption === 'Tên: A-Z') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'Tên: Z-A') {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'Mới nhất') {
      result = [...result];
    }

    return result;
  }, [
    initialProducts,
    searchQuery,
    selectedSubcategories,
    selectedBrands,
    sortOption,
  ]);

  // Helpers xử lý Chip — operate purely on slugs
  const toggleChip = (
    item: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const addAll = (
    items: string[],
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (!items) return;
    const newItems = items.filter((item) => !list.includes(item));
    setList([...list, ...newItems]);
  };

  const removeAll = (
    items: string[],
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (!items) return;
    setList(list.filter((item) => !items.includes(item)));
  };

  return (
    <div className="pb-20 max-w-[100vw] min-h-screen">
      <Breadcrumbs items={[{ name: 'Sản phẩm', href: '/product' }]} />

      <header className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              products
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.1] tracking-tight">
              Hệ sinh thái <br /> Vật tư toàn diện
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Khám phá hàng ngàn sản phẩm chính hãng từ các thương hiệu hàng
              đầu, đáp ứng mọi nhu cầu thi công.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        <div className="lg:hidden flex justify-between items-center bg-card mb-6 p-4 border border-border">
          <span className="font-mono font-bold text-sm uppercase tracking-widest">
            Bộ lọc
          </span>
          <Button
            type="button"
            variant="outline"
            className="rounded-none font-mono text-xs uppercase"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="mr-2 w-4 h-4" />
            Lọc sản phẩm ({selectedSubcategories.length + selectedBrands.length}
            )
          </Button>
        </div>

        <div className="gap-px grid grid-cols-1 lg:grid-cols-4 bg-border border border-border w-full">
          <aside
            className={cn(
              'lg:block lg:top-20 lg:sticky flex flex-col bg-background lg:h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide',
              isMobileFilterOpen ? 'block mb-px' : 'hidden',
            )}
          >
            <div className="bg-card p-6">
              <div className="relative">
                <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên sản phẩm..."
                  className="bg-background pr-4 pl-10 border border-border focus:border-primary focus:outline-none w-full h-12 text-sm transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col bg-background">
              <div className="bg-muted/10 p-6 pb-4 border-border border-b">
                <h3 className="text-muted-foreground text-sm uppercase tracking-widest">
                  Dòng sản phẩm
                </h3>
              </div>

              {categories.map((cat) => {
                const catTags = cat.tags.map((t) => t.slug);
                const isAllSelected =
                  catTags.length > 0 &&
                  catTags.every((slug) => selectedSubcategories.includes(slug));

                return (
                  <div key={cat.slug} className="p-6 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2 font-semibold text-foreground text-xs uppercase tracking-wider">
                        <IconMapper
                          name={cat.icon}
                          className="w-4 h-4 text-primary"
                        />
                        {cat.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (isAllSelected) {
                              removeAll(
                                catTags,
                                selectedSubcategories,
                                setSelectedSubcategories,
                              );
                            } else {
                              addAll(
                                catTags,
                                selectedSubcategories,
                                setSelectedSubcategories,
                              );
                            }
                          }}
                          className={cn(
                            'flex justify-center items-center border border-primary w-4 h-4 transition-colors cursor-pointer',
                            isAllSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-transparent text-transparent hover:bg-primary/10',
                          )}
                          title={
                            isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'
                          }
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cat.tags &&
                        cat.tags.map((tag) => {
                          const isSelected = selectedSubcategories.includes(
                            tag.slug,
                          );
                          return (
                            <button
                              type="button"
                              key={tag.slug}
                              onClick={() =>
                                toggleChip(
                                  tag.slug,
                                  selectedSubcategories,
                                  setSelectedSubcategories,
                                )
                              }
                              className={cn(
                                'px-2 border h-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-colors',
                                isSelected
                                  ? 'bg-primary border-primary text-primary-foreground'
                                  : 'bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground',
                              )}
                            >
                              {tag.name}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col bg-background grow">
              <div className="relative flex justify-between items-center bg-muted/10 p-6 pb-4 border-border border-b">
                <h3 className="text-muted-foreground text-sm uppercase tracking-widest grow">
                  Thương hiệu
                </h3>
                <div className="right-6 absolute flex items-center gap-2">
                  {(() => {
                    const allBrands = brands.map((b) => b.slug);
                    const isAllBrandsSelected =
                      allBrands.length > 0 &&
                      allBrands.every((slug) => selectedBrands.includes(slug));

                    return (
                      <button
                        type="button"
                        onClick={() => {
                          if (isAllBrandsSelected) {
                            removeAll(
                              allBrands,
                              selectedBrands,
                              setSelectedBrands,
                            );
                          } else {
                            addAll(
                              allBrands,
                              selectedBrands,
                              setSelectedBrands,
                            );
                          }
                        }}
                        className={cn(
                          'flex justify-center items-center border border-primary w-4 h-4 transition-colors cursor-pointer',
                          isAllBrandsSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-transparent text-transparent hover:bg-primary/10',
                        )}
                        title={
                          isAllBrandsSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'
                        }
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    );
                  })()}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-6">
                {brands.map((brand) => {
                  const isSelected = selectedBrands.includes(brand.slug);
                  return (
                    <button
                      type="button"
                      key={brand.slug}
                      onClick={() =>
                        toggleChip(
                          brand.slug,
                          selectedBrands,
                          setSelectedBrands,
                        )
                      }
                      className={cn(
                        'px-2 border h-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-colors',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground',
                      )}
                    >
                      {brand.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bottom-0 sticky flex flex-col gap-3 bg-card mt-auto p-6 border-border border-t">
              <Button
                type="button"
                onClick={() => {
                  setSelectedSubcategories([]);
                  setSelectedBrands([]);
                  setSearchQuery('');
                  setSortOption('Mới nhất');
                }}
                variant="destructive"
                className="rounded-none w-full h-12 font-mono uppercase tracking-wider"
              >
                Xoá toàn bộ bộ lọc
              </Button>
            </div>
          </aside>

          {/* RIGHT COLUMN: Product Grid */}
          <div
            ref={gridRef}
            className="gap-px grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-3 bg-border h-fit"
          >
            <div className="top-20 z-20 sticky flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 col-span-1 sm:col-span-2 xl:col-span-3 bg-card p-4 sm:p-6 border-b">
              <span className="text-muted-foreground text-sm">
                Tìm thấy{' '}
                <span className="mx-1 font-medium text-foreground text-lg">
                  {filteredProducts.length}
                </span>{' '}
                sản phẩm
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-muted-foreground text-sm whitespace-nowrap">
                  Sắp xếp
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-background px-3 border border-border focus:border-primary rounded-none focus:outline-none w-full sm:w-48 h-10 text-sm cursor-pointer"
                >
                  <option value="Mới nhất">Mới nhất</option>
                  <option value="Tên: A-Z">Tên: A-Z</option>
                  <option value="Tên: Z-A">Tên: Z-A</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col justify-center items-center col-span-1 sm:col-span-2 xl:col-span-3 p-20 text-center">
                <Search className="mb-4 w-12 h-12 text-muted-foreground/30" />
                <h3 className="mb-2 font-heading text-2xl">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-muted-foreground">
                  Vui lòng điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.
                </p>
              </div>
            )}

            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
