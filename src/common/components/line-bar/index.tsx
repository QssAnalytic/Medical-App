import { cn } from "@/common/lib/utils";

interface LineBarProps {
    width: number;
    backgroundColor: string;
}

const LineBar: React.FC<LineBarProps> = ({ width, backgroundColor }) => {
    return (
        <div className="w-80">
            <div className="w-full bg-gray-200 rounded-sm h-3">
                <div
                    className={cn("h-3 rounded-sm")}
                    style={{ width: `${width}%`, backgroundColor }}
                ></div>
            </div>
        </div>
    );
};

export default LineBar;
