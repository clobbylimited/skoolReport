"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {};

function TabMenus({ menuList, is_params }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="w-full flex select-none dborder-b text-[12px] items-center gap-[8px] justify-start h-[40px] min-h-[40px]">
      {menuList.map((menu: any) => (
        <span
          onClick={() => {
            if (is_params) {
              const params = new URLSearchParams(searchParams);
              params.set("tab", menu.route);
              router.push(`?${params.toString()}`);
            } else {
              router.push(menu.route);
            }
          }}
          // className={
          //   ((
          //     is_params
          //       ? searchParams.get("tab") == menu.route
          //       : pathname == menu.route
          //   )
          //     ? "border-emerald-700 text-emerald-700"
          //     : "") +
          //   " w-max text-center flex select-none px-[10px] cursor-pointer justify-center items-center h-full border-b-2 hover:bg-gray-100"
          // }

          className={
            ((is_params
                    ? searchParams.get("tab") == menu.route
                    : pathname == menu.route || pathname.includes(menu.route)
                )
              ? "border-zinc-200 bg-zinc-100 text-black"
              : " border-transparent bg-transparent text-zinc-500") +
            " hover:bg-zinc-100 h-[30px] border rounded cursor-pointer transition-all duration-200 w-max text-[#111] text-[12px] flex justify-start items-center gap-[5px] px-[16px] font-[500]"
          }
        >
          {menu.name}
        </span>
      ))}
    </div>
  );
}

export default TabMenus;
