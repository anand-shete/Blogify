import api from "@/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DashboardLoader, DashboardSection } from "@/components/Dashboard";
import { Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const DiscoverBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const pageParam = parseInt(searchParams.get("page") ?? "1", 10) || 1;
  const limitParam = parseInt(searchParams.get("limit") ?? "6", 10) || 6;

  useEffect(() => {
    setCurrentPage(pageParam);
    setPerPage(limitParam);

    const fetchAllBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/blog?page=${pageParam}&limit=${limitParam}`);
        setBlogs(res.data.blogs ?? []);
        const meta = res.data.meta ?? {};
        setTotalPages(meta.totalPages ?? 0);
        setCurrentPage(meta.page ?? pageParam);
        setPerPage(meta.limit ?? limitParam);
      } catch (error) {
        toast.error("Some Error Occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, [pageParam, limitParam]);

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center">
      <div className="text-heading mt-14">
        <Compass size={26} strokeWidth={1.5} className="mr-2" />
        <h1>Discover Blogs</h1>
      </div>
      <p className="mt-2 mb-4 text-sm text-neutral-600">
        Browse content created by users across the platform
      </p>

      {loading ? <DashboardLoader /> : <DashboardSection blogs={blogs} />}
      <div className="mb-20">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/discover?page=${Math.max(1, currentPage - 1)}&limit=${perPage}`}
                className="text-primary disabled:true"
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={e => {
                    navigate(`/discover?page=${page}&limit=${perPage}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`/discover?page=${currentPage + 1}&limit=${perPage}`}
                className="text-primary"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default DiscoverBlogs;
