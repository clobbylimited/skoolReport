import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Breadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Get the current URL path and split it into segments
    const path = window.location.pathname.split("/").filter(Boolean);

    // Generate breadcrumb items from URL segments
    const breadcrumbItems = path.map((segment, index, arr) => {
      // Reconstruct the URL up to the current segment
      const url = `/${arr.slice(0, index + 1).join("/")}`;

      return { name: segment, url: url };
    });

    setBreadcrumbs(breadcrumbItems);
  }, [pathname]);

  return (
    <nav aria-label="Breadcrumb" className="flex select-none">
      <ul className="flex items-center space-x-[10px]">
        {breadcrumbs.map((breadcrumb: any, index: any) => (
          <li key={index} className="flex items-center gap-[10px] capitalize">
            <a href={breadcrumb.url} className="">
              {breadcrumb.name}
            </a>
            {index < breadcrumbs.length -1 && "/"}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
