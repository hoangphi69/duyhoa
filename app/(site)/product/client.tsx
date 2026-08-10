'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Filter,
  Search,
  Zap,
  Droplets,
  Bath,
  Wrench,
  Package,
  CheckCheck,
  RotateCcw,
} from 'lucide-react';
import { cn, IconMapper } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SanityProduct, SanityCategory } from './page';
import { useRouter, useSearchParams } from 'next/navigation';

// --- Ánh xạ màu sắc theo tên Icon thay vì tên Category ---
const getCategoryStyle = (iconName: string) => {
  switch (iconName) {
    case 'Zap':
      return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
    case 'Droplets':
      return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
    case 'Bath':
      return 'text-teal-500 bg-teal-500/10 border-teal-500/30';
    case 'Wrench':
      return 'text-rose-500 bg-rose-500/10 border-rose-500/30';
    default:
      return 'text-foreground bg-muted/10 border-border';
  }
};

interface ProductsClientProps {
  initialProducts: SanityProduct[];
  categories: SanityCategory[];
  brands: string[];
  initialFilters: {
    category: string;
    subcategory: string;
    brand: string;
  };
}

export default function ProductsClient({
  initialProducts,
  categories,
  brands,
  initialFilters,
}: ProductsClientProps) {
  const searchParams = useSearchParams();

  // --- Initialize Filter State from URL Params ---
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    () => {
      let initialSelected: string[] = [];
      if (initialFilters.subcategory)
        initialSelected.push(initialFilters.subcategory);
      if (initialFilters.category) {
        const targetCategory = categories.find(
          (c) => c.title === initialFilters.category,
        );
        if (targetCategory && targetCategory.tags) {
          initialSelected = [
            ...new Set([...initialSelected, ...targetCategory.tags]),
          ];
        }
      }
      return initialSelected;
    },
  );

  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    return initialFilters.brand ? [initialFilters.brand] : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Mới nhất');

  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const brand = searchParams.get('brand');

    setSearchQuery(''); // Reset ô tìm kiếm khi chuyển danh mục từ Navbar

    if (!category && !subcategory && !brand) {
      setSelectedSubcategories([]);
      setSelectedBrands([]);
    } else {
      let nextSelected: string[] = [];
      if (subcategory) {
        nextSelected.push(subcategory);
      }
      if (category) {
        const targetCategory = categories.find((c) => c.title === category);
        if (targetCategory && targetCategory.tags) {
          nextSelected = [
            ...new Set([...nextSelected, ...targetCategory.tags]),
          ];
        }
      }
      setSelectedSubcategories(nextSelected);
      setSelectedBrands(brand ? [brand] : []);
    }
  }, [searchParams, categories]);

  // Logic Lọc & Sắp xếp
  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSubcategories =
        selectedSubcategories.length === 0 ||
        selectedSubcategories.includes(product.subcategory);
      const matchesBrands =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

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

  // Helpers xử lý Chip
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
      {/* Page Header */}
      <header className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              explore products
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

      {/* Main Content */}
      <section className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center bg-card mb-6 p-4 border border-border">
          <span className="font-mono font-bold text-sm uppercase tracking-widest">
            Bộ lọc
          </span>
          <Button
            variant="outline"
            className="rounded-none font-mono text-xs uppercase"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="mr-2 w-4 h-4" />
            Lọc sản phẩm ({selectedSubcategories.length + selectedBrands.length}
            )
          </Button>
        </div>

        {/* The Blocky Grid Layout */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-4 bg-border border border-border w-full">
          {/* LEFT COLUMN: Filters (Sidebar) */}
          <aside
            className={cn(
              'lg:block lg:top-20 lg:sticky flex flex-col bg-background lg:h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide',
              isMobileFilterOpen ? 'block mb-px' : 'hidden',
            )}
          >
            {/* Search Bar */}
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

            {/* Categories & Tags Filter */}
            <div className="flex flex-col bg-background">
              <div className="bg-muted/10 p-6 pb-2">
                <h3 className="border-border border-b font-mono text-muted-foreground text-sm uppercase tracking-widest">
                  Dòng sản phẩm
                </h3>
              </div>

              {categories.map((cat) => (
                <div key={cat.title} className="p-6 pt-4">
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
                        onClick={() =>
                          addAll(
                            cat.tags,
                            selectedSubcategories,
                            setSelectedSubcategories,
                          )
                        }
                        className="hover:bg-muted p-1 text-muted-foreground hover:text-primary transition-colors"
                        title="Chọn tất cả"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          removeAll(
                            cat.tags,
                            selectedSubcategories,
                            setSelectedSubcategories,
                          )
                        }
                        className="hover:bg-muted p-1 text-muted-foreground hover:text-destructive transition-colors"
                        title="Xóa nhóm này"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.tags &&
                      cat.tags.map((tag) => {
                        const isSelected = selectedSubcategories.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() =>
                              toggleChip(
                                tag,
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
                            {tag}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Brands Filter */}
            <div className="flex flex-col bg-background grow">
              <div className="relative flex justify-between items-center bg-muted/10 p-6 pb-4">
                <h3 className="border-border border-b font-mono text-muted-foreground text-sm uppercase tracking-widest grow">
                  Thương hiệu
                </h3>
                <div className="right-6 absolute flex items-center gap-2">
                  <button
                    onClick={() =>
                      addAll(brands, selectedBrands, setSelectedBrands)
                    }
                    className="hover:bg-muted p-1 text-muted-foreground hover:text-primary transition-colors"
                    title="Chọn tất cả"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      removeAll(brands, selectedBrands, setSelectedBrands)
                    }
                    className="hover:bg-muted p-1 text-muted-foreground hover:text-destructive transition-colors"
                    title="Xóa nhóm này"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-6">
                {brands.map((brand) => {
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() =>
                        toggleChip(brand, selectedBrands, setSelectedBrands)
                      }
                      className={cn(
                        'px-2 border h-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest transition-colors',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground',
                      )}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Global Actions */}
            <div className="bottom-0 sticky flex flex-col gap-3 bg-card mt-auto p-6 border-border border-t">
              <Button
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
          <div className="gap-px grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:col-span-3 bg-border h-fit">
            <div className="top-20 z-10 sticky flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 col-span-1 sm:col-span-2 xl:col-span-3 bg-card p-4 sm:p-6 border-b">
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
              <div className="flex flex-col justify-center items-center col-span-1 sm:col-span-2 xl:col-span-3 bg-card p-20 text-center">
                <Search className="mb-4 w-12 h-12 text-muted-foreground/30" />
                <h3 className="mb-2 font-heading text-2xl">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-muted-foreground">
                  Vui lòng điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.
                </p>
              </div>
            )}

            {filteredProducts.map((product) => {
              // Tìm Category gốc để xác định Icon áp dụng
              const catData = categories.find(
                (c) => c.title === product.category,
              );
              const iconStr = catData?.icon || 'Package';

              return (
                <Link
                  href={`/product/${product.slug}`}
                  key={product._id}
                  className="group/card relative flex flex-col bg-card hover:bg-primary transition-colors duration-300"
                >
                  <div className="relative bg-muted/5 border-border border-b aspect-square overflow-hidden">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-between p-6 grow">
                    <h3 className="mb-6 min-h-12 font-heading group-hover/card:text-primary-foreground text-lg line-clamp-2 leading-snug transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mt-auto">
                      <span
                        title={product.category}
                        className={cn(
                          'flex justify-center items-center gap-2 px-2 border h-6 transition-colors',
                          getCategoryStyle(iconStr),
                          'group-hover/card:border-primary-foreground/20 group-hover/card:bg-primary-foreground/10 group-hover/card:text-primary-foreground',
                          'font-mono text-[10px] uppercase tracking-widest',
                        )}
                      >
                        <IconMapper name={iconStr} className="w-3.5 h-3.5" />
                        {product.subcategory}
                      </span>

                      <span className="flex items-center bg-muted/30 group-hover/card:bg-transparent px-2 border border-border group-hover/card:border-primary-foreground/20 h-6 font-mono text-[10px] text-muted-foreground group-hover/card:text-primary-foreground/80 uppercase tracking-widest transition-colors">
                        {product.brand}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {filteredProducts.length > 0 && (
              <div className="flex justify-center col-span-1 sm:col-span-2 xl:col-span-3 bg-card p-6 border-border border-t">
                <Button
                  variant="outline"
                  className="group hover:bg-primary px-8 rounded-none h-12 font-mono hover:text-primary-foreground uppercase tracking-widest transition-colors"
                >
                  Tải thêm sản phẩm
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
