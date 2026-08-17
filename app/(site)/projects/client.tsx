'use client';

import { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard, ProjectDoc } from '@/components/project/card-project';
import Link from 'next/link';

interface ProjectsClientProps {
  featuredProjects: ProjectDoc[];
  initialProjects: ProjectDoc[];
  totalNormalProjects: number;
  fetchMoreAction: (offset: number, limit: number) => Promise<ProjectDoc[]>;
}

export function ProjectsClient({
  featuredProjects,
  initialProjects,
  totalNormalProjects,
  fetchMoreAction,
}: ProjectsClientProps) {
  const [projects, setProjects] = useState<ProjectDoc[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = projects.length < totalNormalProjects;

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const moreProjects = await fetchMoreAction(projects.length, 15);
      setProjects((prev) => [...prev, ...moreProjects]);
    } catch (error) {
      console.error('Failed to load more projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background pb-20 max-w-[100vw] min-h-screen overflow-x-hidden">
      {/* Breadcrumb Header */}
      <header className="bg-muted/10 py-6 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <nav className="flex items-center gap-2 overflow-x-auto font-mono text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap scrollbar-hide">
            <Link href="/" className="hover:text-primary transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-foreground">Dự án</span>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <header className="bg-muted/10 py-12 md:py-20 border-border border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 container">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="self-start bg-foreground p-1 px-2 font-mono text-primary text-xs uppercase tracking-widest">
              projects
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.1] tracking-tight">
              Dấu ấn cung ứng <br /> trên mọi công trình
            </h1>
            <p className="mt-4 text-muted-foreground text-lg md:text-xl">
              Hơn 15 năm kinh nghiệm, Duy Hoà 68 tự hào là đối tác chiến lược
              cung cấp vật tư toàn diện cho hàng trăm dự án trọng điểm trên cả
              nước.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-12 px-4 sm:px-6 lg:px-8 container">
        {/* 1. Render Featured Projects First (Spans 2 columns on desktop) */}
        {featuredProjects.length > 0 && (
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-12 *:border w-full">
            {featuredProjects.map((p) => (
              <ProjectCard key={p._id} p={p} isFeatured={true} />
            ))}
          </div>
        )}

        {/* 2. Render Normal Grid Projects */}
        <div className="gap-px grid grid-cols-1 lg:grid-cols-2 mb-12 bg-border w-full">
          {projects.map((p) => (
            <ProjectCard key={p._id} p={p} isFeatured={false} />
          ))}
        </div>

        {/* Load More Trigger */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              variant="outline"
              className="hover:bg-primary px-8 rounded-none h-12 font-mono font-medium hover:text-primary-foreground uppercase tracking-widest transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Đang tải...
                </>
              ) : (
                'Tải thêm dự án'
              )}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
