import React from "react";

interface TimelineItem {
  title: string;
  description?: string;
  active: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  direction?: "x" | "y";
}

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Timelines: React.FC<TimelineProps> = ({ items, direction = "y" }) => {
  const isHorizontal = direction === "x";
  const activeIndex = items.findIndex((item) => !item.active) - 1;

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row" : "flex-col"
      } items-start w-full select-none`}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex ${
            isHorizontal ? "flex-col items-center" : "flex-row items-start"
          } relative`}
        >
          <div
            className={`
            ${isHorizontal ? "h-0.5 w-full" : "w-0.5 h-full"}
            absolute ${isHorizontal ? "top-[12px] left-0" : "left-[12px] top-0"}
            ${index <= activeIndex ? "bg-green-500" : "bg-gray-300"}
            ${index === items.length - 1 ? (isHorizontal ? "" : "hidden") : ""}
          `}
          ></div>
          <div
            className={`
            flex items-center justify-center
            w-[24px] max-w-[24px] h-[24px] max-h-[24px] rounded-full z-10
            ${
              index <= activeIndex
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-600"
            }
            ${isHorizontal ? "mb-[12px]" : "mr-[12px]"}
          `}
          >
            {index <= activeIndex ? (
              <CheckIcon />
            ) : (
              <span className="text-[14px] font-[400]">{index + 1}</span>
            )}
          </div>
          <div
            className={`flex flex-col ${
              isHorizontal ? "items-center text-center" : "items-start pb-[24px]"
            }`}
          >
            <h3 className="text-[16px] font-[500]">{item.title}</h3>
            {item.description && (
              <p className="text-[12px] text-gray-600 mt-1">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timelines;
